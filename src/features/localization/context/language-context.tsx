import {
  createContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import type { AppLanguage } from "../types/app-language";

type LanguageContextValue = {
    language: AppLanguage;
    setLanguage:(language: AppLanguage) => void;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({children}: PropsWithChildren){
    const [language, setLanguage] = useState<AppLanguage>("sq");

    const value = useMemo(
        ()=>({
            language,
            setLanguage
        }),
        [language]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}