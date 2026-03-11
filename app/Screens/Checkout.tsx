import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import Header from "@/components/Header";
import Toast from "react-native-toast-message";
import { useCartStore } from "@/src/store/CartStore";
import { useRouter } from "expo-router";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (!address || !accountNumber || !expDate || !cvv) {
      Toast.show({
        type: "error",
        text1: "Missing Information",
        text2: "Please fill in all required fields.",
        position: "top",
        topOffset: 60,
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      clearCart();
      Toast.show({
        type: "success",
        text1: "Payment Successful",
        text2: "Your order has been placed 🎉",
        position: "top",
        topOffset: 60,
      });
      setTimeout(() => router.push("/"), 2000);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Secure Checkout</Text>

        <View style={styles.orderSummary}>
          <Text style={styles.summaryLabel}>Total Amount</Text>
          <Text style={styles.summaryTotal}>R{cartTotal.toFixed(2)}</Text>
        </View>

        {/* Delivery Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your delivery address"
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.label}>Delivery Instructions (optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="e.g. Call on arrival"
            value={instructions}
            onChangeText={setInstructions}
            multiline
          />
        </View>

        {/* Payment Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Details</Text>

          <Text style={styles.label}>Account / Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                value={expDate}
                onChangeText={setExpDate}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="***"
                keyboardType="numeric"
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          </View>
        </View>

        {/* Pay Button */}
        {loading ? (
          <ActivityIndicator size="large" color="#FB8500" />
        ) : (
          <Pressable style={styles.payBtn} onPress={handlePayment}>
            <Text style={styles.payBtnText}>Pay Now</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
    color: "#222",
  },
  orderSummary: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  summaryLabel: {
    color: "#aaa",
    fontSize: 16,
    fontWeight: "600",
  },
  summaryTotal: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  row: {
    flexDirection: "row",
  },
  payBtn: {
    backgroundColor: "#FB8500",
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#FB8500",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  payBtnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
