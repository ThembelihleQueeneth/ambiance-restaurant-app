import api from "@/services/api";
import { useAuthStore } from "@/src/store/AuthStore";
import { useCartStore } from "@/src/store/CartStore";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
};

type Props = {
  selectedCategory: string;
};

export default function MenuItems({ selectedCategory }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const user = useAuthStore((state) => state.user);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchItems();
  }, [selectedCategory]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.get("/items");
      const filtered = response.data.filter(
        (item: Item) => item.category === selectedCategory
      );
      setItems(filtered);
    } catch (error) {
      console.log("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToBasket = (item: Item) => {
    if (!user) {
      Alert.alert("Login required", "Please log in to add items");
      return;
    }

    addToCart({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      image_url: item.image_url.toString(),
      quantity: 1,
    });

    Alert.alert("Added to Basket", `${item.name} added successfully`);
  };

  if (loading) return <Text style={{ padding: 20 }}>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.MenuTitle}>{selectedCategory}</Text>

      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>

            <View style={styles.priceRow}>
              <View style={styles.pricePill}>
                <Text style={styles.priceText}>R{item.price}</Text>
              </View>

              <Pressable
                style={styles.addButton}
                onPress={() => handleAddToBasket(item)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </Pressable>
            </View>
          </View>

          <Image
            style={styles.itemImage}
            source={{ uri: item.image_url }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: { paddingHorizontal: 16, paddingBottom: 20 },
  MenuTitle: { fontSize: 25, marginLeft: 12, fontStyle: "italic", fontWeight: "100" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  textContainer: { flex: 1, paddingRight: 12 },
  itemTitle: { fontSize: 17, fontWeight: "700", color: "#1A1A1A", marginBottom: 4 },
  itemDescription: { fontSize: 13, color: "#777", marginBottom: 10, lineHeight: 18 },
  priceRow: { flexDirection: "row", alignItems: "center" },
  pricePill: { backgroundColor: "#1A1A1A", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  priceText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  addButton: {
    backgroundColor: "#FB8500",
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    shadowColor: "#FB8500",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  addButtonText: { color: "#fff", fontSize: 20, fontWeight: "800", marginTop: -1 },
  itemImage: { width: 92, height: 92, borderRadius: 14 },
});
