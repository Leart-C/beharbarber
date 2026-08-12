import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

import { getBusinessSettings } from "../api/get-business-settings";
import type { BusinessSettings } from "../types/business-settings";

export function useBusinessSettings() {
  const [businessSettings, setBusinessSettings] =
    useState<BusinessSettings | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

const refreshBusinessSettings = useCallback(() => {
    setIsLoading(true);
    setRefreshKey((currentKey) => currentKey + 1);
}, []);

  useFocusEffect(
    useCallback(() => {
      const abortController = new AbortController();

      getBusinessSettings({
        signal: abortController.signal,
      })
        .then((response) => {
          if (abortController.signal.aborted) {
            return;
          }

          setBusinessSettings(response.business);
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
                  "An unknown business settings error occurred.",
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
    }, [refreshKey]),
  );

  return {
    businessSettings,
    isLoading,
    error,
    refreshBusinessSettings,
  };
}