import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    flex: 1,

    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
  },

  count: {
    marginLeft: spacing.md,

    color: "rgba(255, 255, 255, 0.62)",
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 18,
  },

  list: {
    gap: spacing.md,
    marginTop: spacing.md,
  },

  emptyMessage: {
    marginTop: spacing.md,
    paddingVertical: spacing.xl,

    color: "rgba(255, 255, 255, 0.62)",
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});