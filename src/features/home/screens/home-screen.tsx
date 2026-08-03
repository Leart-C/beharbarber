import { ScrollView, View } from "react-native";
import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { HomeHeader } from "../components/home-header";
import {
  type AppLanguage,
  LanguageToggle,
} from "../components/language-toggle";
import { useState } from "react";
import { styles } from "./home-screen.styles";
import { BarberAlert } from "../components/barber-alert";

export function HomeScreen() {
  const [language,setLanguage] = useState<AppLanguage>("sq");
  const [isAlertVisible, setIsAlertVisible] = useState(true);

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

        <View style={styles.content}>
          {isAlertVisible ? (
            <BarberAlert
              message="Te premten mbyllim heret, ne 15:00"
              onDismiss={()=> setIsAlertVisible(false)}
            />
          ): null}
        </View>
        
      </ScrollView>
    </SafeAreaScreen>
  );
}