import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import type { PropsWithChildren } from "react";
import { View } from "react-native";

import {
  authGradientColors,
  authGradientLocations,
  styles,
} from "./auth-background.styles";

export function AuthBackground({
  children,
}: PropsWithChildren) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/images/barber-hero.jpeg")}
        style={styles.background}
        contentFit="cover"
        contentPosition="center"
        transition={300}
        accessibilityIgnoresInvertColors
      />

      <LinearGradient
        colors={authGradientColors}
        locations={authGradientLocations}
        style={styles.background}
      />

      {children}
    </View>
  );
}