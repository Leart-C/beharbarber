import { Text, View } from "react-native";

import { styles } from "./barber-brand.styles";

export function BarberBrand() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>
        Qethja jote te
      </Text>

      <Text style={styles.title}>
        BEHAR
      </Text>

      <View style={styles.marks}>
        <View style={[styles.mark, styles.blueMark]} />
        <View style={[styles.mark, styles.redMark]} />
      </View>

      <Text style={styles.description}>
        Rezervo termin për 30 sekonda — pa telefonata, pa pritje.
      </Text>
    </View>
  );
}