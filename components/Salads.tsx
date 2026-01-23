import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";

export default function Salads() {
  return (
    <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.MenuTitle}>Salads</Text>
      {/* Shrimp Salad */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Shrimp Salad</Text>
          <Text style={styles.itemDescription}>Fresh & healthy, Shrimp Salad with Avocado and Greek Salad Dressing</Text>

          <View style={styles.priceRow}>
            <View style={styles.pricePill}>
              <Text style={styles.priceText}>R59.99</Text>
            </View>

            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <Image
          style={styles.itemImage}
          source={require("@/assets/images/vegetable-salad-shrimp.jpg")}
        />
      </View>

      {/* potatoe-salad */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Potato Salad</Text>
          <Text style={styles.itemDescription}>
            Potato Salad with Greek Salad and Herbs
          </Text>

          <View style={styles.priceRow}>
            <View style={styles.pricePill}>
              <Text style={styles.priceText}>R59.99</Text>
            </View>

            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <Image
          style={styles.itemImage}
          source={require("@/assets/images/potatoe-salad.jpg")}
        />
      </View>

      {/* steamed_veg.jpg */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Steamed Vegetables</Text>
          <Text style={styles.itemDescription}>
            Steamed Vegetables
          </Text>

          <View style={styles.priceRow}>
            <View style={styles.pricePill}>
              <Text style={styles.priceText}>R59.99</Text>
            </View>

            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <Image
          style={styles.itemImage}
          source={require("@/assets/images/steamed_veg.jpg")}
        />
      </View>

      {/* green_salad */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Green Salad</Text>
          <Text style={styles.itemDescription}>
            Green Salad with Cherry Tomatoes
          </Text>

          <View style={styles.priceRow}>
            <View style={styles.pricePill}>
              <Text style={styles.priceText}>R59.99</Text>
            </View>

            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <Image
          style={styles.itemImage}
          source={require("@/assets/images/green_salad.jpg")}
        />
      </View>

      {/* Coslow */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Coslow</Text>
          <Text style={styles.itemDescription}>
           Coslow Cabbage and Carrots with mayo
          </Text>

          <View style={styles.priceRow}>
            <View style={styles.pricePill}>
              <Text style={styles.priceText}>R59.99</Text>
            </View>

            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <Image
          style={styles.itemImage}
          source={require("@/assets/images/coslow.jpg")}
        />
      </View>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  MenuTitle:{
    fontSize:25,
    marginLeft:12,
    fontStyle:'italic',
    fontWeight:100

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

