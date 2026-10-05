import { apiRequest } from "@/lib/api/api-client";
import type { ServicesResponse } from "../types/services-response";

export function getServices({ signal }: { signal?: AbortSignal } = {}) {
  return apiRequest<ServicesResponse>("/api/v1/services", { signal });
}
