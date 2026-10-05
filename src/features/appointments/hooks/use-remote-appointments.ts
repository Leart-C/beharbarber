import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthenticatedApi } from "@/hooks/use-authenticated-api";
import { startAppPolling } from "@/lib/sync/start-app-polling";
import { getAppointments } from "../api/get-appointments";
import { mapAppointment } from "../mappers/map-appointment";
import type { Appointment } from "../types/appointment";

// Owned by the session-keyed provider. A session change creates a fresh cache.
export function useRemoteAppointments() {
  const { authenticatedRequest, isAuthLoaded, isSignedIn } =
    useAuthenticatedApi();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const activeRequest = useRef<AbortController | null>(null);

  const refreshAppointments = useCallback(() => {
    activeRequest.current?.abort();
    setIsLoading(true);
    setRefreshKey((key) => key + 1);
  }, []);

  // A response started before a successful mutation must never undo it.
  const upsertAppointment = useCallback((appointment: Appointment) => {
    activeRequest.current?.abort();
    setIsLoading(false);
    setError(null);
    setAppointments((current) => [
      appointment,
      ...current.filter((item) => item.id !== appointment.id),
    ]);
    // Reload after the commit so an interrupted initial GET does not lose other bookings.
    setRefreshKey((key) => key + 1);
  }, []);

  const removeAppointment = useCallback((id: string) => {
    activeRequest.current?.abort();
    setIsLoading(false);
    setError(null);
    setAppointments((current) => current.filter((item) => item.id !== id));
  }, []);

  useEffect(() => {
    if (!isAuthLoaded || !isSignedIn) return;
    return startAppPolling(async (controller) => {
      activeRequest.current = controller;
      try {
        const response = await getAppointments({
          authenticatedRequest,
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;
        const now = Date.now();
        setAppointments(
          response.appointments
            .filter(
              (item) =>
                item.status === "confirmed" && Date.parse(item.startsAt) >= now,
            )
            .map(mapAppointment),
        );
        setError(null);
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error
              : new Error("Unable to load appointments"),
          );
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    });
  }, [authenticatedRequest, isAuthLoaded, isSignedIn, refreshKey]);

  return {
    appointments: isSignedIn ? appointments : [],
    isLoading: !isAuthLoaded || (Boolean(isSignedIn) && isLoading),
    error: isSignedIn ? error : null,
    refreshAppointments,
    upsertAppointment,
    removeAppointment,
  };
}
