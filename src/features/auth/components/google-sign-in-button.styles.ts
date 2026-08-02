import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { radius, spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  button: {
    minHeight: 60,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    backgroundColor: brandColors.blue,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },

  pressed: {
    backgroundColor: brandColors.bluePressed,
    transform: [{ scale: 0.99 }],
  },

  disabled: {
    opacity: 0.65,
  },

  googleIconContainer: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: brandColors.white,
  },

  googleIconText: {
    color: "#4285F4",
    fontFamily: fontFamily.bold,
    fontSize: 17,
    lineHeight: 20,
  },

  label: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
  },
});