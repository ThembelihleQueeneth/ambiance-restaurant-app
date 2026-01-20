import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (

    <View style= {styles.header}>
      <Text style={styles.headerText}>Ambiance</Text>
      <Text style={styles.subHeaderText}>Fine Dining Experience</Text>
    </View>
   

   
  );
}

const styles = StyleSheet.create({
  header: {
   backgroundColor: '#FB8500' ,
       color: '#ffffff',
       justifyContent: 'center',
       alignItems: 'center',
       padding:30,
       flex:1,
       


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
