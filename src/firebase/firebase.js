// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFDvxzDc67TgGqXSOSrzTCNkF3CRSlWDI",
  authDomain: "dhruv-rakshak.firebaseapp.com",
  projectId: "dhruv-rakshak",
  storageBucket: "dhruv-rakshak.firebasestorage.app",
  messagingSenderId: "922370082916",
  appId: "1:922370082916:web:1c0415f28625eeb5a8f771"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;