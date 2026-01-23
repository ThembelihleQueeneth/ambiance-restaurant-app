import Header from "@/components/Header";
import { StyleSheet, Text, Image, View, Pressable, ScrollView } from "react-native";

export default function Basket() {
  return (
    <View style={styles.container}>
      <Header />

      {/* Order Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
      </View>

      {/* Order Items */}
      <ScrollView contentContainerStyle={styles.itemsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.itemCard}>
          {/* Left: Item Details */}
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>Coslow</Text>

            <View style={styles.quantityContainer}>
              <Pressable style={styles.quantityBtn}>
                <Text style={styles.quantityText}>-</Text>
              </Pressable>

              <Text style={styles.quantityNumber}>2</Text>

              <Pressable style={styles.quantityBtn}>
                <Text style={styles.quantityText}>+</Text>
              </Pressable>
            </View>

            <Text style={styles.itemPrice}>R59.99</Text>
          </View>

          {/* Right: Item Image */}
          <View>
            <Image
              style={styles.itemImage}
              source={require("@/assets/images/coslow.jpg")}
            />
          </View>
        </View>
      </ScrollView>

      {/* Total Amount */}
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>R120</Text>
      </View>

      {/* Checkout Button */}
      <Pressable style={styles.checkBtn}>
        <Text style={styles.checkOutText}>Checkout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  summaryCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120, // Space for checkout button
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemDetails: {
    flex: 1,
    paddingRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  quantityBtn: {
    backgroundColor: "#FB8500",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  quantityText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityNumber: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  itemImage: {
    width: 92,
    height: 92,
    borderRadius: 14,
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 70,
    width: "100%",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FB8500",
  },
  checkBtn: {
    backgroundColor: "#FB8500",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderRadius:20,
    marginBottom:10
  },
  checkOutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
