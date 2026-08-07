import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import {
  getStoredLanguage,
  saveLanguage,
} from "../storage/language-storage";
import type { AppLanguage } from "../types/app-language";

type LanguageContextValue = {
  language: AppLanguage;
  setLanguage: (
    language: AppLanguage,
  ) => void;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null,);

export function LanguageProvider({children,}: PropsWithChildren) {
  const [language, setLanguageState] = useState<AppLanguage>("sq");
  const [isLanguageReady, setIsLanguageReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadLanguage() {
      try {
        const storedLanguage =
          await getStoredLanguage();

        if (isMounted && storedLanguage) {
          setLanguageState(storedLanguage);
        }
      } catch (error) {
        console.error(
          "Failed to load language:",
          error,
        );
      } finally {
        if (isMounted) {
          setIsLanguageReady(true);
        }
      }
    }

    void loadLanguage();

    return () => {
      isMounted = false;
    };
  }, []);

  const setLanguage = useCallback(
    (nextLanguage: AppLanguage) => {
      setLanguageState(nextLanguage);

      void saveLanguage(
        nextLanguage,
      ).catch((error) => {
        console.error(
          "Failed to save language:",
          error,
        );
      });
    },
    [],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage],
  );

  if (!isLanguageReady) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}