# Customer notifications

The customer inbox, device registration, preferences, durable notification queue,
and delivery worker are implemented. Apple credentials, an Expo project, and a
hosted backend/worker are still required for real lock-screen delivery.

## What customers receive

- Appointment cancellation and rescheduling alerts, including changes made on
  another device. No push is generated for routine catalogue or hours edits.
- An optional reminder two hours before the appointment. Bookings created or
  moved with less than two hours remaining do not receive an immediate reminder.
- Announcements only when staff select **Njofto klientët në telefon** and the
  customer has enabled shop announcements. This preference defaults to off.
- Albanian or English push content follows the registered device language.
  Appointment times use Europe/Belgrade. Inbox content uses the current app language.

Open **Profile → Notifications** to read the inbox, enable push notifications, or
change preferences. Permission is requested only after tapping Enable. A build
without native notification support or an Expo project keeps the inbox usable and
explains that push is not yet available.

## Test before Apple approves your account

1. Apply the admin migrations to the intended development database after approval:
   `cd /Users/leartbajrami/Development/beharbarber-admin && npm run db:migrate`.
   `0012_customer_notifications` adds storage; `0013_notification_events` adds the
   atomic appointment triggers and reminders for existing future appointments.
2. Run admin with `npm run dev`, and the customer app with `npm run ios` in their
   respective directories. Use a customer test account in iOS and staff account
   in admin, connected to the same backend.
3. Book a test appointment more than two hours ahead. Cancel it in admin, then
   open Profile → Notifications in the app. The cancellation should appear after
   refresh, without push credentials or a worker. Tap it to open Appointments.
4. Reschedule a test booking in the customer app and check its inbox. Change
   language and verify the same event is translated. Sign out and verify another
   account cannot see that inbox.
5. Run `npm test` in both repositories. Backend tests use an isolated PostgreSQL
   runtime, apply **all** migrations, and mock Expo and Clerk session checks.
   They test rollback, rescheduling, opt-in, token/account changes, exclusive
   claims, lease recovery, retries, revoked sessions, and receipts. They never
   send real pushes or write to the configured Neon database.

Scheduled announcements are expanded by the worker. The automated database tests
exercise that expansion before any credentials are available. Do not enable a
live worker against real devices just to test the inbox.

## Enable real push delivery after Apple approval

1. Create/sign into your Expo account and link the app using `npx eas-cli init` in
   the customer project. The app's dynamic config reads the EAS project ID from
   `EXPO_PUBLIC_EAS_PROJECT_ID` or `app.json` → `expo.extra.eas.projectId`.
   With dynamic config, copy the returned project ID into `.env` and into the
   build environment; the CLI may ask you to do this manually. Never use a fake ID.
2. Keep the existing bundle identifier consistent with the app registered in
   Apple Developer. Configure APNs credentials with `npx eas-cli credentials -p ios`.
3. Build a new native app. For a signed internal iPhone build use
   `npx eas-cli build --platform ios --profile preview`; register the test device
   when prompted. The preview profile embeds the app's JS. Set the production
   backend URL and EAS project ID in its build environment. Local simulator builds
   can use `npm run ios` after prebuild/pod installation.
4. Deploy the admin Next.js application with its current database and Clerk
   configuration. Use HTTPS, with the same Clerk instance as the customer app.
5. Configure these **server-only** values:
   - `PUSH_NOTIFICATIONS_ENABLED=true`
   - `NOTIFICATION_WORKER_SECRET`: a random secret of at least 32 characters;
     generate one with `openssl rand -hex 32` and store it privately.
   - `EXPO_ACCESS_TOKEN`: required if enhanced push security is enabled in Expo.
     Enable that protection for production and set the corresponding access token.
   - `NOTIFICATION_WORKER_URL`: the hosted admin origin for the worker process.
6. Run `npm run notifications:worker` as a managed background service with automatic
   restart and monitoring. It calls the protected endpoint every 15 seconds after
   the previous run finishes. Alternatively, use your host's authenticated scheduler
   to POST `/api/internal/notifications/process` regularly with the
   `x-notification-worker-secret` header. Configure a 60-second request runtime.
   No Codex desktop automation is used: delivery must work while your Mac is off.
7. Open the signed app on the test iPhone and enable notifications. Lock the phone,
   cancel its future test appointment from admin, and verify the banner, sound,
   notification tap, and refreshed appointment list. Test Focus mode, permission
   denial, a second account, and app cold start separately.

Both the migration and worker configuration are deployment prerequisites. Push is
**off by default** when `PUSH_NOTIFICATIONS_ENABLED` is absent or not exactly `true`.
Restart the server after changing environment values.

## Reliability and operation

Appointment changes and notification events commit in the same database transaction.
The worker claims bounded batches using `FOR UPDATE SKIP LOCKED`, with leases and
up to five send attempts. Temporary failures use exponential backoff. It checks
current booking state, preferences, device ownership/token/session, and the Clerk
session immediately before sending. Customer logout unregisters the device and
revokes the Clerk session; the worker skips revoked sessions even if unregistration
failed offline. Notifications already handed to Apple cannot be recalled.

Opening a notification uses a validated notification ID and current recipient,
never an arbitrary URL from the payload. Foreground receipt refreshes appointments;
tapping opens the authenticated inbox. The inbox is independent of push permission.

Expo tickets mean **accepted by Expo**. Receipts are checked after 15 minutes;
`delivered` in the delivery table means **accepted by APNs/FCM**, not that a person
saw the notification. Missing receipts are retried up to 24 hours. Invalid tokens
are disabled; credential/payload errors fail visibly instead of retrying forever.
Worker output reports counts only, without device tokens or message content.

Delivery is at least once: a worker crash after provider acceptance but before saving
the ticket can produce a duplicate. Expiry limits obsolete alerts; the app always
fetches authoritative data. Permissions, Focus, connectivity, and APNs determine
actual display. Expired Clerk sessions stop pushes until the app registers again.
A working inbox and successful tests do not prove live APNs delivery.

Monitor failed/old pending deliveries and worker HTTP errors. Review queue growth and
set a retention policy before scaling; this implementation does not delete customer
notification history automatically.

References:
- https://docs.expo.dev/versions/v57.0.0/sdk/notifications/
- https://docs.expo.dev/push-notifications/push-notifications-setup/
- https://docs.expo.dev/push-notifications/sending-notifications/
