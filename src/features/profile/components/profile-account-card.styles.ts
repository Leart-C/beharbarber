import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import {
  radius,
  spacing,
} from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    minHeight: 96,
    padding: spacing.lg,

    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: radius.lg,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },

  avatar: {
    width: 62,
    height: 62,

    borderRadius: 31,
  },

  avatarFallback: {
    width: 62,
    height: 62,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 31,
    backgroundColor: brandColors.blue,
  },

  avatarInitial: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 25,
    lineHeight: 30,
  },

  information: {
    flex: 1,
    minWidth: 0,
  },

  name: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
  },

  email: {
    marginTop: spacing.xs,

    color: "rgba(255, 255, 255, 0.52)",
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
  },
});