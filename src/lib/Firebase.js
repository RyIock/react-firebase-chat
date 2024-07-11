import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-a11ca.firebaseapp.com",
  projectId: "reactchat-a11ca",
  storageBucket: "reactchat-a11ca.appspot.com",
  messagingSenderId: "819314381119",
  appId: "1:819314381119:web:8fd8fda4f964fe733b038a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const database = getFirestore()
export const storage = getStorage()