import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { radius, spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: spacing.xl,

    borderRadius: 28,
    backgroundColor: brandColors.blue,

    shadowColor: brandColors.blue,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.24,
    shadowRadius: 22,

    elevation: 8,
  },

  eyebrow: {
    color: "rgba(255,255,255,0.72)",
    fontFamily: fontFamily.bold,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },

  appointmentDetails: {
    marginTop: spacing.lg,

    flexDirection: "row",
    alignItems: "center",
  },

  time: {
    minWidth: 132,

    color: brandColors.white,
    fontFamily: fontFamily.extraBold,
    fontSize: 50,
    lineHeight: 56,
    letterSpacing: -2,
  },

  information: {
    flex: 1,
    marginLeft: spacing.lg,
  },

  date: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 21,
  },

  service: {
    marginTop: 3,

    color: "rgba(255,255,255,0.82)",
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
  },

  actions: {
    flexDirection: "row",
    gap: spacing.sm,
    width: "100%",
    marginTop: spacing.lg,
  },

  actionButton: {
    width: "100%",
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
    backgroundColor: "rgba(255, 255, 255, 0.22)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },

  actionButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  actionText: {
    color: brandColors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },

  actionPressable: {
    flex: 1,
  },
});