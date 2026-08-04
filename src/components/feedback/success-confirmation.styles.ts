import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(3, 12, 29, 0.82)",
  },

  card: {
    width: "100%",
    maxWidth: 360,
    paddingHorizontal: spacing.xl,
    paddingVertical: 34,
    alignItems: "center",

    borderRadius: 30,
    backgroundColor: "#17243A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.14)",

    shadowColor: brandColors.blue,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.32,
    shadowRadius: 30,

    elevation: 12,
  },

  glow: {
    width: 108,
    height: 108,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,
    backgroundColor: "rgba(78, 132, 229, 0.13)",
  },

  checkCircle: {
    width: 78,
    height: 78,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,
    backgroundColor: brandColors.blue,

    shadowColor: brandColors.blue,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.45,
    shadowRadius: 18,
  },

  check: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 42,
    lineHeight: 50,
  },

  title: {
    marginTop: spacing.xl,

    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 23,
    lineHeight: 30,
    textAlign: "center",
  },

  message: {
    marginTop: spacing.sm,

    color: "rgba(255, 255, 255, 0.68)",
    fontFamily: fontFamily.medium,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },

  happyMessage: {
    marginTop: spacing.md,

    color: brandColors.blue,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
  },
});