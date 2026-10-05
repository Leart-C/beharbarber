# Admin and customer synchronization review — 2026-10-05

Reviewed the sibling admin source alongside the Expo consumers: catalogue,
settings, announcements, working hours, availability, appointments, status writes,
and admin notification lifecycle. Existing uncommitted admin work was preserved.

## Changes

- Replaced four duplicated customer fetching lifecycles with `useFocusedQuery`.
  Queries poll every 15 seconds while focused, abort on blur/background, and
  refresh on foreground return. Reads cannot overlap and aborted reads cannot
  overwrite newer results. Manual business-settings retry remains supported.
- Added the same foreground lifecycle to the single session-owned appointment
  cache and booking availability. Staff cancellations, edited hours, removed
  slots, and announcements no longer require restarting the customer app.
- Open admin dashboard, appointment, and customer views refresh while visible.
  Form pages retain drafts. Status mutations invalidate dependent history and
  dashboard routes as well as appointment routes.
- Extracted an independently testable notification client. Late GET responses
  cannot undo mark-as-seen, duplicate writes are coalesced, and the post-write
  count comes from a fresh read rather than an assumed zero.
- Shared the atomic status/history SQL between customer cancellation and staff
  updates. The write checks the observed start time and database time, preventing
  an update from acting on a concurrently rescheduled or newly started booking.
  Cancellation now uses the existing sanitized API error boundary.
- Catalogue queries run concurrently and group services in one pass. Dashboard
  aggregates exclude historical rows before today. No performance benchmark was
  performed, so these are query/algorithm improvements, not measured speed claims.
- Corrected the API contract: actual `/api/v1` paths, rescheduling and shop data,
  and the distinction between admin Server Actions and HTTP endpoints.

## Verification

- Expo: 37 tests, TypeScript, and lint pass without warnings.
- Admin: 35 tests, TypeScript, and lint pass without warnings.
- Next.js production build and Expo production iOS JavaScript/asset export pass.
- Added regressions for polling updates, background/foreground transitions,
  focus cleanup, retry, ignored late reads, admin cancellation reaching the app,
  blocked slots changing, notification concurrency, and SQL write predicates.
- SQL tests compile the actual shared query; they do not execute against PostgreSQL.

## Remaining verification

No authenticated two-client booking/cancellation/rescheduling scenario or native
simulator acceptance test was performed. No live appointments were modified.
Production Clerk/Neon authorization and concurrency guarantees are not established
by unit tests. Test with dedicated accounts/data and verify deployed migrations.

A booking racing with a blocked-time or working-hours update remains a known
cross-table database coordination gap. The existing preflight checks and appointment
exclusion constraint do not close it. This pass adds no migration or transaction
locking scheme. Polling also cannot promise instantaneous synchronization.

This report does not certify the absence of all defects or replace the release
follow-ups in `refactor-verification.md`.
