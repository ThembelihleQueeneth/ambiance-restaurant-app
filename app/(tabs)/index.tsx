import { View, StyleSheet, ImageBackground } from "react-native";
import Header from "../../components/Header";

export default function HomeScreen() {
  return (

    <View style= {styles.titleContainer}>
      <Header />
      <ImageBackground source={require('../../assets/images/ambiance-gb.jpg')} style={styles.imageBackground}>
      </ImageBackground>
    </View>
   
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  imageBackground: {
    height:600,
    
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
