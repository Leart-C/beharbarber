import { StyleSheet } from "react-native";

import { fontFamily } from "@/theme/fonts";
import {
  radius,
  spacing,
} from "@/theme/spacing";

export const styles = StyleSheet.create({
  pressable: {
    width: "100%",
  },

  pressed: {
    opacity: 0.72,
  },

  container: {
    minHeight: 66,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,

    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },

  iconContainer: {
    width: 40,
    height: 40,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: radius.md,
    backgroundColor: "rgba(79, 131, 225, 0.16)",
  },

  content: {
    flex: 1,
    minWidth: 0,
  },

  label: {
    color: "#FFFFFF",
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 20,
  },

  value: {
    marginTop: 2,

    color: "rgba(255, 255, 255, 0.5)",
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
  },
});