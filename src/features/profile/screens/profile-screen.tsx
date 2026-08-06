import { useClerk } from "@clerk/expo";
import { Pressable, Text, View } from "react-native";

import { SafeAreaScreen } from "@/components/layout/safe-area-screen";
import { useTranslation } from "@/features/localization/hooks/use-translation";

export function ProfileScreen() {
  const { signOut } = useClerk();
  const { t } = useTranslation();

  return (
    <SafeAreaScreen edges={["top", "left", "right"]}>
      <View className="flex-1 px-6 pt-6">
        <Text className="font-inter-extrabold text-3xl text-foreground">
          {t("profile.title")}
        </Text>

        <Text className="mt-2 font-inter-medium text-base text-foreground-secondary">
          {t("profile.description")}
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("profile.signOut")}
          onPress={() => signOut()}
          className="mt-8 min-h-14 items-center justify-center rounded-2xl bg-danger px-6 active:opacity-80"
        >
          <Text className="font-inter-bold text-base text-white">
            {t("profile.signOut")}
          </Text>
        </Pressable>
      </View>
    </SafeAreaScreen>
  );
}
