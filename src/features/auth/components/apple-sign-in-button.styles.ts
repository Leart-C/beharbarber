import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { radius, spacing } from "@/theme/spacing";

// Mirrors google-sign-in-button.styles.ts so both buttons match.
export const styles = StyleSheet.create({
  button: {
    width: "100%",
    minHeight: 64,
    overflow: "hidden",

    borderRadius: radius.lg,
    backgroundColor: "#000000",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 14,

    elevation: 6,
  },

  content: {
    minHeight: 64,
    paddingHorizontal: spacing.xl,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },

  pressed: {
    backgroundColor: "#1C1C1E",
    transform: [{ scale: 0.985 }],
  },

  disabled: {
    opacity: 0.65,
  },

  appleIconContainer: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: brandColors.white,
  },

  appleIcon: {
    width: 18,
    height: 18,
    marginTop: -2,
  },

  label: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
  },
});
