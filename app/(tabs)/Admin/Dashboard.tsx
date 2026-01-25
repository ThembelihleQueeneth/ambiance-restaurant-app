import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Pressable style={styles.button} onPress={() => router.push("/(tabs)/Admin/MenuManagement")}>
        <Text style={styles.buttonText}>Manage Menu</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.push("/(tabs)/Admin/Orders")}>
        <Text style={styles.buttonText}>View Orders</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30 },
  button: {
    backgroundColor: "#FB8500",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
