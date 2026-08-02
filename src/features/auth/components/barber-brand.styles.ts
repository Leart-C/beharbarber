import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },

  eyebrow: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
  },

  title: {
    color: brandColors.white,
    fontFamily: fontFamily.extraBold,
    fontSize: 68,
    lineHeight: 72,
    letterSpacing: -3,
  },

  marks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginTop: spacing.lg,
  },

  mark: {
    height: 8,
    borderRadius: 999,
  },

  blueMark: {
    width: 46,
    backgroundColor: brandColors.blue,
  },

  redMark: {
    width: 46,
    backgroundColor: brandColors.red,
  },

  grayMark: {
    width: 14,
    backgroundColor: "rgba(255,255,255,0.48)",
  },

  description: {
    maxWidth: 340,
    marginTop: spacing.xl,
    color: "rgba(255,255,255,0.82)",
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    lineHeight: 26,
  },
});