import { useClerk } from "@clerk/expo";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const {signOut} = useClerk();
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>

      <Button
        title="Sign out"
        onPress={()=>signOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});