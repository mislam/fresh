import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { main } from './index'

describe('Application', () => {
	beforeAll(() => {
		vi.spyOn(console, 'log').mockImplementation(() => {})
		vi.spyOn(console, 'error').mockImplementation(() => {})
		vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
	})

	afterAll(() => {
		vi.restoreAllMocks()
	})

	it('should handle SIGINT signal', () => {
		process.emit('SIGINT')
		expect(process.exit).toHaveBeenCalledWith(0)
	})

	it('should start successfully', () => {
		main()
		expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Party time!'))
	})

	it('should handle errors gracefully', () => {
		vi.mocked(console.log).mockImplementationOnce(() => {
			throw new Error('Startup error')
		})
		main()
		expect(process.exit).toHaveBeenCalledWith(1)
	})
})
