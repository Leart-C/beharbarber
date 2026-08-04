import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  title: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
  },

  list: {
    gap: spacing.sm,
    paddingTop: spacing.md,
    paddingRight: spacing.xl,
  },

  datePressable: {
    width: 72,
  },

  dateCard: {
    width: "100%",
    height: 84,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },

  selectedDateCard: {
    backgroundColor: brandColors.blue,
    borderColor: brandColors.blue,
  },

  pressedDateCard: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },

  weekday: {
    color: "rgba(255, 255, 255, 0.58)",
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 18,
    textTransform: "capitalize",
  },

  day: {
    marginVertical: 1,

    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 34,
  },

  month: {
    color: "rgba(255, 255, 255, 0.58)",
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 17,
    textTransform: "capitalize",
  },

  selectedText: {
    color: brandColors.white,
  },
});