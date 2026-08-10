import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { radius, spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(239, 98, 104, 0.46)",
    borderRadius: radius.lg,
    backgroundColor: "rgba(239, 98, 104, 0.14)",
    shadowColor: brandColors.red,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },

  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
    backgroundColor: brandColors.red,
  },

  icon: {
    color: brandColors.white,
    fontFamily: fontFamily.extraBold,
    fontSize: 20,
    lineHeight: 23,
  },

  message: {
    flex: 1,
    marginLeft: spacing.md,
    color: "#FFD5D7",
    fontFamily: fontFamily.bold,
    fontSize: 15,
    lineHeight: 21,
  },

  dismissButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
  },

  dismissButtonPressed: {
    backgroundColor: "rgba(239, 98, 104, 0.18)",
  },

  dismissIcon: {
    color: "#FFB9BC",
    fontFamily: fontFamily.bold,
    fontSize: 23,
    lineHeight: 26,
  },
});