import { ScrollView } from "react-native";

import { SafeAreaScreen } from "@/components/layout/safe-area-screen";

import { HomeHeader } from "../components/home-header";

export function HomeScreen() {
  return (
    <SafeAreaScreen
      edges={["left", "right",]}
      className="bg-background"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
      >
        <HomeHeader />
      </ScrollView>
    </SafeAreaScreen>
  );
}