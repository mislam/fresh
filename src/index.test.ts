import { describe, it, expect, vi } from 'vitest'
import { main } from './index'

describe('Application', () => {
	it('should handle SIGINT signal', () => {
		const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
		process.emit('SIGINT')
		expect(exitSpy).toHaveBeenCalledWith(0)
		exitSpy.mockRestore()
	})

	it('should start successfully', () => {
		const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
		main()
		expect(consoleSpy).toHaveBeenCalled()
		consoleSpy.mockRestore()
	})

	it('should handle errors gracefully', () => {
		const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
		vi.spyOn(console, 'log').mockImplementationOnce(() => {
			throw new Error()
		})
		main()
		expect(exitSpy).toHaveBeenCalledWith(1)
		exitSpy.mockRestore()
	})
})
