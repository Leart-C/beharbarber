import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import type { PropsWithChildren } from "react";
import { AppointmentsProvider } from "@/features/appointments/context/appointments-context";

import { env } from "@/config/env";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ClerkProvider
      publishableKey={env.clerkPublishableKey}
      tokenCache={tokenCache}
    >
      <AppointmentsProvider>
        {children}
      </AppointmentsProvider>
    </ClerkProvider>
  );
}