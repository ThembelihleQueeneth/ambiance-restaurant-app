import { View, Text, StyleSheet } from "react-native";
import Header from "@/components/Header";

export default function Basket() {
  return (
    <View >
        <Header></Header>
    </View>

    
   

   
  );
}

const styles = StyleSheet.create({
  header: {
   backgroundColor: '#FB8500' ,
       color: '#ffffff',
       justifyContent: 'center',
       alignItems: 'center',
       padding:10,
       
       


  },
  headerText: {
    color: '#ffffff',
    fontSize:32,
    fontWeight:'bold',
  },
  subHeaderText: {
    color: '#ffffff',
    fontSize:25,
    fontWeight: '100'

  },
});
