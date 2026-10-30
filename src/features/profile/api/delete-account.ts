import type { AuthenticatedRequest } from "@/hooks/use-authenticated-api";

type DeleteAccountOptions = {
  authenticatedRequest: AuthenticatedRequest;
};

// Cancels upcoming bookings, erases personal data and deletes the Clerk user.
// The server answers 204 No Content when the account is gone.
export function deleteAccount({ authenticatedRequest }: DeleteAccountOptions) {
  return authenticatedRequest<void>("/api/v1/me", {
    method: "DELETE",
    signal: AbortSignal.timeout(20_000),
  });
}
