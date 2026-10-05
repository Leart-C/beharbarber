import { ownNotificationId } from "../utils/notification-target";
import { permitsNotifications } from "../utils/native-notifications";
const id = "00000000-0000-4000-8000-000000000001";
it("accepts only valid notification identifiers for the current account", () => {
  expect(
    ownNotificationId({ notificationId: id, recipientId: "me" }, "me"),
  ).toBe(id);
  expect(
    ownNotificationId({ notificationId: id, recipientId: "other" }, "me"),
  ).toBeNull();
  expect(
    ownNotificationId(
      { notificationId: "https://evil.example", recipientId: "me" },
      "me",
    ),
  ).toBeNull();
  expect(
    ownNotificationId({ notificationId: id, recipientId: "me" }, null),
  ).toBeNull();
});
it("recognizes iOS provisional authorization without treating denial as permission", () => {
  expect(permitsNotifications({ granted: false, ios: { status: 3 } })).toBe(
    true,
  );
  expect(permitsNotifications({ granted: false, ios: { status: 1 } })).toBe(
    false,
  );
  expect(permitsNotifications({ granted: true })).toBe(true);
});
