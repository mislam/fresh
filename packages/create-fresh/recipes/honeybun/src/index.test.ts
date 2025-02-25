import { describe, expect, it } from "bun:test";
import app from "./index";

describe("Hono Server", () => {
	it("GET / returns 200 with a message", async () => {
		const res = await app.request("/");
		expect(res.status).toBe(200);
		expect(await res.text()).toBe("Hello Hono!");
	});
});
