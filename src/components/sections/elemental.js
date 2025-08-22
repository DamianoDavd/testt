// elemental.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // penting buat komentar

const firebaseConfig = {
  apiKey: "AIzaSyBrKZNzM6jrGw1kmRwiULMfX2_oZ0jdfiU",
  authDomain: "damcomment-98786.firebaseapp.com",
  projectId: "damcomment-98786",
  storageBucket: "damcomment-98786.firebasestorage.app",
  messagingSenderId: "83161111029",
  appId: "1:83161111029:web:f99f0359be274804a828bc",
  measurementId: "G-TGYNGWVRHR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, db, analytics };