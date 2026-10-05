# Booking refactor: verification and remaining work

For the later admin/customer synchronization pass, see [admin-sync-verification.md](admin-sync-verification.md).

This is a focused booking/session reliability pass, not a complete security audit
or a claim that the app is ready for store release.

## Verified results from this pass

- Expo: TypeScript, lint, 32 tests, and production iOS JavaScript/asset export passed.
- Backend: lint, 28 tests, TypeScript, and Next.js production build passed.
- Booking screen: layout separated from selection, availability, and submission logic.
- Direct font imports reduced the exported Inter fonts from 18 to 4:
  6,217,596 bytes to 1,375,496 bytes. This is uncompressed asset size, not an
  App Store download-size measurement.
- The simulator/device acceptance checks below have not been performed by this pass.

## Dependency audit findings

The backend was updated from Next.js 16.3.0 to 16.3.8 with matching
`eslint-config-next`, and its transitive `nanoid` dependency to 3.3.19.
The verified production audit (`npm audit --omit=dev`) reports **zero known advisories**.
The full backend audit still reports 11 development-dependency entries (7 high, 4 moderate).
This is an advisory snapshot, not proof of application security.

The Next.js patch addresses affected-version ranges in these upstream advisories:

- [Windows-hosted remote code execution](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36)
- [AVIF image-optimization remote code execution](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4)
- [ImageResponse remote code execution](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j)

The Expo audit snapshot reported 84 dependency entries (61 high, 23 moderate).
Many are inherited through build/test tools, but they must not all be dismissed as
development-only: `expo-router → query-string → decode-uri-component` is also
reported. Dependency counts are not counts of independently exploitable app bugs.
SDK-compatible remediation and assessment of actual reachability remain required.
Some suggested fixes change or downgrade framework versions, so no forced SDK
upgrade or blanket overrides were applied. Re-run audits before release.

## Automated coverage

Expo tests cover late responses after mutation, session changes, duplicate submission,
rescheduling versus creation, conflict refresh, selection reset, booked service snapshots,
shop-local dates/DST, advancing the next appointment, and malformed API responses.

Backend tests cover slot boundaries, buffers, split shifts, busy periods, fixed clock
evaluation, exclusion-error classification, safe HTTP failures, and existing schema tests.
These tests do not connect to Neon or Clerk.

Run from Expo:

```sh
npm ci
npx tsc --noEmit
npm run lint
npm test -- --ci
```

Run from the sibling admin project:

```sh
npm run lint
npm test
npm run build
```

## Manual checks before committing

Use development/test data, not real customer appointments.

- Book once, tap confirm rapidly, and verify exactly one booking and one history event.
- Reschedule and cancel; verify Home, Appointments, and the admin reflect the change.
- Select a time, switch the date, and confirm the previous time is cleared.
- Have another client take a slot; verify the conflict refreshes choices and allows retry.
- Change a service's duration/price after booking, then reschedule the original booking.
  Its booked snapshot must remain unchanged and offered slots must fit that duration plus buffer.
- Sign out and sign into another account while a slow request is outstanding.
  No previous customer's appointments should be visible.
- Test another device timezone and resuming the app after a selected slot has passed.
- Check booking, rescheduling, and the success animation on the actual Expo simulator/device.

## Security and release follow-ups

- The Expo `.env` file was already tracked in Git. Adding it to `.gitignore` does NOT
  untrack it. Review it and deliberately remove it from tracking before publishing.
  `.env.example` contains placeholders. Only publishable configuration belongs in Expo;
  never add Clerk secret keys, database credentials, or service-account tokens.
  If a real secret was ever committed, rotate it; deleting a file does not erase history.
- Use an HTTPS API URL in production. Server credentials belong only in the backend host.
- Exercise real HTTP authorization tests: unauthenticated access, another customer's
  appointment id, customer attempts at admin mutations, and expired/revoked sessions.
  UI visibility is not authorization. The modified handlers retain server-side ownership checks.
- Verify the existing database exclusion-constraint migration is applied in the deployed
  database. Test two clients booking the same slot simultaneously against that database.
- Check a booking racing with an admin blocked-time or working-hours change.
  Those cross-table races are NOT solved by this refactor's preflight checks.
- Decide whether barbers and administrators need different permissions. The existing
  admin guard accepts both; this pass does not change that product policy.
- Add rate limiting/abuse controls and production monitoring at the API boundary.
- This pass does not add durable idempotency keys. A duplicate-tap lock handles local
  repeated taps, not every retry after a lost network response.
- Foreground/focus revalidation was subsequently added; see the synchronization
  report for coverage and the remaining integration checks.

No database migrations or live appointment mutations are required by this refactor.
