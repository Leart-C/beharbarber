import {
  useEffect,
  useState,
} from "react";

import { getSchedule } from "../api/get-schedule";

export function useWorkingDays() {
  const [workingDays, setWorkingDays] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadWorkingDays() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getSchedule({
          signal: abortController.signal,
        });

        if (abortController.signal.aborted) {
          return;
        }

        setWorkingDays(response.workingDays);
      } catch (requestError) {
        if (
          abortController.signal.aborted ||
          (
            requestError instanceof Error &&
            requestError.name === "AbortError"
          )
        ) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError
            : new Error(
                "An unknown schedule error occurred.",
              ),
        );
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadWorkingDays();

    return () => {
      abortController.abort();
    };
  }, []);

  return {
    workingDays,
    isLoading,
    error,
  };
}