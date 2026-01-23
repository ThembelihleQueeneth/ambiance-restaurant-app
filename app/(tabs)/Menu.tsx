import { View, StyleSheet } from "react-native";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import FoodCategories  from "@/components/FoodCategories";
import MenuItems from "@/components/MenuItems";

export default function Menu() {
  return (
    <View style={styles.container}>
        <Header></Header>
        <SearchInput></SearchInput>
        <FoodCategories></FoodCategories>
        <MenuItems></MenuItems>
    </View>

    
   

   
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    flex:1
  }
});