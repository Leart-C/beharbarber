import { useClerk } from "@clerk/expo";
import { Button, Text, View } from "react-native";

import { SafeAreaScreen } from "@/components/layout/safe-area-screen";

export default function HomeScreen() {
  const { signOut } = useClerk();

  return (
    <SafeAreaScreen>
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="font-inter-bold text-2xl text-foreground">
          Home screen
        </Text>

        <Text className="font-inter-medium text-foreground-secondary">
          Theme test
        </Text>

        <Button
          title="Sign out"
          onPress={() => signOut()}
        />
      </View>
    </SafeAreaScreen>
  );
}