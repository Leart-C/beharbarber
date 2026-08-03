import { Text, View } from "react-native";

import { SafeAreaScreen } from "@/components/layout/safe-area-screen";

export function AppointmentsScreen() {
  return (
    <SafeAreaScreen edges={["top", "left", "right"]}>
      <View className="flex-1 px-6 pt-6">
        <Text className="font-inter-extrabold text-3xl text-foreground">
          Terminet
        </Text>

        <Text className="mt-2 font-inter-medium text-base text-foreground-secondary">
          Terminet e tua do të shfaqen këtu.
        </Text>
      </View>
    </SafeAreaScreen>
  );
}