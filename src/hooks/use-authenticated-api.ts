import { useAuth } from "@clerk/expo";
import { useCallback } from "react";

import { apiRequest } from "@/lib/api/api-client";

export function useAuthenticatedApi() {
  const {
    getToken,
    isLoaded,
    isSignedIn,
  } = useAuth();

  const authenticatedRequest = useCallback(
    async function request<T>(
      path: string,
      options: RequestInit = {},
    ): Promise<T> {
      if (!isLoaded) {
        throw new Error("Clerk is still loading.");
      }

      if (!isSignedIn) {
        throw new Error(
          "You must be signed in to perform this request.",
        );
      }

      const token = await getToken();

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
    [getToken, isLoaded, isSignedIn],
  );

  return {
    authenticatedRequest,
    isAuthLoaded: isLoaded,
    isSignedIn,
  };
}