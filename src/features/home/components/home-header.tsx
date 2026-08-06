import { useUser } from "@clerk/expo";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "@/features/localization/hooks/use-translation";

import {
  homeHeaderGradient,
  styles,
} from "./home-header.styles";

type HomeHeaderProps = {
  rightAccessory?: ReactNode;
};

export function HomeHeader({
  rightAccessory,
}: HomeHeaderProps) {
  const { user } = useUser();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const firstName = user?.firstName ?? t("home.guest");

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/images/shop-hero.jpeg")}
        style={styles.backgroundImage}
        contentFit="cover"
        contentPosition="center"
        transition={300}
        accessibilityIgnoresInvertColors
      />

      <LinearGradient
        colors={homeHeaderGradient}
        style={styles.gradient}
      />

      <View
        style={[
          styles.content,
          {
            paddingTop: insets.top + 20,
          },
        ]}
      >
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>
            {t("home.greeting")}
          </Text>

          <Text
            style={styles.name}
            numberOfLines={1}
          >
            {firstName}
          </Text>
        </View>

        {rightAccessory ? (
          <View style={styles.accessoryContainer}>
            {rightAccessory}
          </View>
        ) : null}
      </View>
    </View>
  );
}