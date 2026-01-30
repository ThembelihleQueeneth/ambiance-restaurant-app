import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Header from "@/components/Header";
import { FIREBASE_AUTH } from "@/services/firebase/FirebaseConfig";

export default function Register() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Missing fields", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Weak password",
        "Password must be at least 6 characters"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email.trim(),
        password
      );

      console.log("User registered:", response.user.uid);

      Alert.alert("Success", "Account created successfully");

      // Navigate to Login screen
      router.replace("/(tabs)/Account");
    } catch (error) {
      Alert.alert("Registration failed", error instanceof Error ? error.message : "An error occurred");
      console.error(error);
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
        <Text style={styles.loginTitle}>Create Account</Text>
        <Text style={styles.subtitle}>Fill Your Personal Details Below</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Enter first name"
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Enter last name"
            value={lastName}
            onChangeText={setLastName}
          />

          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Enter contact number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#FB8500" />
          ) : (
            <Pressable style={styles.loginBtn} onPress={handleRegister}>
              <Text style={styles.loginBtnText}>Register</Text>
            </Pressable>
          )}

          <View style={styles.signUpContainer}>
            <Text style={styles.noAccountText}>Already have an account?</Text>
            <Pressable onPress={() => router.push("/(tabs)/Account")}>
              <Text style={styles.signUpText}> Log In</Text>
            </Pressable>
          </View>
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
    marginBottom: 8,
    color: "#1E1E1E",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 30,
    color: "#666",
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
});
