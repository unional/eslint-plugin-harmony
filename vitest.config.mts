import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		// `spec/` holds lint fixtures, not tests. Only `test/` is collected, or vitest
		// would try to execute files that are deliberately invalid.
		include: ['test/**/*.spec.ts'],
		// Linting the type-aware configs builds a TypeScript program per config.
		testTimeout: 120_000
	}
})
