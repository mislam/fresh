import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		include: ['src/**/*.test.ts'],
		coverage: {
			thresholds: {
				lines: 90,
				functions: 90,
				branches: 90,
				statements: 90
			}
		}
	}
})
