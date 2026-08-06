import {
  useEffect,
  useState,
} from "react";

import { getAvailability } from "../api/get-availability";
import type { BookingTimeSlot } from "../types/booking-time-slot";

type UseAvailabilityOptions = {
  serviceId: string;
  date: string;
};

function formatTimeLabel(
  startsAt: string,
): string {
  return new Intl.DateTimeFormat(
    "sq-AL",
    {
      timeZone: "Europe/Belgrade",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    },
  ).format(new Date(startsAt));
}

export function useAvailability({
  serviceId,
  date,
}: UseAvailabilityOptions) {
  const [
    timeSlots,
    setTimeSlots,
  ] = useState<BookingTimeSlot[]>([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<Error | null>(null);

  useEffect(() => {
    const abortController =
      new AbortController();

    if (!serviceId || !date) {
      setTimeSlots([]);
      setIsLoading(false);
      setError(null);

      return () => {
        abortController.abort();
      };
    }

    async function loadAvailability() {
      try {
        setIsLoading(true);
        setError(null);
        setTimeSlots([]);

        const response =
          await getAvailability({
            serviceId,
            date,
            signal:
              abortController.signal,
          });

        const mappedTimeSlots =
          response.timeSlots.map(
            (timeSlot) => ({
              id: timeSlot.startsAt,
              startsAt:
                timeSlot.startsAt,
              label: formatTimeLabel(
                timeSlot.startsAt,
              ),
              isAvailable:
                timeSlot.available,
            }),
          );

        setTimeSlots(mappedTimeSlots);
      } catch (requestError) {
        if (
          requestError instanceof Error &&
          requestError.name ===
            "AbortError"
        ) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError
            : new Error(
                "An unknown availability error occurred.",
              ),
        );
      } finally {
        if (
          !abortController.signal.aborted
        ) {
          setIsLoading(false);
        }
      }
    }

    void loadAvailability();

    return () => {
      abortController.abort();
    };
  }, [serviceId, date]);

  return {
    timeSlots,
    isLoading,
    error,
  };
}