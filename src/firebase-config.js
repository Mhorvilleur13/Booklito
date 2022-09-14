import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: "essay-booklet.firebaseapp.com",
  projectId: "essay-booklet",
  storageBucket: "essay-booklet.appspot.com",
  messagingSenderId: "533762304223",
  appId: "1:533762304223:web:a0b3862fd0c999f9ede16a",
  measurementId: "G-HQKYLL1QCX",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
