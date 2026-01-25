import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";

import Header from "../../components/Header";
import { FIREBASE_AUTH } from "@/services/firebase/FirebaseConfig";

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // 🔐 Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  // 🧺 Allow everyone to add items to basket
  const handleAddToBasket = (itemName: string) => {
    // Later this will go to Basket Context / AsyncStorage
    Alert.alert("Added to basket", `${itemName} has been added`);
  };

  return (
    <View style={styles.titleContainer}>
      <Header />

      {/* Hero Section */}
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

      {/* Login prompt (hide if logged in) */}
      {!user && (
        <View style={styles.loginPrompt}>
          <View style={{ flex: 1 }}>
            <Text style={styles.loginPromptText}>
              Log in to enjoy faster ordering and special offers
            </Text>
          </View>

          <Pressable
            style={styles.loginPromptBtn}
            onPress={() => router.push("/(tabs)/Account")}
          >
            <Text style={styles.loginPromptTextBtn}>Log In</Text>
          </Pressable>
        </View>
      )}

      {/* Popular Dishes */}
      <Text style={styles.popularDishesText}>
        <Text style={{ color: "#FB5800" }}>★</Text> Popular Dishes
      </Text>

      <View style={styles.popularDishesContainer}>
        {/* Dish 1 */}
        <View style={styles.popularDishCont}>
          <Image
            source={require("@/assets/images/chicken-liver.jpg")}
            style={styles.popularDishImage}
          />
          <Text style={styles.itemName}>Chicken Livers</Text>

          <View style={styles.priceRow}>
            <Text style={styles.itemPrice}>R59.99</Text>
            <Pressable
              style={styles.addBtn}
              onPress={() => handleAddToBasket("Chicken Livers")}
            >
              <Text style={styles.addBtnText}>Add +</Text>
            </Pressable>
          </View>
        </View>

        {/* Dish 2 */}
        <View style={styles.popularDishCont}>
          <Image
            source={require("@/assets/images/pasta.jpg")}
            style={styles.popularDishImage}
          />
          <Text style={styles.itemName}>Pasta</Text>

          <View style={styles.priceRow}>
            <Text style={styles.itemPrice}>R59.99</Text>
            <Pressable
              style={styles.addBtn}
              onPress={() => handleAddToBasket("Pasta")}
            >
              <Text style={styles.addBtnText}>Add +</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  loginPromptText: {
    color: "#000",
    fontSize: 17,
    lineHeight: 25,
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

  popularDishesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  popularDishCont: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 170,
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
    fontStyle: "italic",
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
});
