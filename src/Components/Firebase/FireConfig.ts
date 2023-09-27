// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import key from  '../Global/env.ts';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: key.API_KEY,
  authDomain: key.AUTH_DOMAIN,
  projectId: key.PROJECT_ID,
  storageBucket: key.STORAGE_BUCKET,
  messagingSenderId: key.MESSAGING_SENDER_ID,
  appId: key.APP_ID,
  measurementId: key.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export default db;
