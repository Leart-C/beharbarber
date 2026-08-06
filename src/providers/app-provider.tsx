import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import type { PropsWithChildren } from "react";
import { AppointmentsProvider } from "@/features/appointments/context/appointments-context";
import { LanguageProvider } from "@/features/localization/context/language-context";

import { env } from "@/config/env";

export function AppProvider({
  children,
}: PropsWithChildren) {
  return (
    <ClerkProvider
      publishableKey={env.clerkPublishableKey}
      tokenCache={tokenCache}
    >
      <LanguageProvider>
        <AppointmentsProvider>
          {children}
        </AppointmentsProvider>
      </LanguageProvider>
    </ClerkProvider>
  );
}