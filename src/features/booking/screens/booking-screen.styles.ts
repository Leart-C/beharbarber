import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
  },

  backLink: {
    alignSelf: "flex-start",
    paddingVertical: spacing.sm,
    paddingRight: spacing.md,
  },

  backLinkText: {
    color: brandColors.blue,
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },

  eyebrow: {
    marginTop: spacing.xl,

    color: "rgba(255, 255, 255, 0.62)",
    fontFamily: fontFamily.bold,
    fontSize: 13,
    letterSpacing: 2,
  },

  title: {
    marginTop: spacing.sm,

    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 32,
    lineHeight: 40,
  },

  details: {
    marginTop: spacing.sm,

    color: "rgba(255, 255, 255, 0.68)",
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 22,
  },

  backButton: {
    alignSelf: "flex-start",
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,

    borderRadius: 999,
    backgroundColor: brandColors.blue,
  },

  backButtonText: {
    color: brandColors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },

  selectedService: {
    marginTop: spacing.xl,
  },
  
  dateSelector: {
    marginTop: spacing.xl,
  },
});