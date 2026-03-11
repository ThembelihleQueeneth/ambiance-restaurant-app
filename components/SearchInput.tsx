import { View, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchInput() {
  return (
    <View style={styles.container}>
     

      {/* Input */}
      <TextInput
        placeholder="Search for dishes here..."
        placeholderTextColor="#999"
        style={styles.searchInput}
      />

       {/* Search Icon */}
      <Ionicons name="search" size={22} color="#FB8500" style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    marginHorizontal: 16,
    marginTop: 20, 
    marginBottom: 10,
    borderRadius: 24,
    paddingHorizontal: 18,
    height: 56,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },

  icon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 0, 
    fontWeight: "500",
  },
});
