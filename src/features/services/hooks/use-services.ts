import {
  useCallback,
  useMemo,
  useState,
} from "react";
import { useFocusEffect } from "expo-router";

import { getServices } from "../api/get-services";
import { mapServicesResponse } from "../mappers/map-services-response";
import type { ServicesResponse } from "../types/services-response";

const serviceRefreshIntervalMs = 15_000;

export function useServices() {
  const [data, setData] =
    useState<ServicesResponse | null>(null);
  const [error, setError] =
    useState<Error | null>(null);
  const [isLoading, setIsLoading] =
    useState(true);

  useFocusEffect(
    useCallback(() => {
      const abortController =
        new AbortController();

      let isRequestRunning = false;

      function refreshServices() {
        if (
          isRequestRunning ||
          abortController.signal.aborted
        ) {
          return;
        }

        isRequestRunning = true;

        getServices({
          signal: abortController.signal,
        })
          .then((response) => {
            if (
              abortController.signal.aborted
            ) {
              return;
            }

            setData(response);
            setError(null);
          })
          .catch((requestError: unknown) => {
            if (
              abortController.signal.aborted ||
              (requestError instanceof Error &&
                requestError.name ===
                  "AbortError")
            ) {
              return;
            }

            setError(
              requestError instanceof Error
                ? requestError
                : new Error(
                    "An unknown services error occurred.",
                  ),
            );
          })
          .finally(() => {
            isRequestRunning = false;

            if (
              !abortController.signal.aborted
            ) {
              setIsLoading(false);
            }
          });
      }

    refreshServices();

    const intervalId = setInterval(
      refreshServices,
      serviceRefreshIntervalMs,
    );

    return () => {
      clearInterval(intervalId);
      abortController.abort();
    };
  }, []),
);

  const catalog = useMemo(
    () =>
      data
        ? mapServicesResponse(data)
        : {
            categories: [],
            services: [],
          },
    [data],
  );

  return {
    categories: catalog.categories,
    services: catalog.services,
    data,
    isLoading,
    error,
  };
}