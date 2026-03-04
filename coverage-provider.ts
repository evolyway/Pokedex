// Note: This module is loaded in two contexts:
// 1. The worker process (jsdom): only startCoverage/takeCoverage/stopCoverage are called
// 2. The main Vitest process: getProvider() is called
//
// IMPORTANT: Do NOT import @vitest/coverage-v8/dist/provider.js at the top level.
// It transitively imports esbuild which breaks in the jsdom worker because jsdom's
// TextEncoder returns a type that doesn't pass esbuild's `instanceof Uint8Array` check.
// All provider-level imports are done lazily inside getProvider().

import { default as v8Module } from '@vitest/coverage-v8';

function getAllowedSuffixes(specFile: string): string[] {
	const match = specFile.match(/(?:\/|^)(src\/.+?)\.spec\.ts$/);
	if (!match) return [];
	const base = match[1];
	return [`${base}.ts`, `${base}.html`];
}

export default {
	startCoverage: v8Module.startCoverage,
	takeCoverage: v8Module.takeCoverage,
	stopCoverage: v8Module.stopCoverage,

	async getProvider() {
		const { V8CoverageProvider } = await import('@vitest/coverage-v8/dist/provider.js');

		/**
		 * Extends V8CoverageProvider to scope coverage per spec file.
		 * Each spec file's coverage is only counted for the source file it directly
		 * tests (matching `.ts` and `.html` files), not for transitive dependencies.
		 *
		 * Each spec's stored coverage is processed independently by temporarily scoping
		 * `this.coverageFiles` to a single entry and delegating to `super.generateCoverage()`.
		 * The resulting Istanbul map is then filtered by allowed file suffixes.
		 * This avoids calling any private methods directly.
		 */
		class PerFileCoverageProvider extends V8CoverageProvider {
			override async generateCoverage(_: { allTestsRun: boolean }) {
				const allCoverageFiles = new Map(this.coverageFiles);
				const finalMap = this.createCoverageMap();

				try {
					for (const [projectName, coveragePerProject] of allCoverageFiles.entries()) {
						for (const [environment, coverageByTestfiles] of Object.entries(coveragePerProject)) {
							for (const [testFilenames, filename] of Object.entries(coverageByTestfiles)) {
								// Temporarily scope coverage to just this one spec file so that
								// super.generateCoverage() converts only its V8 data via source maps.
								const tempCoverageFiles: typeof allCoverageFiles = new Map();
								tempCoverageFiles.set(projectName, { [environment]: { [testFilenames]: filename } });
								this.coverageFiles = tempCoverageFiles;

								// Passing allTestsRun: false prevents the parent from calling
								// getCoverageMapForUncoveredFiles on each per-spec run.
								const specMap = await super.generateCoverage({ allTestsRun: false });

								// Compute file-path suffixes that this spec is allowed to cover.
								// e.g. spec `src/app/pages/role-details/role-details.spec.ts`
								//   → suffixes `src/app/pages/role-details/role-details.ts`
								//              `src/app/pages/role-details/role-details.html`
								// BaseCoverageProvider stores testFilenames as testFiles.join() (comma-separated).
								// All test files in this project follow the `src/**/*.spec.ts` convention.
								// If a test file doesn't match that pattern the fallback strips `.spec.ts`
								// from the full path, which is harmless but will produce no coverage match.
								const allowedSuffixes = testFilenames.split(',').flatMap(getAllowedSuffixes);

								// Keep only files directly tested by this spec.
								// The `endsWith(`/${s}`)` check ensures whole path-segment matching:
								// e.g. suffix `src/app/button.ts` won't match `src/app/icon-button.ts`.
								for (const file of specMap.files()) {
									if (allowedSuffixes.some((s) => file === s || file.endsWith(`/${s}`))) {
										finalMap.addFileCoverage(specMap.fileCoverageFor(file));
									}
								}
							}
						}
					}
				} finally {
					// Always restore the original coverage files map, even if an error occurs
					this.coverageFiles = allCoverageFiles;
				}

				return finalMap;
			}
		}

		return new PerFileCoverageProvider();
	},
};
