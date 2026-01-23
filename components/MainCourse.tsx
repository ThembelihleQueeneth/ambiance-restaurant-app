import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";

export default function MainCourse() {
  return (
    <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.MenuTitle}>Main Course</Text>
      {/* Chicken Livers */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Chicken Livers</Text>
          <Text style={styles.itemDescription}>Fresh & healthy, lightly grilled</Text>

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
          source={require("@/assets/images/chicken-liver.jpg")}
        />
      </View>

      {/* Bread & Cherry Tomatoes */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Bread & Cherry Tomatoes</Text>
          <Text style={styles.itemDescription}>
            Fresh bread with cherry tomatoes and feta cheese
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
          source={require("@/assets/images/bread_Cherry.jpg")}
        />
      </View>

      {/* Garlic Bread & Poached Eggs */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Garlic Bread & Poached Eggs</Text>
          <Text style={styles.itemDescription}>
            Garlic bread, poached eggs, garnished with fresh herbs
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
          source={require("@/assets/images/starters.jpg")}
        />
      </View>

      {/* Mini Burgers */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Mini Burgers</Text>
          <Text style={styles.itemDescription}>
            Mini burgers with cheese and beef patty
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
          source={require("@/assets/images/mini_burgers.jpg")}
        />
      </View>

      {/* Cheese Balls */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Cheese Balls</Text>
          <Text style={styles.itemDescription}>
            Crispy cheese balls filled with melted cheese
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
          source={require("@/assets/images/Cheese-balls.jpg")}
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

