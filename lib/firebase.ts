// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX6N58PaCYLs8uGAhUaebPNp3c3gIPlGQ",
  authDomain: "mifdomare.firebaseapp.com",
  projectId: "mifdomare",
  storageBucket: "mifdomare.appspot.com",
  messagingSenderId: "933882748886",
  appId: "1:933882748886:web:a930fadbbec7a4174c8e77",
  measurementId: "G-L6183L4X68"
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;