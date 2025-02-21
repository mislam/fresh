import { logger } from "@/utils/logger";
import { describe, expect, it, vi } from "vitest";

describe("logger", () => {
	it("should log info messages", () => {
		const spy = vi.spyOn(console, "log");

		const testMessage = "Test message";
		logger.info(testMessage);

		expect(spy).toHaveBeenCalledWith(expect.stringContaining(testMessage));
		spy.mockRestore();
	});
});
