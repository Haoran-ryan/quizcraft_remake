// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD72OkIQ7V9xE8LNrjJrXnhQrk7EKVAeVE",
  authDomain: "quizcraft-remake.firebaseapp.com",
  projectId: "quizcraft-remake",
  storageBucket: "quizcraft-remake.appspot.com",
  messagingSenderId: "1074395328035",
  appId: "1:1074395328035:web:cb7f1c00bfba7954038b96",
  measurementId: "G-BMBR3B794Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };