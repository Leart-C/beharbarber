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
    paddingTop: spacing.xl,
    paddingBottom: 120,
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
    lineHeight: 21,
  },

  sections: {
    marginTop: spacing.xl,
    gap: spacing.xl,
  },

  sectionTitle: {
    marginBottom: spacing.sm,

    color: "rgba(255, 255, 255, 0.5)",
    fontFamily: fontFamily.bold,
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0.9,
    textTransform: "uppercase",
  },

  menuCard: {
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: radius.lg,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },

  signOutPressable: {
    width: "100%",
  },

  signOutButton: {
    width: "100%",
    minHeight: 56,
    paddingHorizontal: spacing.xl,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "rgba(239, 98, 104, 0.42)",
    borderRadius: radius.lg,
    backgroundColor: "rgba(239, 98, 104, 0.18)",
  },

  signOutButtonText: {
    color: brandColors.red,
    fontFamily: fontFamily.bold,
    fontSize: 15,
    lineHeight: 21,
  },

  buttonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.985 }],
  },
});