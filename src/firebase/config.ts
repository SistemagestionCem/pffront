import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNibjvpX9944sfewzp3-gszvvVFEVvoyM",
  authDomain: "mobile-eb17a.firebaseapp.com",
  projectId: "mobile-eb17a",
  storageBucket: "mobile-eb17a.firebasestorage.app",
  messagingSenderId: "438758050433",
  appId: "1:438758050433:web:532f716fdd49c69cd41b80",
  measurementId: "G-G03YZ0D07H",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
