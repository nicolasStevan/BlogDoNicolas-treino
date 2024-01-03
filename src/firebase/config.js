
import { initializeApp } from "firebase/app";
import {getFireStore} from "firebase/firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDroZI_-a2qbSExsTvjBo_6cH31ZkJZW5Y",
  authDomain: "miniblog-curso-c8048.firebaseapp.com",
  projectId: "miniblog-curso-c8048",
  storageBucket: "miniblog-curso-c8048.appspot.com",
  messagingSenderId: "211765712632",
  appId: "1:211765712632:web:1dea181c2a9ad018704d0d"
};


const app = initializeApp(firebaseConfig);

const db = getFireStore(app)

export {db}