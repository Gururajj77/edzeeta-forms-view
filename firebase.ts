import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnFHjFq7Z9amSUT5qm2DfZcusNlFK2Nic",
  authDomain: "edzeeta-485a6.firebaseapp.com",
  projectId: "edzeeta-485a6",
  storageBucket: "edzeeta-485a6.appspot.com",
  messagingSenderId: "939670710610",
  appId: "1:939670710610:web:f22143388b03fb7183328b",
  measurementId: "G-KZBWQ799VE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app, "forms-data");
