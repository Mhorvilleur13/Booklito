import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6U2ss4Gwxtu2CEPDN5xQ-t_v671hFpXM",
  authDomain: "essay-booklet.firebaseapp.com",
  projectId: "essay-booklet",
  storageBucket: "essay-booklet.appspot.com",
  messagingSenderId: "533762304223",
  appId: "1:533762304223:web:a0b3862fd0c999f9ede16a",
  measurementId: "G-HQKYLL1QCX",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
