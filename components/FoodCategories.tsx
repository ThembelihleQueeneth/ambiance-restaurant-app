import { View, Image, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useState } from "react";

type Category = {
  id: string | number;
  title: string;
  image: any;
};

type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    marginHorizontal: 8,
    alignItems: "center",
  },
  activeCategoryItem: {
    opacity: 1,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  labelContainer: {
    marginTop: 8,
  },
  activeLabelContainer: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    color: "#666",
  },
  activeCategoryText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
});

export default function FoodCategories({ selectedCategory, setSelectedCategory }: Props) {
  const categories: Category[] = [
    // Add your categories here
    // Example: { id: 1, title: "Pizza", image: require("...") }
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePress = (index: number) => {
    setActiveIndex(index);
    setSelectedCategory(categories[index].title); // notify Menu.tsx
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {categories.map((cat: Category, index: number) => {
        const isActive = index === activeIndex;
        return (
          <Pressable key={cat.id} onPress={() => handlePress(index)} style={[styles.categoryItem, isActive && styles.activeCategoryItem]}>
            <Image style={styles.categoryImage} source={cat.image} />
            <View style={[styles.labelContainer, isActive && styles.activeLabelContainer]}>
              <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>{cat.title}</Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
