import type { AuthenticatedRequest } from "@/hooks/use-authenticated-api";
export type NotificationPreferences = {
  reminders: boolean;
  announcements: boolean;
};
export type InboxNotification = {
  id: string;
  kind: string;
  title: string;
  body: string;
  createdAt: string;
  readAt: string | null;
};
export type InboxResponse = {
  notifications: InboxNotification[];
  unreadCount: number;
  nextCursor: string | null;
};
const prefix = "/api/v1/notifications";
export function getInbox(
  request: AuthenticatedRequest,
  language: string,
  signal?: AbortSignal,
  cursor?: string,
) {
  return request<InboxResponse>(
    `${prefix}?language=${language}${cursor ? `&before=${encodeURIComponent(cursor)}` : ""}`,
    { signal },
  );
}
export function getPreferences(
  request: AuthenticatedRequest,
  signal?: AbortSignal,
) {
  return request<{ preferences: NotificationPreferences }>(
    `${prefix}/preferences`,
    { signal },
  );
}
export function savePreferences(
  request: AuthenticatedRequest,
  preferences: NotificationPreferences,
) {
  return request<{ preferences: NotificationPreferences }>(
    `${prefix}/preferences`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preferences),
    },
  );
}
export function markRead(request: AuthenticatedRequest, id: string) {
  return request<void>(`${prefix}/read`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
}
