import { Image } from "expo-image";
import {
  Text,
  View,
} from "react-native";

import { styles } from "./profile-account-card.styles";

type ProfileAccountCardProps = {
  name: string;
  email: string;
  imageUrl?: string | null;
};

export function ProfileAccountCard({
  name,
  email,
  imageUrl,
}: ProfileAccountCardProps) {
  const initial =
    name.trim().charAt(0).toUpperCase() || "?";

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image
          accessibilityLabel={name}
          source={{ uri: imageUrl }}
          contentFit="cover"
          style={styles.avatar}
        />
      ) : (
        <View style={styles.avatarFallback}>
          <Text style={styles.avatarInitial}>
            {initial}
          </Text>
        </View>
      )}

      <View style={styles.information}>
        <Text
          numberOfLines={1}
          style={styles.name}
        >
          {name}
        </Text>

        <Text
          numberOfLines={1}
          style={styles.email}
        >
          {email}
        </Text>
      </View>
    </View>
  );
}