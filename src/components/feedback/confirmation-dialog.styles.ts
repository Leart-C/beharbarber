import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

const destructiveColor = "#F05C62";

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
    padding: spacing.xl,
    alignItems: "center",

    borderRadius: 28,
    backgroundColor: "#17243A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.14)",
  },

  iconCircle: {
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,
    backgroundColor: "rgba(78, 132, 229, 0.18)",
  },

  destructiveIconCircle: {
    backgroundColor: "rgba(240, 92, 98, 0.16)",
  },

  icon: {
    color: brandColors.blue,
    fontFamily: fontFamily.bold,
    fontSize: 30,
    lineHeight: 36,
  },

  destructiveIcon: {
    color: destructiveColor,
  },

  title: {
    marginTop: spacing.lg,

    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center",
  },

  message: {
    marginTop: spacing.sm,

    color: "rgba(255, 255, 255, 0.62)",
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },

  actions: {
    width: "100%",
    marginTop: spacing.xl,
    flexDirection: "row",
    gap: spacing.sm,
  },

  actionPressable: {
    flex: 1,
  },

  cancelButton: {
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },

  confirmButton: {
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,
    backgroundColor: brandColors.blue,
  },

  destructiveButton: {
    backgroundColor: destructiveColor,
  },

  pressedButton: {
    opacity: 0.72,
    transform: [{ scale: 0.97 }],
  },

  cancelLabel: {
    color: brandColors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
  },

  confirmLabel: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
});