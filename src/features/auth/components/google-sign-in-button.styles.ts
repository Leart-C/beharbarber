import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { radius, spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  button: {
    width: "100%",
    minHeight: 64,
    overflow: "hidden",

    borderRadius: radius.lg,
    backgroundColor: brandColors.blue,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 14,

    elevation: 6,
  },

  content: {
    minHeight: 64,
    paddingHorizontal: spacing.xl,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },

  pressed: {
    backgroundColor: brandColors.bluePressed,
    transform: [{ scale: 0.985 }],
  },

  disabled: {
    opacity: 0.65,
  },

  googleIconContainer: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: brandColors.white,
  },

  googleIconText: {
    color: "#4285F4",
    fontFamily: fontFamily.bold,
    fontSize: 17,
    lineHeight: 21,
  },

  label: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
  },
});