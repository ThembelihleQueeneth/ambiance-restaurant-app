import Header from "@/components/Header";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { FIREBASE_AUTH } from "@/services/firebase/FirebaseConfig";
import { useCart } from "@/context/CartContext"

type CartItem = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsContainer: {
    padding: 16,
    gap: 12,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityBtn: {
    backgroundColor: '#ff6b6b',
    width: 32,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
});

export default function Basket() {
  const user = FIREBASE_AUTH.currentUser;
  const { setCount } = useCart();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    if (!user) return;

    const res = await fetch(
      `http://192.168.1.112:5000/cart/${user.uid}`
    );
    const data: CartItem[] = await res.json();

    setItems(data);

    const totalQty = data.reduce((sum, i) => sum + i.quantity, 0);
    setCount(totalQty);
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) return;

    await fetch(`http://192.168.1.112:5000/cart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    fetchCart();
  };

  const removeItem = async (id: number) => {
    await fetch(`http://192.168.1.112:5000/cart/${id}`, {
      method: "DELETE",
    });

    fetchCart();
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.itemsContainer}>
        {items.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>

              <View style={styles.quantityContainer}>
                <Pressable
                  style={styles.quantityBtn}
                  onPress={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                >
                  <Text style={styles.quantityText}>-</Text>
                </Pressable>

                <Text style={styles.quantityNumber}>{item.quantity}</Text>

                <Pressable
                  style={styles.quantityBtn}
                  onPress={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
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

      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>R{total}</Text>
      </View>
    </View>
  );
}
<Pressable
  style={{
    backgroundColor: '#ff6b6b',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  }}
  onPress={() => {
    // Handle checkout
  }}
>
  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
    Proceed to Checkout
  </Text>
</Pressable>