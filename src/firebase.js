import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBbPOz5d7Za58EyAUaXSTT_qdFUkQS7hFs",
  authDomain: "playerevaluator-3d12a.firebaseapp.com",
  projectId: "playerevaluator-3d12a",
  storageBucket: "playerevaluator-3d12a.firebasestorage.app",
  messagingSenderId: "48853183568",
  appId: "1:48853183568:web:984f0a71ec9ef0a736f555"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };