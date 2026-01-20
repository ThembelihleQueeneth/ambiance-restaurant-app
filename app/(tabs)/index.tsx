import { View, StyleSheet, ImageBackground, Text, Image, Pressable } from "react-native";
import Header from "../../components/Header";

export default function HomeScreen() {
  return (

    <View style= {styles.titleContainer}>
      <Header />
      <ImageBackground source={require('@/assets/images/ambiance-bg.jpg')} style={styles.imageBackground}>
      <Text style= {styles.messageText1}>
        Welcome to Ambiance

      </Text>
      <Text style={styles.messageText2}>
        Modern | Fresh | Elegant
      </Text>
      <Pressable style={styles.exploreButton}>
        <Text style={styles.exploreButtonText}>
        Explore Menu
        </Text></Pressable>
      </ImageBackground>
      <View style={styles.loginPrompt}>
        <View>
        <Text style= {styles.loginPromptText}>Log in to enjoy faster ordering and special offers</Text>
        </View>
        <View>
          <Pressable style={styles.loginPromptBtn}>
            <Text style={styles.loginPromptTextBtn}>Log In</Text>
          </Pressable>
        </View>
      </View>

      <View>
        <Text style={styles.popularDishesText}> <Text style={{color:'#FB5800'}}>★</Text> Popular Dishes</Text>
      </View>
      <View style={styles.popularDishesContainer}>
        <View style={styles.popularDishCont}>
          <Image source={require('@/assets/images/chicken-liver.jpg')} style={styles.popularDishImage}></Image>
          <Text style={styles.itemName}>Chicken Livers</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.itemPrice}>R59.99</Text>
            <Pressable style={styles.addBtn}>
              <Text style={styles.addBtnText}>Add +</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.popularDishCont}>
          <Image source={require('@/assets/images/pasta.jpg')} style={styles.popularDishImage}></Image>
          <Text style={styles.itemName}>Pasta</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.itemPrice}>R59.99</Text>
            <Pressable style={styles.addBtn}>
              <Text style={styles.addBtnText}>Add +</Text>
            </Pressable>
          </View>
        </View>

      </View>

  </View>
   
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop:60,
    backgroundColor:'#fff',
    flex:1
    
    
    
  },
  imageBackground: {
    
    height:250,
    
  },
  messageText1: {
    color: '#fff',
    fontSize:32,
    fontWeight:'bold',
    alignItems: 'center',
    justifyContent:'center',
    marginTop:50,
    marginLeft:30
    
  },
  messageText2:{
    color: '#fff',
    fontSize:20,
    fontWeight:'light',
    alignItems: 'center',
    justifyContent:'center',
    marginLeft:90

  },
  exploreButton:{
    backgroundColor: '#FB8500',
    width:200,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 20,
    marginTop:10,
    marginLeft:100

  },
  exploreButtonText:{
    color: '#fff',
    fontSize:18,
    fontWeight:'bold',
  },
  loginPrompt:{
    flexDirection:'row',
    backgroundColor: '#fff',
    width:300,
    height:120,
    marginLeft:50,
    borderRadius:20,
    justifyContent:'space-around',
    alignContent:'center',
    alignItems:'center',
    padding:30,
    marginTop:-40,
    shadowColor: '#000',
    shadowOffset: {width:0, height:2},
    shadowOpacity:0.25,
    shadowRadius: 3.84,
    elevation:5


  },
  loginPromptText:{
    color: '#000',
    fontSize:17,
    lineHeight:25

  },
  loginPromptBtn:{
    backgroundColor:'#FB8500',
    padding:10,
    marginLeft:-100,
    marginBottom: -80,
    borderRadius:10,

  },

  loginPromptTextBtn:{
    color: '#fff',
    fontSize:20,
    paddingHorizontal:20
    

  },
  popularDishesText:{
    fontSize:28,
    fontWeight:'bold',
    margin:10,
    color:'orange'
    
  },
  popularDishesContainer :{
   flexDirection: 'row',
   justifyContent: 'space-between'
  },
  popularDishCont: {
    margin:20,
    shadowColor: '#000',
    shadowOffset: {width:0, height:2},
    shadowOpacity:0.25,
    shadowRadius: 3.84,
    elevation:5
    

  },
  popularDishImage:{
    width:150,
    height:100,
    borderRadius:10,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',

  },
  itemName:{
    marginTop:5

  },
  itemPrice:{
    fontSize:20,
    fontStyle:'italic',
    fontWeight:'bold'

  },
  addBtn:{
    backgroundColor:'#FB8500',
    padding:5,
    borderRadius:5,
    width:50,
    height:35,

  },
  addBtnText:{
    color:'#fff',
    fontWeight:'bold',
    padding:5
    

  }
});
