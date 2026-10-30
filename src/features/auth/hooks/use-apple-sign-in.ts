import { useSignInWithApple } from "@clerk/expo/apple";
import { useCallback, useState } from "react";

import { useTranslation } from "@/features/localization/hooks/use-translation";

// Native Sign in with Apple (iOS only). Clerk exchanges Apple's identity token
// for a session and decides whether this is a sign-in or a new sign-up.
export function useAppleSignIn() {
  const { t } = useTranslation();
  const { startAppleAuthenticationFlow } = useSignInWithApple();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const signInWithApple = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { createdSessionId, setActive } =
        await startAppleAuthenticationFlow();

      // No session and no error means the person closed the Apple sheet.
      if (!createdSessionId || !setActive) {
        return;
      }

      await setActive({ session: createdSessionId });
    } catch (error) {
      console.error("Apple sign-in failed:", error);
      setErrorMessage(t("auth.appleError"));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, startAppleAuthenticationFlow, t]);

  return {
    signInWithApple,
    isLoading,
    errorMessage,
    clearError,
  };
}
