import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import {
  radius,
  spacing,
} from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: spacing.xl,
    padding: spacing.lg,

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 26,
    backgroundColor: "rgba(255, 255, 255, 0.065)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },

  businessInitialContainer: {
    width: 48,
    height: 48,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 16,
    backgroundColor: brandColors.blue,
  },

  businessInitial: {
    color: brandColors.white,
    fontFamily: fontFamily.extraBold,
    fontSize: 20,
    lineHeight: 26,
  },

  businessInformation: {
    flex: 1,
    minWidth: 0,
  },

  businessName: {
    color: brandColors.white,
    fontFamily: fontFamily.bold,
    fontSize: 19,
    lineHeight: 25,
  },

  barberName: {
    marginTop: 2,

    color: "rgba(255, 255, 255, 0.5)",
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 17,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: spacing.lg,

    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  sectionTitle: {
    color: "rgba(255, 255, 255, 0.72)",
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 18,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  contactList: {
    marginTop: spacing.md,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: radius.lg,
    backgroundColor: "rgba(255, 255, 255, 0.035)",
  },

  emptyText: {
    marginTop: spacing.md,

    color: "rgba(255, 255, 255, 0.52)",
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
  },
});