// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC3nkLsKlMgZP45nLdzexRkJLEDr-Q6M4Q",
  authDomain: "evaluacionmodulo5gabriel.firebaseapp.com",
  projectId: "evaluacionmodulo5gabriel",
  storageBucket: "evaluacionmodulo5gabriel.firebasestorage.app",
  messagingSenderId: "434584189814",
  appId: "1:434584189814:web:cf9bb53f60b21953f65857",
  measurementId: "G-5X16L2LKB6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Autenticación y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);