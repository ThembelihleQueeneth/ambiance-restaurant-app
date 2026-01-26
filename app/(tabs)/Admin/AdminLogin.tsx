import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import { FIREBASE_AUTH } from "@/services/firebase/FirebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import Header from "@/components/Header";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Only these emails are allowed as admins
  const adminEmails = ["admin@ambiance.com"];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      const userEmail = userCredential.user.email;

      if (!userEmail || !adminEmails.includes(userEmail)) {
        await signOut(FIREBASE_AUTH);
        Alert.alert("Access Denied", "You are not an admin");
        setLoading(false);
        return;
      }

      router.replace("/(tabs)/Admin/Dashboard");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.loginTitle}>Admin Login</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Enter email here"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Enter your password here"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#FB8500" />
          ) : (
            <Pressable style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginBtnText}>Log In</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1E1E1E",
  },
  formContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  inputText: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#1E1E1E",
  },
  loginBtn: {
    backgroundColor: "#FB8500",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
