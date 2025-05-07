// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// The web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyB005ODvguiru8ztSUyUFp93OV7E1VCqjs",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "moody-ff022.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "moody-ff022",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "moody-ff022.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "149301168861",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:149301168861:web:56d5c777adb078984fa934"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);