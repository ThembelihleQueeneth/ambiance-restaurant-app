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
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 15, 
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 56,
    elevation: 6,
  },

  icon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 0, 
  },
});
