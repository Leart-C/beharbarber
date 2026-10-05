export function ownNotificationId(
  data: unknown,
  userId: string | null | undefined,
) {
  if (!userId || typeof data !== "object" || data === null) return null;
  const id = Reflect.get(data, "notificationId");
  return Reflect.get(data, "recipientId") === userId &&
    typeof id === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
    ? id
    : null;
}
