import { Text, View } from "react-native";
import { useTranslation } from "@/features/localization/hooks/use-translation";

import { styles } from "./barber-brand.styles";

export function BarberBrand() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>
        {t("auth.eyebrow")}
      </Text>

      <Text style={styles.title}>
        BEHAR
      </Text>

      <View style={styles.marks}>
        <View style={[styles.mark, styles.blueMark]} />
        <View style={[styles.mark, styles.redMark]} />
      </View>

      <Text style={styles.description}>
        {t("auth.description")}
      </Text>
    </View>
  );
}
