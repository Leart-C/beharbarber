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
    lineHeight: 22,
  },

  card: {
    overflow: "hidden",
    marginTop: spacing.xl,

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: radius.lg,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },

  section: {
    padding: spacing.lg,
  },

  sectionWithDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },

  sectionTitle: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 17,
    lineHeight: 23,
  },

  sectionBody: {
    marginTop: spacing.sm,

    color: "rgba(255, 255, 255, 0.62)",
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 22,
  },

  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.98 }],
  },
});