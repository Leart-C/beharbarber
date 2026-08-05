import { apiRequest } from "@/lib/api/api-client";

export type CurrentUserResponse = {
  userId: string;
};

export function getCurrentUser(token: string) {
  return apiRequest<CurrentUserResponse>(
    "/api/v1/me",
    {
      method: "GET",
      token,
    },
  );
}