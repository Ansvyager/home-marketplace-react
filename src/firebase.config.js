import {getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNoeBnUsDJOQ20LmUVp1-aISZhSWTFmXU",
    authDomain: "house-marketplace-app-4345a.firebaseapp.com",
    projectId: "house-marketplace-app-4345a",
    storageBucket: "house-marketplace-app-4345a.appspot.com",
    messagingSenderId: "844563964389",
    appId: "1:844563964389:web:a49a9ff90a56b7de8b0f0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()