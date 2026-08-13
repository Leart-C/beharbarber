import type { AuthenticatedRequest } from "@/hooks/use-authenticated-api";

import type { AvailabilityResponse } from "../types/availability-response";

type GetAvailabilityOptions = {
  serviceId: string;
  date: string;
  appointmentId?: string;
  signal?: AbortSignal;
  authenticatedRequest: AuthenticatedRequest;
};

export function getAvailability({
  serviceId,
  date,
  appointmentId,
  signal,
  authenticatedRequest,
}: GetAvailabilityOptions) {
  const queryParts = [
    `serviceId=${encodeURIComponent(serviceId)}`,
    `date=${encodeURIComponent(date)}`,
  ];

  if (appointmentId) {
    queryParts.push(
      `appointmentId=${encodeURIComponent(appointmentId)}`,
    );
  }

  return authenticatedRequest<AvailabilityResponse>(
    `/api/v1/availability?${queryParts.join("&")}`,
    {
      method: "GET",
      signal,
    },
  );
}