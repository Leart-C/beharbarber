import type { AuthenticatedRequest } from "@/hooks/use-authenticated-api";

import { getAvailability } from "../get-availability";

describe("getAvailability", () => {
  it("encodes the service and date in the request URL", async () => {
    const authenticatedRequest = jest.fn().mockResolvedValue({ slots: [] });

    await getAvailability({
      serviceId: "service/id",
      date: "2026-08-13",
      authenticatedRequest: authenticatedRequest as AuthenticatedRequest,
    });

    expect(authenticatedRequest).toHaveBeenCalledWith(
      "/api/v1/availability?serviceId=service%2Fid&date=2026-08-13",
      {
        method: "GET",
        signal: undefined,
      },
    );
  });

  it("includes the existing appointment during rescheduling", async () => {
    const authenticatedRequest = jest.fn().mockResolvedValue({ slots: [] });
    const controller = new AbortController();

    await getAvailability({
      serviceId: "service-id",
      date: "2026-08-13",
      appointmentId: "appointment/id",
      signal: controller.signal,
      authenticatedRequest: authenticatedRequest as AuthenticatedRequest,
    });

    expect(authenticatedRequest).toHaveBeenCalledWith(
      "/api/v1/availability?serviceId=service-id&date=2026-08-13&appointmentId=appointment%2Fid",
      {
        method: "GET",
        signal: controller.signal,
      },
    );
  });
});
