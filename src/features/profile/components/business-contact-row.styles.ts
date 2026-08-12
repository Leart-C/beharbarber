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

  pressed: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
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
    color: "rgba(255, 255, 255, 0.48)",
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 15,
  },

  value: {
    marginTop: 2,

    color: "#FFFFFF",
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 20,
  },
});