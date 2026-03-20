import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import api from "@/services/api";
import { FIREBASE_AUTH } from "@/services/firebase/FirebaseConfig";
import { useAuthStore } from "@/src/store/AuthStore";
import { useCartStore } from "@/src/store/CartStore";
import Header from "../../components/Header";

/* TYPES */
type MenuItem = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image_url: string;
};

export default function HomeScreen() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const addToCart = useCartStore((state) => state.addToCart);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await api.get("/items");
      setMenuItems(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to load menu items");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMenuItems();
    setRefreshing(false);
  };

  const handleAddToBasket = async (item: MenuItem) => {
    if (!user) {
      Alert.alert("Login required", "Please log in to add items");
      return;
    }

    try {
      await api.post("/cart", {
        user_id: user.uid,
        item_id: item.id,  // ✅ send as-is, it's already a uuid string
        quantity: 1,
      });

      addToCart({
        id: item.id.toString(),
        name: item.name,
        price: item.price,
        image_url: item.image_url,
        quantity: 1,
      });

      Alert.alert("Success", `${item.name} added to basket`);
    } catch (error: any) {
      console.error("Cart Error Details:", error.response?.data || error.message);
      Alert.alert("Error", "Could not add item to basket.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FB8500" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Hero */}
      <ImageBackground
        source={require("@/assets/images/ambiance-bg.jpg")}
        style={styles.hero}
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
      >
        <Header />
        <View style={styles.overlay} />

        <View style={styles.heroContent}>
          <Text style={styles.title}>Welcome to Ambiance</Text>
          <Text style={styles.subtitle}>Modern • Fresh • Elegant</Text>

          <Pressable
            style={({ pressed }) => [styles.exploreBtn, pressed && { opacity: 0.8 }]}
            onPress={() => router.push("/(tabs)/Menu")}
          >
            <Text style={styles.exploreText}>Explore Menu</Text>
          </Pressable>
        </View>
      </ImageBackground>

      {/* Login Prompt */}
      {!user && (
        <View style={styles.loginCard}>
          <Text style={styles.loginText}>
            Log in to enjoy faster ordering and exclusive offers
          </Text>
          <Pressable
            style={({ pressed }) => [styles.loginBtn, pressed && { opacity: 0.8 }]}
            onPress={() => router.push("/(tabs)/Account")}
          >
            <Text style={styles.loginBtnText}>Log In</Text>
          </Pressable>
        </View>
      )}

      {/* Section Title */}
      <Text style={styles.sectionTitle}>★ Popular Dishes</Text>

      {/* Items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.image} />

            <Text style={styles.itemName}>{item.name}</Text>

            <View style={styles.row}>
              <Text style={styles.price}>R{item.price}</Text>
              <Pressable
                style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.7 }]}
                onPress={() => handleAddToBasket(item)}
              >
                <Text style={styles.addText}>Add +</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },

  hero: {
    height: 420,
    justifyContent: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  heroContent: {
    alignItems: "center",
    marginTop: 50,
    paddingHorizontal: 20,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#eee",
    fontSize: 18,
    marginTop: 8,
    marginBottom: 15,
  },

  exploreBtn: {
    backgroundColor: "#FB8500",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
  },

  exploreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  loginCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 6,
  },

  loginText: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  loginBtn: {
    backgroundColor: "#FB8500",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },

  loginBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    color: "#FB8500",
  },

  listContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    width: 180,
    marginRight: 15,
    elevation: 6,
  },

  image: {
    width: "100%",
    height: 110,
    borderRadius: 12,
  },

  itemName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  addBtn: {
    backgroundColor: "#FB8500",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});