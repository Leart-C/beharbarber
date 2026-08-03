import { StyleSheet } from "react-native";

import { brandColors } from "@/theme/colors";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";

export const homeHeaderGradient = [
  "rgba(8,17,34,0.28)",
  "rgba(8,17,34,0.62)",
  brandColors.navy,
] as const;

export const styles = StyleSheet.create({
  container: {
    height: 270,
    overflow: "hidden",
    backgroundColor: brandColors.navy,
  },

  accessoryContainer: {
    flexShrink: 0,
    marginTop: 2,
  },

  backgroundImage: {
    ...StyleSheet.absoluteFill,
  },

  gradient: {
    ...StyleSheet.absoluteFill,
  },

  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",

    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,

    width: "100%",
    gap: spacing.lg,
  },

  greetingContainer: {
    flexShrink: 1,
  },

  greeting: {
    color: "rgba(255,255,255,0.78)",
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    lineHeight: 22,
  },

  name: {
    marginTop: 2,
    color: brandColors.white,
    fontFamily: fontFamily.extraBold,
    fontSize: 38,
    lineHeight: 42,
    letterSpacing: -1.4,
  },
});