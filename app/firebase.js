import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration object (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyCp3fU476Vd_UYpANMO05lOIDOE0crGKw8",
  authDomain: "sudoq-100f8.firebaseapp.com",
  projectId: "sudoq-100f8",
  storageBucket: "sudoq-100f8.firebasestorage.app",
  messagingSenderId: "315371427742",
  appId: "1:315371427742:web:dc61df36986b624a93e88f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
