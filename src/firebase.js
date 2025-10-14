// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCv7y6hEVPLnFYeZy03S1ZvJrd3R2brvL4",
  authDomain: "buybusy-2c78f.firebaseapp.com",
  projectId: "buybusy-2c78f",
  storageBucket: "buybusy-2c78f.firebasestorage.app",
  messagingSenderId: "744726192679",
  appId: "1:744726192679:web:9806b102128df58af7a402",
  measurementId: "G-B8YTVVJ7S6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
