// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI2ulUTlIQeU7PfbWEtrGWnWWOWfQj2qw",
  authDomain: "house-marketplace-app-f50e6.firebaseapp.com",
  projectId: "house-marketplace-app-f50e6",
  storageBucket: "house-marketplace-app-f50e6.appspot.com",
  messagingSenderId: "734674861729",
  appId: "1:734674861729:web:cc9eab61863ea79cc67ae0"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()