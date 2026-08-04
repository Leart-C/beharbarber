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

  grid: {
    marginTop: spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },

  timePressable: {
    width: "31%",
    flexGrow: 1,
  },

  timeButton: {
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },

  selectedTimeButton: {
    backgroundColor: brandColors.blue,
    borderColor: brandColors.blue,
  },

  unavailableTimeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.06)",
  },

  pressedTimeButton: {
    opacity: 0.72,
    transform: [{ scale: 0.96 }],
  },

  timeText: {
    color: brandColors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 20,
  },

  selectedTimeText: {
    color: brandColors.white,
  },

  unavailableTimeText: {
    color: "rgba(255, 255, 255, 0.25)",
    textDecorationLine: "line-through",
  },
});