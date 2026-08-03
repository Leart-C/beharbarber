import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: spacing.lg,

    borderRadius: 26,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 18,
    backgroundColor: "rgba(78, 132, 229, 0.2)",
  },

  icon: {
    color: brandColors.blue,
    fontSize: 26,
    lineHeight: 32,
  },

  information: {
    flex: 1,
    marginLeft: spacing.md,
  },

  label: {
    color: "rgba(255, 255, 255, 0.55)",
    fontFamily: fontFamily.bold,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1.4,
  },

  name: {
    marginTop: 3,

    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
  },

  divider: {
    height: 1,
    marginVertical: spacing.lg,

    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },

  details: {
    color: "rgba(255, 255, 255, 0.65)",
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
  },

  changePressable: {
    minWidth: 110,
  },

  changeButton: {
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,
    backgroundColor: "rgba(78, 132, 229, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(78, 132, 229, 0.4)",
  },

  changeButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },

  changeButtonText: {
    color: brandColors.blue,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },

  serviceMeta:{
    flex:1,
  },

  metaValue:{
    marginTop: 3,
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 22,
  }
  
});