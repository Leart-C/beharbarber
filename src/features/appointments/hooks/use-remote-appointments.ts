import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useAuthenticatedApi } from "@/hooks/use-authenticated-api";

import { getAppointments } from "../api/get-appointments";
import type { Appointment } from "../types/appointment";

export function useRemoteAppointments() {
  const {
    authenticatedRequest,
    isAuthLoaded,
    isSignedIn,
  } = useAuthenticatedApi();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshAppointments = useCallback(() => {
    setRefreshKey((currentKey) => currentKey + 1);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    if (!isAuthLoaded) {
      return () => {
        abortController.abort();
      };
    }

    if (!isSignedIn) {
      setAppointments([]);
      setError(null);
      setIsLoading(false);

      return () => {
        abortController.abort();
      };
    }

    async function loadAppointments() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getAppointments({
          authenticatedRequest,
          signal: abortController.signal,
        });

        const currentTime = Date.now();

        const mappedAppointments = response.appointments
          .filter(
            (appointment) =>
              appointment.status === "confirmed" &&
              new Date(appointment.startsAt).getTime() >= currentTime,
          )
          .map(
            (appointment): Appointment => ({
              id: appointment.id,
              startsAt: appointment.startsAt,
              serviceName: appointment.serviceName,
              durationMinutes: appointment.durationMinutes,
              price: appointment.priceCents / 100,
              currency: appointment.currency,
            }),
          );

        setAppointments(mappedAppointments);
      } catch (requestError) {
        if (
          requestError instanceof Error &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError
            : new Error(
                "An unknown appointments error occurred.",
              ),
        );
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadAppointments();

    return () => {
      abortController.abort();
    };
  }, [
    authenticatedRequest,
    isAuthLoaded,
    isSignedIn,
    refreshKey,
  ]);

  return {
    appointments,
    isLoading,
    error,
    refreshAppointments,
  };
}