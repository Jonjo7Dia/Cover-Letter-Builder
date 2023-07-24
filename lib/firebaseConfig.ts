// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebdase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX4py3z2jswztvrLm5EE5g80Y8nCrLCHQ",
  authDomain: "tailoredapplication-de01c.firebaseapp.com",
  projectId: "tailoredapplication-de01c",
  storageBucket: "tailoredapplication-de01c.appspot.com",
  messagingSenderId: "658028015075",
  appId: "1:658028015075:web:49357e88e6ec14ff5ac4d6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
