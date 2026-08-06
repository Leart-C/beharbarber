import { apiRequest } from "@/lib/api/api-client";

import type { ScheduleResponse } from "../types/schedule-response";

type GetScheduleOptions = {
  signal?: AbortSignal;
};

export function getSchedule({
  signal,
}: GetScheduleOptions = {}) {
  return apiRequest<ScheduleResponse>(
    "/api/v1/schedule",
    {
      method: "GET",
      signal,
    },
  );
}