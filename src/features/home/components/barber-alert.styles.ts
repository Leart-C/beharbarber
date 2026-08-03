import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { radius, spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    minHeight: 76,
    paddingVertical: spacing.md,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,

    flexDirection: "row",
    alignItems: "center",

    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "rgba(239,98,104,0.16)",
    backgroundColor: "#FDEBEC",

    shadowColor: "#101A30",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,

    elevation: 4,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: brandColors.red,
  },

  icon: {
    color: brandColors.white,
    fontFamily: fontFamily.extraBold,
    fontSize: 21,
    lineHeight: 24,
  },

  message: {
    flex: 1,
    marginLeft: spacing.md,

    color: "#A43F44",
    fontFamily: fontFamily.bold,
    fontSize: 15,
    lineHeight: 21,
  },

  dismissButton: {
    width: 42,
    height: 42,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: radius.pill,
  },

  dismissButtonPressed: {
    backgroundColor: "rgba(164,63,68,0.1)",
  },

  dismissIcon: {
    color: "#A43F44",
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 27,
  },
});