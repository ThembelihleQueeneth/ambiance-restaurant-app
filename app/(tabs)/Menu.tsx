import { View, StyleSheet } from "react-native";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import FoodCategories from "@/components/FoodCategories";
import MenuItems from "@/components/MenuItems";
import { useState } from "react";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("Starters");

  return (
    <View style={styles.container}>
      <Header />
      <SearchInput />
      <FoodCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <MenuItems selectedCategory={selectedCategory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },
});
