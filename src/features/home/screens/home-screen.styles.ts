import { StyleSheet } from "react-native";

import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  content: {
    marginTop: -28,
    paddingHorizontal: spacing.xl,
    paddingBottom: 120,
    gap: spacing.lg,
  },
  servicePreview: {
    marginTop: spacing.lg,
  },
  servicesList: {
    marginTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
});