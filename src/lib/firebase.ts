import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJhMzmMGcMkZEdey0cuKrAoaexBimtj0c",
  authDomain: "rodilar.firebaseapp.com",
  databaseURL: "https://rodilar-default-rtdb.firebaseio.com",
  projectId: "rodilar",
  storageBucket: "rodilar.firebasestorage.app",
  messagingSenderId: "856294801440",
  appId: "1:856294801440:web:e96f45816e893a79737c45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db = getDatabase(app);

// Initialize Auth
export const auth = getAuth(app);
