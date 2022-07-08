// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyABOw_jkRc3fypkRybr4kNdGdTrwo5XNaQ",
  authDomain: "yourmart-b69d7.firebaseapp.com",
  projectId: "yourmart-b69d7",
  storageBucket: "yourmart-b69d7.appspot.com",
  messagingSenderId: "992630794225",
  appId: "1:992630794225:web:440cc56c87389c80830650",
  measurementId: "G-ZS5VD2K7CY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
