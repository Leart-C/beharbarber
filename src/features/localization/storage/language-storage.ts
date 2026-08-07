import AsyncStorage from "@react-native-async-storage/async-storage";

import type { AppLanguage } from "../types/app-language";

const LANGUAGE_STORAGE_KEY = "@beharbarber/language";

function isAppLanguage(value: string | null,): value is AppLanguage {
  return value === "sq" || value === "en";
}

export async function getStoredLanguage():Promise<AppLanguage | null>{
    const storageLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

    return isAppLanguage(storageLanguage) ? storageLanguage : null;
}

export async function saveLanguage(language: AppLanguage):Promise<void>{
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY,language);
}
