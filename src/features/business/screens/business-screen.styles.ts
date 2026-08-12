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
    paddingTop: spacing.md,
    paddingBottom: spacing["3xl"],
  },

  backPressable: {
    alignSelf: "flex-start",
  },

  backButton: {
    minHeight: 44,
    paddingHorizontal: spacing.md,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,

    borderRadius: radius.pill,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },

  backButtonText: {
    color: brandColors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
  },

  header: {
    marginTop: spacing.xl,
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
    minHeight: 150,
    marginTop: spacing.xl,
    padding: spacing.lg,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 26,
    backgroundColor: "rgba(255, 255, 255, 0.065)",
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

  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.98 }],
  },
});