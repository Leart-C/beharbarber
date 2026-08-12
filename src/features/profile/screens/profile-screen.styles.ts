import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import {
  radius,
  spacing,
} from "@/theme/spacing";

export const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: 120,
  },

  title: {
    color: brandColors.white,
    fontFamily: fontFamily.extraBold,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
  },

  description: {
    marginTop: spacing.sm,

    color: "rgba(255, 255, 255, 0.58)",
    fontFamily: fontFamily.medium,
    fontSize: 15,
    lineHeight: 21,
  },

  stateCard: {
    minHeight: 140,
    marginTop: spacing.xl,
    padding: spacing.lg,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 26,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },

  stateText: {
    marginTop: spacing.md,

    color: "rgba(255, 255, 255, 0.58)",
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },

  errorTitle: {
    color: brandColors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
  },

  retryButton: {
    minHeight: 44,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: radius.pill,
    backgroundColor: brandColors.blue,
  },

  retryButtonText: {
    color: brandColors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
  },

  signOutButton: {
    minHeight: 54,
    paddingHorizontal: spacing.xl,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "rgba(239, 98, 104, 0.34)",
    borderRadius: radius.lg,
    backgroundColor: "rgba(239, 98, 104, 0.12)",
  },

  signOutButtonText: {
    color: brandColors.red,
    fontFamily: fontFamily.bold,
    fontSize: 15,
    lineHeight: 21,
  },

  buttonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.985 }],
  },
  signOutPressable: {
    width: "100%",
    marginTop: spacing.xl,
  },
});