# API contract

The sibling `beharbarber-admin` project serves these routes under `/api/v1`.
The Expo API URL is the host, without this prefix. Both apps use the shop timezone
`Europe/Belgrade`; API timestamps include a UTC offset and prices are integer cents.

## Customer and public HTTP routes

| Method and path | Input | Response / access |
| --- | --- | --- |
| `GET /services` | None | Active categories with nested active services; public |
| `GET /schedule` | None | `{ workingDays: number[] }`, Sunday = 0; public |
| `GET /business` | None | `{ business }` public contact/settings fields; public |
| `GET /announcements/current` | None | `{ announcement }`, nullable; active and within its display dates; public |
| `GET /availability` | `serviceId`, `date` (`YYYY-MM-DD`), optional `appointmentId` | `{ date, timeSlots: [{ startsAt, available }] }` |
| `GET /me` | Clerk Bearer token | Current customer profile |
| `GET /appointments` | Clerk Bearer token | `{ appointments }`, only the authenticated customer's records |
| `POST /appointments` | `{ serviceId, startsAt }`, Clerk Bearer token | `201 { appointment }` |
| `PATCH /appointments/:appointmentId` | `{ startsAt }`, Clerk Bearer token | `{ appointment }`; reschedules an owned future confirmed booking |
| `PATCH /appointments/:appointmentId/cancel` | Clerk Bearer token | `{ appointment: { id, status, cancelledAt } }` |

Creation availability is public. When `appointmentId` is supplied, availability
requires authentication and ownership, excludes that booking from conflicts, and
uses its saved duration and buffer. Rescheduling preserves the booking's service
name, price, duration, and buffer rather than adopting edited catalogue values.
Inactive services cannot be booked or rescheduled.

The server derives customer identity from Clerk and calculates price, duration,
end time, and occupied end time. It never trusts those values from the client.
Expected failures include `400` for invalid input, `401` for missing authentication,
`404` for missing/inaccessible resources, and `409` for booking conflicts.

## Admin interface

Services, appointment statuses, blocked times, announcements, working hours, and
business settings are managed through **Next.js Server Actions**, not the
previously documented `/admin/services` or `/admin/appointments` HTTP endpoints.
Their server functions call `requireAdmin`, which accepts `admin` and `barber` roles.

The admin notification HTTP endpoint is:

- `GET /admin/notifications/appointments`: `{ unreadCount }` for new customer bookings.
- `POST /admin/notifications/appointments`: mark bookings seen; `204` response.

Both require staff authorization. Cancellation and rescheduling are not counted
as new-booking notifications; the open dashboard, appointments, and customer views
refresh independently to pick up these changes.

## Synchronization behavior

Customer screen queries refresh on focus, foreground return, and every 15 seconds
while focused and active. The shared appointment cache polls once per signed-in
session while active. Backgrounding and screen cleanup abort obsolete reads;
mutation responses invalidate older appointment reads.

Admin dashboard, appointment, and customer views refresh every 15 seconds while
visible, plus when returning to the tab or reconnecting. A refresh in progress
pauses the next timer. Form pages preserve local drafts. Staff status changes also
invalidate dashboard and customer history paths.

This is polling, so changes are eventually visible after a successful refresh,
not delivered instantly. Network failures can extend that delay. Server mutation
checks remain authoritative even if a displayed slot is stale.

## Database guarantees and limitations

Status changes and their history events are written atomically. The update checks
confirmed status, customer ownership when applicable, the observed start time, and
the current database time. A concurrent reschedule or status change causes a conflict.

The confirmed-appointment exclusion constraint must be applied in the deployed
database to prevent concurrent double booking. Working-hours and blocked-time
changes currently use separate preflight checks: cross-table races with booking
creation still require database-level coordination and integration testing.
