# Finding your way around

Keep the feature-first structure. Do not reorganize files just to reduce line counts.
A file should have one clear responsibility; a long stylesheet or translation dictionary
is not the same problem as a screen mixing requests, state transitions, and layout.

| Location                                 | Responsibility                                                       |
| ---------------------------------------- | -------------------------------------------------------------------- |
| `src/app`                                | Expo Router routes: read parameters and render a feature screen      |
| `src/features/<feature>/screens`         | Screen layout and composition                                        |
| `src/features/<feature>/components`      | Reusable visual pieces within that feature                           |
| `src/features/<feature>/hooks`           | React state, request lifecycle, user interactions                    |
| `src/features/<feature>/api`             | Endpoint paths, request/response types, transport calls              |
| `src/features/<feature>/context`         | Shared feature state with a defined lifetime                         |
| `src/features/<feature>/mappers`         | Convert API representations to UI data                               |
| `src/features/<feature>/utils`           | Pure calculations that do not fetch or render                        |
| `src/features/<feature>/types`           | Types shared within the feature                                      |
| `src/components`, `src/hooks`, `src/lib` | Truly cross-feature UI, hooks, and infrastructure                    |
| `src/config`, `src/theme`                | App configuration and visual tokens                                  |
| `__tests__` next to the subject          | Regression tests                                                     |
| `src/test-support`                       | Test-only fixtures and deferred promises; never import from app code |

Create these folders only when needed. Do not add empty layers or barrel exports
that hide where a function lives.

## Booking: which file should I edit?

- Layout: `features/booking/screens/booking-screen.tsx`.
- Selected service/date/time and reschedule snapshot: `hooks/use-booking.ts`.
- Submit, duplicate-tap protection, conflict handling: `hooks/use-booking-submission.ts`.
- Slot requests, cancellation, and refresh: `hooks/use-availability.ts`.
- Shop-local calendar days: `utils/create-booking-dates.ts`.
- Cross-screen appointment cache: `features/appointments/hooks/use-remote-appointments.ts`.
- Session lifetime and cancellation action: `features/appointments/context/appointments-context.tsx`.
- Price-cents conversion: `features/appointments/mappers/map-appointment.ts`.

Keep one appointment state owner. Home, Appointments, and Booking consume the provider;
they must not each maintain a second independently synchronized appointment list.
The provider remounts its subtree when the Clerk session changes to clear private data.
Requests started before a successful mutation are invalidated. An upsert starts a fresh
background read so other appointments are not lost if the first read was interrupted.

## Refresh lifecycle

`hooks/use-focused-query.ts` owns the shared screen query lifecycle for services,
shop settings, announcements, and working days. `lib/sync/start-app-polling.ts`
allows one request at a time, pauses and aborts when backgrounded, refreshes on
foreground return, and polls at 15-second intervals. Screen queries and availability
stop on blur; the appointment provider owns a single poller for the signed-in session.
Keep read functions stable so renders do not restart the subscription.

## Backend companion project

The sibling `beharbarber-admin` project owns the database and authorization.
Its booking routes now follow:

`app/api/v1/.../route.ts → features/appointments/server/http → server checks + pure utils → database`

- Route files expose HTTP methods and a safe error boundary.
- HTTP handlers authenticate and check ownership, validate input, and orchestrate work.
- `check-appointment-time-availability.ts` shares working-hours/block/overlap checks
  between creation and rescheduling.
- `build-time-slots.ts` generates candidate slots without database or authentication dependencies.
- Rescheduling uses the booked duration/buffer/price snapshot, not edited catalog values.
- Database writes still enforce confirmed-appointment overlap constraints; preflight
  availability alone cannot prevent concurrent bookings.

## Rules for the next refactor

1. Identify a concrete bug, duplication, or mixed responsibility.
2. Add a regression test for the behavior before changing it further.
3. Extract only the cohesive responsibility, preserving public props and API responses.
4. Run type-check, lint, and tests; then exercise the actual screen.
5. Commit that coherent change before moving to a different feature.

Avoid fetching serially when independent reads can run together. Do not parallelize
dependent writes or remove authorization checks for speed. Prefer clear names over
condensing code onto fewer lines.
