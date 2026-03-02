// Note: This module is loaded in two contexts:
// 1. The worker process (jsdom): only startCoverage/takeCoverage/stopCoverage are called
// 2. The main Vitest process: getProvider() is called
//
// IMPORTANT: Do NOT import @vitest/coverage-v8/dist/provider.js at the top level.
// It transitively imports esbuild which breaks in the jsdom worker because jsdom's
// TextEncoder returns a type that doesn't pass esbuild's `instanceof Uint8Array` check.
// All provider-level imports are done lazily inside getProvider().

import { default as v8Module } from '@vitest/coverage-v8';

export default {
	startCoverage: v8Module.startCoverage,
	takeCoverage: v8Module.takeCoverage,
	stopCoverage: v8Module.stopCoverage,

	async getProvider() {
		const [{ existsSync }, { default: libCoverage }, { V8CoverageProvider }] =
			await Promise.all([
				import('node:fs'),
				import('istanbul-lib-coverage'),
				import('@vitest/coverage-v8/dist/provider.js'),
			]);

		type SuiteRunMeta = {
			coverage?: unknown;
			testFiles: string[];
			environment: string;
			projectName?: string;
		};

		/**
		 * Extends V8CoverageProvider to scope coverage per spec file.
		 * Each spec file's coverage is only counted for the source file it directly
		 * tests (matching `.ts` and `.html` files), not for transitive dependencies.
		 */
		class PerFileCoverageProvider extends V8CoverageProvider {
			private storedEntries: SuiteRunMeta[] = [];

			override onAfterSuiteRun(meta: SuiteRunMeta): void {
				if (meta.coverage) {
					this.storedEntries.push(meta);
				}
			}

			override async generateCoverage({ allTestsRun }: { allTestsRun: boolean }) {
				const finalMap = this.createCoverageMap();

				for (const { coverage: rawCoverage, testFiles, environment, projectName } of this.storedEntries) {
					const project = projectName
						? (this.ctx.getProjectByName(projectName) ?? this.ctx.getRootProject())
						: this.ctx.getRootProject();

					// Convert raw V8 data → Istanbul coverage map (applies source-map remapping)
					const convertedMap = await this.convertCoverage(rawCoverage, project, environment);

					// Compute path suffixes that this spec is allowed to cover.
					// e.g. spec `src/app/pages/role-details/role-details.spec.ts`
					//   → suffixes `src/app/pages/role-details/role-details.ts`
					//              `src/app/pages/role-details/role-details.html`
					// All test files in this project follow the `src/**/*.spec.ts` convention.
					// If a test file doesn't match that pattern the fallback strips `.spec.ts`
					// from the full path, which is harmless but will produce no coverage match.
					const allowedSuffixes = testFiles.flatMap((specFile) => {
						const normalized = specFile.replace(/\\/g, '/');
						const match = normalized.match(/(?:\/|^)(src\/.+?)\.spec\.ts$/);
						if (!match) return [];
						const base = match[1];
						return [`${base}.ts`, `${base}.html`];
					});

					// Build a filtered map containing only the matching source files.
					// The `endsWith(`/${s}`)` check ensures whole path-segment matching:
					// e.g. suffix `src/app/button.ts` won't match `src/app/icon-button.ts`.
					const filteredMap = libCoverage.createCoverageMap({});
					for (const file of convertedMap.files()) {
						const normalizedFile = file.replace(/\\/g, '/');
						if (allowedSuffixes.some((s) => normalizedFile === s || normalizedFile.endsWith(`/${s}`))) {
							filteredMap.addFileCoverage(convertedMap.fileCoverageFor(file));
						}
					}

					finalMap.merge(filteredMap);
				}

				// Add coverage for untested files when coverage.include is configured.
				// Uses loose `!= null` to match original v8 provider behaviour (treats
				// both `null` and `undefined` as "not set").
				if (this.options.include != null && (allTestsRun || !this.options.cleanOnRerun)) {
					const untestedCoverage = await this.getCoverageMapForUncoveredFiles(finalMap.files());
					finalMap.merge(untestedCoverage);
				}

				// Filter to only files that exist on disk
				finalMap.filter((filename: string) => {
					if (this.options.excludeAfterRemap) {
						return existsSync(filename) && this.isIncluded(filename);
					}
					return existsSync(filename);
				});

				return finalMap;
			}
		}

		return new PerFileCoverageProvider();
	},
};
