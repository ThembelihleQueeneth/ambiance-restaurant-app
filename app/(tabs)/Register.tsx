import { View, Text, StyleSheet, TextInput, Pressable,ScrollView } from "react-native";
import Header from "@/components/Header";
import { useRouter } from "expo-router";


export default function Register() {
    const router = useRouter();
 return (
     <View style={styles.container}>
       <Header />
 
       <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
         {/* Register Header */}
         <Text style={styles.loginTitle}>Create Account</Text>
         <Text>Fill Your Personal Details Below</Text>
 
         {/* Form Container */}
         <View style={styles.formContainer}>
           <Text style={styles.label}>First Name:</Text>
           <TextInput
             style={styles.inputText}
             placeholder="Enter first name here"
             autoCapitalize="none"
           />

           <Text style={styles.label}>Last Name:</Text>
           <TextInput
             style={styles.inputText}
             placeholder="Enter last name here"
             autoCapitalize="none"
           />

           <Text style={styles.label}>Contact Number:</Text>
           <TextInput
             style={styles.inputText}
             placeholder="Enter contact number here"
             autoCapitalize="none"
           />

           <Text style={styles.label}>Email:</Text>
           <TextInput
             style={styles.inputText}
             placeholder="Enter email here"
             keyboardType="email-address"
             autoCapitalize="none"
           />
 
           <Text style={styles.label}>Password:</Text>
           <TextInput
             style={styles.inputText}
             placeholder="Enter your password here"
             secureTextEntry={true}
           />

            <Text style={styles.label}>Confirm Password:</Text>
           <TextInput
             style={styles.inputText}
             placeholder="Enter your password here"
             secureTextEntry={true}
           />
 
           <Pressable style={styles.loginBtn}>
             <Text style={styles.loginBtnText}>Register</Text>
           </Pressable>
 
           <View style={styles.signUpContainer}>
             <Text style={styles.noAccountText}>Already have an Account?</Text>
             <Pressable onPress={() => router.push("/(tabs)/Account")}>
               <Text style={styles.signUpText}> Log In</Text>
             </Pressable>
           </View>
         </View>
       </ScrollView>
     </View>
   );
 };
 
 {/* 
 
   Folder structure
   app/tabs/index.tsx (Which is the Home Page),
   app/tabs/Account.tsx (Which is the login),
   app/tabs/Menu.tsx (Which is the Menu Page),
   app/tabs/Basket.tsx (Which is the Cart ),  
 
   I'm done with frontend of all the files, I'm left with register, when I click register I want to go to the register page how do I do that
   
   */}
 
 
 
 const styles = StyleSheet.create({
   container: {
     backgroundColor: "#fff",
     flex: 1,
   },
   contentContainer: {
     padding: 20,
     paddingTop: 40,
   },
   loginTitle: {
     fontSize: 32,
     fontWeight: "bold",
     marginBottom: 30,
     color: "#1E1E1E",
   },
   formContainer: {
     width: "100%",
   },
   label: {
     fontSize: 16,
     fontWeight: "500",
     marginBottom: 8,
     color: "#333",
   },
   inputText: {
     width: "100%",
     height: 50,
     borderColor: "#ddd",
     borderWidth: 1,
     borderRadius: 12,
     paddingHorizontal: 15,
     marginBottom: 20,
     fontSize: 16,
     backgroundColor: "#f9f9f9",
     color: "#1E1E1E",
   },
   forgotPasswordBtn: {
     alignSelf: "flex-end",
     marginBottom: 30,
   },
   forgotPasswordText: {
     color: "#FB8500",
     fontSize: 14,
     fontWeight: "500",
   },
   loginBtn: {
     backgroundColor: "#FB8500",
     paddingVertical: 15,
     borderRadius: 14,
     alignItems: "center",
     marginBottom: 20,
   },
   loginBtnText: {
     color: "#fff",
     fontSize: 18,
     fontWeight: "bold",
   },
   signUpContainer: {
     flexDirection: "row",
     justifyContent: "center",
   },
   noAccountText: {
     color: "#555",
     fontSize: 14,
   },
   signUpText: {
     color: "#FB8500",
     fontSize: 14,
     fontWeight: "bold",
   },
 });