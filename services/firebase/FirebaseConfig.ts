// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTpK7wJruuwPKmYvZepRviGcgnrg6-QEY",
  authDomain: "ambiancerestaurantapp.firebaseapp.com",
  projectId: "ambiancerestaurantapp",
  storageBucket: "ambiancerestaurantapp.firebasestorage.app",
  messagingSenderId: "724775056045",
  appId: "1:724775056045:web:f0d2c8cfcc001f66c80c24",
  measurementId: "G-HDG9J9S4X8"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

const analytics = getAnalytics(FIREBASE_APP);