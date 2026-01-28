import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  Pressable,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";

import Header from "../../components/Header";
import { FIREBASE_AUTH } from "@/services/firebase/FirebaseConfig";

/* ✅ FIXED TYPES */
type MenuItem = {
  id: number;
  name: string;
  price: number;
  description?: string;
  image_url: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* 🔐 Firebase Auth Listener */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  /* 📡 Fetch Menu Items */
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://192.168.1.112:5000/items");

      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }

      const data: MenuItem[] = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "Unable to load menu items");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToBasket = (itemName: string) => {
    Alert.alert("Added to basket", `${itemName} has been added`);
  };

  /* ⏳ Loading State */
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FB8500" />
      </View>
    );
  }

  return (
    <View style={styles.titleContainer}>
      <Header />

      {/* 🖼 Hero Section */}
      <ImageBackground
        source={require("@/assets/images/ambiance-bg.jpg")}
        style={styles.imageBackground}
      >
        <View style={styles.overlay} />
        <Text style={styles.messageText1}>Welcome to Ambiance</Text>
        <Text style={styles.messageText2}>Modern | Fresh | Elegant</Text>

        <Pressable
          style={styles.exploreButton}
          onPress={() => router.push("/(tabs)/Menu")}
        >
          <Text style={styles.exploreButtonText}>Explore Menu</Text>
        </Pressable>
      </ImageBackground>

      {/* 🔐 Login Prompt */}
      {!user && (
        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>
            Log in to enjoy faster ordering and special offers
          </Text>
          <Pressable
            style={styles.loginPromptBtn}
            onPress={() => router.push("/(tabs)/Account")}
          >
            <Text style={styles.loginPromptTextBtn}>Log In</Text>
          </Pressable>
        </View>
      )}

      {/* 🍽 Popular Dishes */}
      <Text style={styles.popularDishesText}>
        <Text style={{ color: "#FB5800" }}>★</Text> Popular Dishes
      </Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <View style={styles.popularDishCont}>
            <Image
              source={{ uri: item.image_url }}
              style={styles.popularDishImage}
            />

            <Text style={styles.itemName}>{item.name}</Text>

            <View style={styles.priceRow}>
              <Text style={styles.itemPrice}>R{item.price}</Text>
              <Pressable
                style={styles.addBtn}
                onPress={() => handleAddToBasket(item.name)}
              >
                <Text style={styles.addBtnText}>Add +</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 60,
    backgroundColor: "#fff",
    flex: 1,
  },
  imageBackground: {
    height: 250,
    marginTop: -5,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  messageText1: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 30,
  },
  messageText2: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 90,
    marginBottom: 10,
  },
  exploreButton: {
    backgroundColor: "#FB8500",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginLeft: 100,
    marginTop: 10,
  },
  exploreButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginPrompt: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: 300,
    height: 120,
    alignSelf: "center",
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: -40,
    elevation: 5,
  },
  loginPromptText: {
    color: "#000",
    fontSize: 17,
    lineHeight: 25,
    flex: 1,
  },
  loginPromptBtn: {
    backgroundColor: "#FB8500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginPromptTextBtn: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  popularDishesText: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 10,
    color: "orange",
  },
  popularDishCont: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: 170,
    marginRight: 10,
    elevation: 5,
  },
  popularDishImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  itemName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addBtn: {
    backgroundColor: "#FB8500",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
