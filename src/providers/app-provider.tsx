import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import type { PropsWithChildren } from "react";

import { env } from "@/config/env";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ClerkProvider
      publishableKey={env.clerkPublishableKey}
      tokenCache={tokenCache}
    >
      {children}
    </ClerkProvider>
  );
}