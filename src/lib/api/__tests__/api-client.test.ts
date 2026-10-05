import { apiRequest } from "../api-client";
jest.mock("@/config/env", () => ({ env: { apiUrl: "https://example.test" } }));

afterEach(() => jest.restoreAllMocks());

it("rejects malformed successful JSON instead of returning null as typed data", async () => {
  jest.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => {
      throw new SyntaxError("bad json");
    },
  } as unknown as Response);
  await expect(apiRequest("/api/v1/services")).rejects.toMatchObject({
    name: "ApiError",
    status: 200,
  });
});

it("preserves the status of non-JSON server errors", async () => {
  jest.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: false,
    status: 503,
    json: async () => {
      throw new SyntaxError("html");
    },
  } as unknown as Response);
  await expect(apiRequest("/api/v1/services")).rejects.toMatchObject({
    status: 503,
  });
});

it("does not swallow cancellation while reading JSON", async () => {
  const aborted = Object.assign(new Error("cancelled"), { name: "AbortError" });
  jest.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => {
      throw aborted;
    },
  } as unknown as Response);
  await expect(apiRequest("/api/v1/services")).rejects.toBe(aborted);
});
