import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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
  containerWrapper: {
    height: 120, // Give it a fixed height so scale transforms don't cause layout jumps
  },
  container: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  categoryItem: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  activeCategoryItem: {
    transform: [{ scale: 1.05 }],
  },
  categoryImage: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  imageContainer: {
    padding: 3,
    borderRadius: 40,
  },
  activeImageContainer: {
    borderWidth: 2,
    borderColor: "#FB8500",
  },
  labelContainer: {
    marginTop: 8,
  },
  activeLabelContainer: {
    // Optional additional styles
  },
  categoryText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  activeCategoryText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FB8500",
  },
});

export default function FoodCategories({ selectedCategory, setSelectedCategory }: Props) {
  const categories: Category[] = [
    { id: 1, title: "Starters", image: require("@/assets/images/starters.jpg") },
    { id: 2, title: "Main Course", image: require("@/assets/images/main-course.jpg") },
    { id: 3, title: "Desserts", image: require("@/assets/images/dessert.jpg") },
    { id: 4, title: "Salads", image: require("@/assets/images/salad.jpg") },
    { id: 5, title: "Drinks", image: require("@/assets/images/drinks.jpg") },
    { id: 6, title: "Pasta", image: require("@/assets/images/pasta.jpg") },
  ];
  const initialIndex = categories.findIndex(c => c.title === selectedCategory);
  const [activeIndex, setActiveIndex] = useState(initialIndex !== -1 ? initialIndex : 0);

  const handlePress = (index: number) => {
    setActiveIndex(index);
    setSelectedCategory(categories[index].title); // notify Menu.tsx
  };

  return (
    <View style={styles.containerWrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
        {categories.map((cat: Category, index: number) => {
          const isActive = index === activeIndex;
          return (
            <Pressable key={cat.id} onPress={() => handlePress(index)} style={[styles.categoryItem, isActive && styles.activeCategoryItem]}>
              
              <View style={[styles.imageContainer, isActive && styles.activeImageContainer]}>
                <Image style={styles.categoryImage} source={cat.image} />
              </View>

              <View style={[styles.labelContainer, isActive && styles.activeLabelContainer]}>
                <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>{cat.title}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
