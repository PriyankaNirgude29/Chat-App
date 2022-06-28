import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDaZ-FFUkVRhxlJ0akCuulAg6jR_0bNl4Y",
    authDomain: "chat-app-96df0.firebaseapp.com",
    projectId: "chat-app-96df0",
    storageBucket: "chat-app-96df0.appspot.com",
    messagingSenderId: "424978557777",
    appId: "1:424978557777:web:af7d635a0a9270c64bc170",
    measurementId: "G-9CB0MJ8VZ0"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service (db)
export const db = getFirestore(app);

// Get a reference to Firebase Cloud Storage service
export const storage = getStorage(app);

// Get a reference to the Firebase auth object
export const auth = getAuth();