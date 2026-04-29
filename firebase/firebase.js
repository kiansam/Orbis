// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6CNk113wuUKZ0g2A4a-CxJfSj9Muk9f4",
  authDomain: "orbissolutions-f4142.firebaseapp.com",
  projectId: "orbissolutions-f4142",
  storageBucket: "orbissolutions-f4142.firebasestorage.app",
  messagingSenderId: "49923461784",
  appId: "1:49923461784:web:23de1078fcec510b7cf6ed",
  measurementId: "G-X1W5G6TQEZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
