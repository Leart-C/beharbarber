import { useAuth } from "@clerk/expo";
import {
  useCallback,
  useEffect,
  useRef,
} from "react";

import { apiRequest } from "@/lib/api/api-client";

export type AuthenticatedRequest = <T>(
  path: string,
  options?: RequestInit,
) => Promise<T>;

export function useAuthenticatedApi() {
  const {
    getToken,
    isLoaded,
    isSignedIn,
  } = useAuth();

  const getTokenRef = useRef(getToken);

  useEffect(() => {
    getTokenRef.current = getToken;
  }, [getToken]);

  const authenticatedRequest: AuthenticatedRequest =
    useCallback(
      async function request<T>(
        path: string,
        options: RequestInit = {},
      ): Promise<T> {
        if (!isLoaded) {
          throw new Error(
            "Clerk is still loading.",
          );
        }

        if (!isSignedIn) {
          throw new Error(
            "You must be signed in to perform this request.",
          );
        }

        const token =
          await getTokenRef.current();

        if (!token) {
          throw new Error(
            "Clerk did not return a session token.",
          );
        }

        return apiRequest<T>(path, {
          ...options,
          token,
        });
      },
      [isLoaded, isSignedIn],
    );

  return {
    authenticatedRequest,
    isAuthLoaded: isLoaded,
    isSignedIn,
  };
}