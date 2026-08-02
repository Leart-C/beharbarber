import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";

export const authGradientColors = [
  "rgba(8,17,34,0.08)",
  "rgba(8,17,34,0.28)",
  "rgba(8,17,34,0.78)",
  brandColors.navy,
] as const;

export const authGradientLocations = [
  0,
  0.38,
  0.7,
  1,
] as const;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.navy,
  },

  background: {
    ...StyleSheet.absoluteFill,
  },
});