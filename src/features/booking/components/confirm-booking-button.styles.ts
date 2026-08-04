import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";

export const styles = StyleSheet.create({
  pressable: {
    width: "100%",
  },

  button: {
    width: "100%",
    minHeight: 58,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,
    backgroundColor: brandColors.blue,
  },

  disabledButton: {
    backgroundColor: "rgba(78, 132, 229, 0.28)",
  },

  pressedButton: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },

  label: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 22,
  },
});