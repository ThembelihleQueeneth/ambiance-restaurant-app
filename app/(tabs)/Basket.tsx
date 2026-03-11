import Header from "@/components/Header";
import api from "@/services/api";
import { useAuthStore } from "@/src/store/AuthStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
};

export default function Basket() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await api.get(`/cart/${user.uid}`);
      setItems(res.data);
    } catch (error) {
      console.log("Failed to fetch cart", error);
      Alert.alert("Error", "Could not load cart items");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      await api.put(`/cart/${id}`, { quantity });
      fetchCart();
    } catch (error) {
      console.log("Failed to update quantity", error);
    }
  };

  const removeItem = async (id: number) => {
    try {
      await api.delete(`/cart/${id}`);
      fetchCart();
    } catch (error) {
      console.log("Failed to remove item", error);
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Header />

      {items.length === 0 && !loading ? (
        <View style={styles.emptyContainer}>
          <Icon name="shopping-basket" size={64} color="#ddd" />
          <Text style={styles.emptyText}>Your basket is empty</Text>
          <Pressable
            style={styles.browseBtn}
            onPress={() => router.push("/(tabs)/Menu")}
          >
            <Text style={styles.browseText}>Browse Menu</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.itemsContainer}>
            {items.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>

                  <View style={styles.quantityContainer}>
                    <Pressable
                      style={styles.quantityBtn}
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Text style={styles.quantityText}>-</Text>
                    </Pressable>

                    <Text style={styles.quantityNumber}>{item.quantity}</Text>

                    <Pressable
                      style={styles.quantityBtn}
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Text style={styles.quantityText}>+</Text>
                    </Pressable>

                    <Pressable
                      style={styles.quantityBtn}
                      onPress={() => removeItem(item.id)}
                    >
                      <Icon name="trash" size={16} color="#fff" />
                    </Pressable>
                  </View>

                  <Text style={styles.itemPrice}>
                    R{item.price * item.quantity}
                  </Text>
                </View>

                <Image
                  source={{ uri: item.image_url }}
                  style={styles.itemImage}
                />
              </View>
            ))}
          </ScrollView>

          {/* Total */}
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>R{total}</Text>
          </View>

          {/* Checkout Button */}
          <Pressable
            style={checkoutStyles.checkoutBtn}
            onPress={() => router.push("/Screens/Checkout")}
          >
            <Text style={checkoutStyles.checkoutText}>Proceed to Checkout</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
    marginBottom: 20,
  },
  browseBtn: {
    backgroundColor: "#FB8500",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemsContainer: {
    padding: 16,
    gap: 12,
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    gap: 12,
    elevation: 2,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityBtn: {
    backgroundColor: "#ff6b6b",
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityNumber: {
    fontSize: 14,
    fontWeight: "600",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6b6b",
  },
});

const checkoutStyles = StyleSheet.create({
  checkoutBtn: {
    backgroundColor: "#FB8500",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
