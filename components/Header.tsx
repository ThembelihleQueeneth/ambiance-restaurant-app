import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Header() {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ambiance</Text>
        <Text style={styles.subHeaderText}>Fine Dining Experience</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#FB8500",
    width: width,
    height: 100, 
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: width / 1,
    borderBottomRightRadius: width / 1,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
  },
  subHeaderText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "300",
  },
});
