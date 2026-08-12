import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { radius } from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    width: 128,
    height: 46,
    padding: 4,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    overflow: "hidden",
    borderRadius: radius.pill,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(16,26,48,0.72)",
  },

  option: {
    width: 59,
    height: 38,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: radius.pill,
  },

  selectedOption: {
    backgroundColor: brandColors.white,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,

    elevation: 3,
  },

  label: {
    color: "rgba(255,255,255,0.72)",
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 18,
  },

  selectedLabel: {
    color: brandColors.navy,
  },
});