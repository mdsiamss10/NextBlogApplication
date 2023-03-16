// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzhSCjeI-cJy5pOiuRuv1HS7el_Z98rSU",
  authDomain: "nextjs-blog-apps.firebaseapp.com",
  projectId: "nextjs-blog-apps",
  storageBucket: "nextjs-blog-apps.appspot.com",
  messagingSenderId: "971542076973",
  appId: "1:971542076973:web:245c5652ec8962965862a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
