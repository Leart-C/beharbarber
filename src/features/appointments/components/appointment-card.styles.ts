import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: spacing.lg,

    borderRadius: 26,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },

  date: {
    flex: 1,

    color: "rgba(255, 255, 255, 0.68)",
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
  },

  status: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,

    borderRadius: 999,
    backgroundColor: "rgba(78, 132, 229, 0.2)",
  },

  statusText: {
    color: brandColors.blue,
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    lineHeight: 15,
  },

  appointment: {
    marginTop: spacing.lg,

    flexDirection: "row",
    alignItems: "center",
  },

  time: {
    minWidth: 106,

    color: brandColors.white,
    fontFamily: fontFamily.extraBold,
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: -1,
  },

  serviceInformation: {
    flex: 1,
    marginLeft: spacing.md,
  },

  serviceName: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
  },

  duration: {
    marginTop: 2,

    color: "rgba(255, 255, 255, 0.55)",
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
  },

  divider: {
    height: 1,
    marginVertical: spacing.lg,

    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  priceLabel: {
    color: "rgba(255, 255, 255, 0.5)",
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
  },

  price: {
    marginTop: 2,

    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 26,
  },

  cancelPressable: {
    minWidth: 110,
  },

  cancelButton: {
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,
    backgroundColor: "rgba(240, 92, 98, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(240, 92, 98, 0.3)",
  },

  cancelButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },

  cancelButtonText: {
    color: "#F05C62",
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
  },
});