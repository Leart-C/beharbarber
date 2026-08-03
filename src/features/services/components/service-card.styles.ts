import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 92,
    padding: spacing.md,

    flexDirection: "row",
    alignItems: "center",

    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },

  iconContainer: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 18,
    backgroundColor: "rgba(78, 132, 229, 0.18)",
  },

  icon: {
    color: brandColors.blue,
    fontSize: 25,
    lineHeight: 30,
  },

  information: {
    flex: 1,
    marginLeft: spacing.md,
  },

  name: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 17,
    lineHeight: 22,
  },

  details: {
    marginTop: 2,

    color: "rgba(255, 255, 255, 0.62)",
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
  },

  price: {
    marginHorizontal: spacing.md,

    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
  },

  addButton: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,
    backgroundColor: "rgba(78, 132, 229, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(78, 132, 229, 0.35)",
  },

  addButtonText: {
    color: brandColors.blue,
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 29,
  },

  cardPressable: {
    width: "100%",
  },

  cardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
});