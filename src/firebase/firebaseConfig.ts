// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB005ODvguiru8ztSUyUFp93OV7E1VCqjs",
  authDomain: "moody-ff022.firebaseapp.com",
  projectId: "moody-ff022",
  storageBucket: "moody-ff022.appspot.com",
  messagingSenderId: "149301168861",
  appId: "1:149301168861:web:56d5c777adb078984fa934"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);