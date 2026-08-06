import { serviceNameTranslations, translations, type TranslationKey } from "../translations";
import { useLanguage } from "./use-language";

type TranslationValues = Record<string, string | number>;

export function useTranslation() {
  const { language, setLanguage } = useLanguage();
  const locale = language === "sq" ? "sq-AL" : "en-US";

  function t(key: TranslationKey, values: TranslationValues = {}): string {
    const [section, name] = key.split(".");
    const languageDictionary = translations[language] as Record<string, Record<string, string>>;
    const fallbackDictionary = translations.sq as Record<string, Record<string, string>>;
    const template = languageDictionary[section]?.[name] ?? fallbackDictionary[section]?.[name] ?? key;

    return Object.entries(values).reduce(
      (result, [valueKey, value]) => result.replaceAll(`{${valueKey}}`, String(value)),
      template,
    );
  }

  function serviceName(name: string): string {
    return serviceNameTranslations[name]?.[language] ?? name;
  }

  return { language, locale, setLanguage, serviceName, t };
}
