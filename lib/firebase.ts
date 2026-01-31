import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDQObcQ2teVHcgfaCDGX3quowDTCXqQc68",
  authDomain: "moviesite-179b2.firebaseapp.com",
  projectId: "moviesite-179b2",
  storageBucket: "moviesite-179b2.firebasestorage.app",
  messagingSenderId: "876050580636",
  appId: "1:876050580636:web:c7e151112d3a703caa9959",
  measurementId: "G-JF4J3FF33Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Initialize Analytics (only on client side)
if (typeof window !== "undefined") {
  getAnalytics(app);
}

export default app;
