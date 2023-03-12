import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD0Wb1fZ4NC4aJVmlYgefCmZ96RV5aDyO0",
    authDomain: "event-manager-95c1c.firebaseapp.com",
    projectId: "event-manager-95c1c",
    storageBucket: "event-manager-95c1c.appspot.com",
    messagingSenderId: "786045855902",
    appId: "1:786045855902:web:5e9b65fdf7b8aff63bf38f",
    measurementId: "G-6KJEMPNM1L"
};

let app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
