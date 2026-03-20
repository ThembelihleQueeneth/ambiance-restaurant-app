import { useAuthStore } from "@/src/store/AuthStore";
import { useCartStore } from "@/src/store/CartStore";
import { useEffect, useState } from "react";
import api from "@/services/api";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

type Item = {
  id: string;
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
      const filtered = response.data.filter((item: Item) => {
        // Case-insensitive, whitespace-trimmed match so "Main Course" == "main course" etc.
        const itemCat = (item.category ?? "").trim().toLowerCase();
        const selected = selectedCategory.trim().toLowerCase();
        return itemCat === selected;
      });
      setItems(filtered);
    } catch (error: any) {
      console.error("Failed to fetch items:", error);
      Alert.alert("Error", error?.message || "Failed to load menu items.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToBasket = async (item: Item) => {
    if (!user) {
      Alert.alert("Login required", "Please log in to add items");
      return;
    }

    try {
      await api.post("/cart", {
        user_id: user.uid,
        item_id: item.id,
        quantity: 1,
      });

      addToCart({
        id: item.id.toString(),
        name: item.name,
        price: item.price,
        image_url: item.image_url.toString(),
        quantity: 1,
      });

      Alert.alert("Added to Basket", `${item.name} added successfully`);
    } catch (error: any) {
      console.error("Add to cart error:", error);
      Alert.alert("Error", "Could not add item to basket.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FB8500" style={{ marginTop: 50 }} />;
  }

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.card}>
      <Image style={styles.itemImage} source={{ uri: item.image_url }} />
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceText}>R{item.price}</Text>

          <Pressable
            style={styles.addButton}
            onPress={() => handleAddToBasket(item)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.columnWrapper}
      ListHeaderComponent={
        <Text style={styles.MenuTitle}>{selectedCategory}</Text>
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>No items found for "{selectedCategory}"</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: { paddingHorizontal: 16, paddingBottom: 100, paddingTop: 10 },
  columnWrapper: { justifyContent: "space-between" },
  MenuTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#222",
    marginBottom: 20,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  card: {
    width: (width - 48) / 2, // 2 columns minus total padding
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#f0f0f0",
  },
  textContainer: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: "#777",
    marginBottom: 12,
    lineHeight: 16,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  priceText: {
    color: "#FB8500",
    fontWeight: "800",
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#1A1A1A",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -2,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 40,
  },
});
