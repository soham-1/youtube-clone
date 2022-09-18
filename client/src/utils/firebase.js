// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDNadu87sv-Wof3Wg65RBMKrN2DVYv8G0",
    authDomain: "yt-clone-3a056.firebaseapp.com",
    projectId: "yt-clone-3a056",
    storageBucket: "yt-clone-3a056.appspot.com",
    messagingSenderId: "156532022847",
    appId: "1:156532022847:web:b46ffdbfa8838040f8a28a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;