import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { radius, spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  heading: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
  },

  categories: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },

  categoryPressable: {
    flex: 1,
  },

  category: {
    minHeight: 108,
    paddingHorizontal: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,

    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },

  selectedCategory: {
    backgroundColor: "rgba(78, 132, 229, 0.3)",
    borderColor: brandColors.blue,
  },

  pressedCategory: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },

  symbol: {
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: 28,
    lineHeight: 32,
  },

  label: {
    color: "rgba(255, 255, 255, 0.72)",
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
  },

  selectedText: {
    color: brandColors.white,
  },
});