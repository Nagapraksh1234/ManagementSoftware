// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY4eh2HpiwLsEp8YoaylhPmrEjBeysWfc",
  authDomain: "music-app-9d0e4.firebaseapp.com",
  projectId: "music-app-9d0e4",
  storageBucket: "music-app-9d0e4.firebasestorage.app",
  messagingSenderId: "410331790238",
  appId: "1:410331790238:web:b1200312c4c8009f2fb48f",
  measurementId: "G-1ME1VVLFYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
