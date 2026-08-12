import { StyleSheet } from "react-native";

import { fontFamily } from "@/theme/fonts";
import {
  radius,
  spacing,
} from "@/theme/spacing";

export const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: spacing.sm,

    color: "rgba(255, 255, 255, 0.5)",
    fontFamily: fontFamily.bold,
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0.9,
    textTransform: "uppercase",
  },

  container: {
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: radius.lg,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
});