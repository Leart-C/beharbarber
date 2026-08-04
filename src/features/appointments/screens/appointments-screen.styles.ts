import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,

    // Keeps the last card above the native tab bar
    paddingBottom: 130,
  },

  title: {
    color: brandColors.white,
    fontFamily: fontFamily.extraBold,
    fontSize: 32,
    lineHeight: 40,
  },

  subtitle: {
    marginTop: spacing.xs,

    color: "rgba(255, 255, 255, 0.58)",
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
  },

  list: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },

  emptyState: {
    flex: 1,
    minHeight: 420,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    width: 76,
    height: 76,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 24,
    backgroundColor: "rgba(78, 132, 229, 0.16)",
  },

  emptyIconText: {
    color: brandColors.blue,
    fontSize: 30,
    lineHeight: 36,
  },

  emptyTitle: {
    marginTop: spacing.lg,

    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 26,
  },

  emptyDescription: {
    maxWidth: 280,
    marginTop: spacing.sm,

    color: "rgba(255, 255, 255, 0.55)",
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
});