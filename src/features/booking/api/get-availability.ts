import { apiRequest } from "@/lib/api/api-client";

import type { AvailabilityResponse } from "../types/availability-response";

type GetAvailabilityOptions = {
  serviceId: string;
  date: string;
  signal?: AbortSignal;
};

export function getAvailability({
  serviceId,
  date,
  signal,
}: GetAvailabilityOptions) {
  const query = [
    `serviceId=${encodeURIComponent(
      serviceId,
    )}`,
    `date=${encodeURIComponent(date)}`,
  ].join("&");

  return apiRequest<AvailabilityResponse>(
    `/api/v1/availability?${query}`,
    {
      method: "GET",
      signal,
    },
  );
}