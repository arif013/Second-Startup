// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkqNCLewCD9Ox8Cg2MrJqToTK0GKH_beY",
  authDomain: "second-startup.firebaseapp.com",
  projectId: "second-startup",
  storageBucket: "second-startup.appspot.com",
  messagingSenderId: "1052777414343",
  appId: "1:1052777414343:web:a4ba64d286ef7bb24c88e2",
  measurementId: "G-47NL3VCVZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);