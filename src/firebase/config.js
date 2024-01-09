import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA8OFJam_SicR7VPreJeImUpV4nq_8cvyo",
  authDomain: "miniblog-1cb45.firebaseapp.com",
  projectId: "miniblog-1cb45",
  storageBucket: "miniblog-1cb45.appspot.com",
  messagingSenderId: "99897744728",
  appId: "1:99897744728:web:fe4a0f0fc7af0af2e2592d"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}