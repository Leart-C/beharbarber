# Behar Barber — customer app

Expo SDK 57 / React Native customer app for booking and managing barber appointments.
The sibling `beharbarber-admin` Next.js project supplies the API and administration UI.

## Development

1. Run `npm ci`.
2. Copy the placeholders from `.env.example` into your local environment.
   Use a reachable API host for physical devices; their localhost is not your computer.
3. Start the backend separately, then run `npm start`.
4. Use the project's development build or simulator.

Expo public environment variables are bundled into the client. Only the Clerk
publishable key and public API URL belong here; server secrets never do.
Use HTTPS for the production API.

## Checks

```sh
npx tsc --noEmit
npm run lint
npm test -- --ci
```

## Where to start

- [Architecture and folder responsibilities](docs/architecture.md)
- [Refactor verification and security follow-ups](docs/refactor-verification.md)
- Routes: `src/app`
- Feature screens and behavior: `src/features`
- Shared UI: `src/components`
- Cross-feature hooks and API transport: `src/hooks`, `src/lib`
- Visual tokens: `src/theme`

Read the exact [Expo SDK 57 documentation](https://docs.expo.dev/versions/v57.0.0/)
before changing framework integrations.
