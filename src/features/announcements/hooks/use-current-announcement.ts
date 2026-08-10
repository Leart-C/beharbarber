import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

import { getCurrentAnnouncement } from "../api/get-current-announcement";
import type { CurrentAnnouncement } from "../types/announcement-response";

export function useCurrentAnnouncement() {
  const [announcement, setAnnouncement] =
    useState<CurrentAnnouncement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useFocusEffect(
    useCallback(() => {
      const abortController = new AbortController();

      getCurrentAnnouncement({
        signal: abortController.signal,
      })
        .then((response) => {
          if (abortController.signal.aborted) {
            return;
          }

          setAnnouncement(response.announcement);
          setError(null);
        })
        .catch((requestError: unknown) => {
          if (
            abortController.signal.aborted ||
            (requestError instanceof Error &&
              requestError.name === "AbortError")
          ) {
            return;
          }

          setError(
            requestError instanceof Error
              ? requestError
              : new Error(
                  "An unknown announcement error occurred.",
                ),
          );
        })
        .finally(() => {
          if (!abortController.signal.aborted) {
            setIsLoading(false);
          }
        });

      return () => {
        abortController.abort();
      };
    }, []),
  );

  return {
    announcement,
    isLoading,
    error,
  };
}