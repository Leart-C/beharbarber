import { useUser } from "@clerk/expo";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  const firstName = user?.firstName ?? "Mik";

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
            Pershendetje,
          </Text>

          <Text
            style={styles.name}
            numberOfLines={1}
          >
            {firstName}
          </Text>
        </View>

        {rightAccessory}
      </View>
    </View>
  );
}