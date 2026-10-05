import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { startAppPolling } from "@/lib/sync/start-app-polling";
import { SHOP_TIME_ZONE } from "@/config/shop";
import type { AuthenticatedRequest } from "@/hooks/use-authenticated-api";
import { getAvailability } from "../api/get-availability";
import type { BookingTimeSlot } from "../types/booking-time-slot";

type Options = {
  serviceId: string;
  date: string;
  appointmentId?: string;
  authenticatedRequest: AuthenticatedRequest;
};
type Result = {
  key: string;
  request: AuthenticatedRequest;
  timeSlots: BookingTimeSlot[];
  error: Error | null;
};
const timeFormatter = new Intl.DateTimeFormat("sq-AL", {
  timeZone: SHOP_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function useAvailability({
  serviceId,
  date,
  appointmentId,
  authenticatedRequest,
}: Options) {
  const [result, setResult] = useState<Result | null>(null);
  const [revision, setRevision] = useState(0);
  const refreshAvailability = useCallback(
    () => setRevision((value) => value + 1),
    [],
  );
  const key = JSON.stringify([serviceId, date, appointmentId, revision]);
  const enabled = Boolean(serviceId && date);

  useFocusEffect(
    useCallback(() => {
      if (!enabled) return;
      return startAppPolling(async (controller) => {
        try {
          const response = await getAvailability({
            serviceId,
            date,
            appointmentId,
            authenticatedRequest,
            signal: controller.signal,
          });
          if (controller.signal.aborted) return;
          setResult({
            key,
            request: authenticatedRequest,
            error: null,
            timeSlots: response.timeSlots.map((slot) => ({
              id: slot.startsAt,
              startsAt: slot.startsAt,
              label: timeFormatter.format(new Date(slot.startsAt)),
              isAvailable: slot.available,
            })),
          });
        } catch (error) {
          if (controller.signal.aborted) return;
          setResult({
            key,
            request: authenticatedRequest,
            timeSlots: [],
            error:
              error instanceof Error
                ? error
                : new Error("Unable to load availability"),
          });
        }
      }, 150);
    }, [key, enabled, serviceId, date, appointmentId, authenticatedRequest]),
  );

  // Hide old slots immediately during render, before effect cleanup runs.
  const current =
    enabled && result?.key === key && result.request === authenticatedRequest
      ? result
      : null;
  return {
    timeSlots: current?.timeSlots ?? [],
    isLoading: enabled && !current,
    error: current?.error ?? null,
    refreshAvailability,
  };
}
