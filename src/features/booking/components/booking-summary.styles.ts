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

  card: {
    marginTop: spacing.md,
    padding: spacing.lg,

    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },

  row: {
    minHeight: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.lg,
  },

  rowLabel: {
    color: "rgba(255, 255, 255, 0.52)",
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
  },

  rowValue: {
    flex: 1,

    color: brandColors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "right",
  },

  divider: {
    height: 1,
    marginVertical: spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },

  totalLabel: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 17,
    lineHeight: 23,
  },

  totalValue: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
  },

  confirmButton: {
    marginTop: spacing.lg,
  },
});