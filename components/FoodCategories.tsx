import { View, Image, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useState } from "react";

const categories = [
  { id: 1, title: "Starters", image: require("@/assets/images/starters.jpg") },
  { id: 2, title: "Salads", image: require("@/assets/images/salad.jpg") },
  { id: 3, title: "Main Course", image: require("@/assets/images/main-course.jpg") },
  { id: 4, title: "Desserts", image: require("@/assets/images/dessert.jpg") },
  { id: 5, title: "Drinks", image: require("@/assets/images/drinks.jpg") },
];

export default function FoodCategories() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      {/* Categories Slider */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {categories.map((cat, index) => {
          const isActive = index === activeIndex;

          return (
            <Pressable
              key={cat.id}
              onPress={() => setActiveIndex(index)}
              style={[
                styles.categoryItem,
                isActive && styles.activeCategoryItem,
              ]}
            >
              <Image style={styles.categoryImage} source={cat.image} />

              {/* Label */}
              <View
                style={[
                  styles.labelContainer,
                  isActive && styles.activeLabelContainer,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isActive && styles.activeCategoryText,
                  ]}
                >
                  {cat.title}
                </Text>
              </View>
            </Pressable> 
          );
        })}
      </ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {categories.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    gap: 16, 
  },

  categoryItem: {
    width: 160,
    height: 170,
    borderRadius: 22,
    backgroundColor: "#fff",
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },

  activeCategoryItem: {
    transform: [{ scale: 1.03 }],
    shadowOpacity: 0.18,
  },

  categoryImage: {
    width: "100%",
    height: "100%",
  },

  labelContainer: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -60 }],
    backgroundColor: "#FB8500",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minWidth: 120,
    alignItems: "center",
  },

  activeLabelContainer: {
    backgroundColor: "#E76F00",
  },

  categoryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  activeCategoryText: {
    color: "#fff",
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
  },

  activeDot: {
    width: 10,
    backgroundColor: "#FB8500",
    borderRadius: 100,
  },
});
