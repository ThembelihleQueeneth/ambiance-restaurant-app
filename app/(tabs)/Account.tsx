 import { View, Text, StyleSheet } from "react-native"; //Importing necessary components
import Header from "@/components/Header"; //Importing Header Component

export default function Account() {
  return (
    <View >
       <Header></Header>  {/* Using Header Component */}
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
