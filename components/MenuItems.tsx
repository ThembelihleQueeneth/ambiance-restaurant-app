import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import Starters from "./Starters";
import Salads from "./Salads";
import MainCourse from "./MainCourse";
import Desserts from "./Desserts";
import Drinks from "./Drinks";
export default function MenuItems() {
  return (
    <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
     <Starters></Starters>
     <Salads></Salads>
     <MainCourse></MainCourse>
     <Desserts></Desserts>
     <Drinks></Drinks>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    alignItems: "center",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // Android shadow
    elevation: 5,
  },

  textContainer: {
    flex: 1,
    paddingRight: 12,
  },

  itemTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },

  itemDescription: {
    fontSize: 13,
    color: "#777",
    marginBottom: 10,
    lineHeight: 18,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  pricePill: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  priceText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

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

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginTop: -1,
  },

  itemImage: {
    width: 92,
    height: 92,
    borderRadius: 14,
  },
});

