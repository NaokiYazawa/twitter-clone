// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAv3xbG8Lixlb9HjTChrfOAcBT8Mx4TbKo",
  authDomain: "twitter-clone-76fa9.firebaseapp.com",
  projectId: "twitter-clone-76fa9",
  storageBucket: "twitter-clone-76fa9.appspot.com",
  messagingSenderId: "780875467139",
  appId: "1:780875467139:web:faabecaf562511d426ceb6"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };