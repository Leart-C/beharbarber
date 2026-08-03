import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },

  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: 120,
    paddingBottom: spacing.lg,
  },

  actions: {
    marginTop: spacing["2xl"],
  },

  errorMessage: {
    marginTop: spacing.md,
    color: "#FFB4B8",
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },

  attribution: {
    marginTop: spacing.xl,
    color: "rgba(255,255,255,0.58)",
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },

  attributionBrand: {
    color: brandColors.white,
  },
});