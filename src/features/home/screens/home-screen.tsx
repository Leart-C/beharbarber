import { ScrollView } from "react-native";

import { SafeAreaScreen } from "@/components/layout/safe-area-screen";

import { HomeHeader } from "../components/home-header";
import {
  type AppLanguage,
  LanguageToggle,
} from "../components/language-toggle";
import { useState } from "react";

export function HomeScreen() {
  const [language,setLanguage] = useState<AppLanguage>("sq");

  return (
    <SafeAreaScreen
      edges={["left", "right"]}
      className="bg-background"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
      >
        <HomeHeader 
          rightAccessory={
            <LanguageToggle
              value={language}
              onChange={setLanguage}
            />
          }
        />
      </ScrollView>
    </SafeAreaScreen>
  );
}