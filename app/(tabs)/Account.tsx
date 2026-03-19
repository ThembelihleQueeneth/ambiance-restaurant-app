import Header from "@/components/Header";
import LogoutModal from "@/components/LogoutModal";
import { FIREBASE_AUTH } from "@/services/firebase/FirebaseConfig";
import { useAuthStore } from "@/src/store/AuthStore";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Account() {
  const router = useRouter();
  const { user, setUser, logout } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    router.replace("/(tabs)");
  };

  const signIn = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email.trim(),
        password
      );

      console.log("Logged in user:", response.user);

      // ← store user in Zustand
      setUser(response.user);

      // Navigate after successful login
      router.replace("/(tabs)");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      Alert.alert("Login failed", errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <LogoutModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {user ? (
          <View style={styles.profileContainer}>
            <Text style={styles.loginTitle}>My Account</Text>
            <View style={styles.profileCard}>
              <Text style={styles.profileEmail}>{user.email}</Text>
              <Text style={styles.profileStatus}>Status: Authenticated</Text>
            </View>

            <Pressable style={styles.logoutBtn} onPress={() => setShowLogoutModal(true)}>
              <Text style={styles.loginBtnText}>Log Out</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <Text style={styles.loginTitle}>Log In</Text>

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
                <Pressable style={styles.loginBtn} onPress={signIn}>
                  <Text style={styles.loginBtnText}>Log In</Text>
                </Pressable>
              )}

              <View style={styles.signUpContainer}>
                <Text style={styles.noAccountText}>Do not have an account?</Text>
                <Pressable onPress={() => router.push('/Screens/Register')}>
                  <Text style={styles.signUpText}> Sign Up</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
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
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  noAccountText: {
    color: "#555",
    fontSize: 14,
  },
  signUpText: {
    color: "#FB8500",
    fontSize: 14,
    fontWeight: "bold",
  },
  profileContainer: {
    width: "100%",
  },
  profileCard: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 30,
  },
  profileEmail: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 5,
  },
  profileStatus: {
    fontSize: 14,
    color: "#777",
  },
  logoutBtn: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },
});
