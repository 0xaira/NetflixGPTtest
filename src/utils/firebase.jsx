// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqel6kujCmela7ZD3nJc9eW_XnCXudBtM",
  authDomain: "netflixgpt-7684d.firebaseapp.com",
  projectId: "netflixgpt-7684d",
  storageBucket: "netflixgpt-7684d.appspot.com",
  messagingSenderId: "1052821090463",
  appId: "1:1052821090463:web:9ca0321c35947e877a72aa",
  measurementId: "G-7S3XHKH273"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

