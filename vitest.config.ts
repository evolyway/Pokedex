import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		exclude: [...configDefaults.exclude, 'dist/'],
		coverage: {
			provider: 'custom',
			customProviderModule: './coverage-provider',
			exclude: [...(configDefaults.coverage.exclude || []), 'dist/'],
			thresholds: {
				statements: 90,
				branches: 90,
				functions: 100,
				lines: 90,
			},
		},
	},
});
