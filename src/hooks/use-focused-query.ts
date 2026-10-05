import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import { startAppPolling } from "@/lib/sync/start-app-polling";

type Query<T> = (options: { signal: AbortSignal }) => Promise<T>;

// Pass a stable module-level query or a useCallback function.
export function useFocusedQuery<T>(query: Query<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  const active = useRef<AbortController | null>(null);
  const refresh = useCallback(() => {
    active.current?.abort();
    setIsLoading(true);
    setRevision((value) => value + 1);
  }, []);

  useFocusEffect(
    useCallback(() => {
      // A retry restarts the subscription, including when it follows an aborted request.
      void revision;
      return startAppPolling(async (controller) => {
        active.current = controller;
        try {
          const response = await query({ signal: controller.signal });
          if (controller.signal.aborted) return;
          setData(response);
          setError(null);
        } catch (error) {
          if (!controller.signal.aborted) {
            setError(
              error instanceof Error ? error : new Error("Unable to load data"),
            );
          }
        } finally {
          if (!controller.signal.aborted) setIsLoading(false);
        }
      });
    }, [query, revision]),
  );

  return { data, error, isLoading, refresh };
}
