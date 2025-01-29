import { describe, expect, it, vi } from 'vitest'
import { logger } from '@/utils/logger'

describe('logger', () => {
	it('should log info messages', () => {
		const spy = vi.spyOn(console, 'log')

		const testMessage = 'Test message'
		logger.info(testMessage)

		expect(spy).toHaveBeenCalledWith(expect.stringContaining(testMessage))
		spy.mockRestore()
	})
})
