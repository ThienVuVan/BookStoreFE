import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBznwKPcuRh8LQrEuwniM_POku83cyxQoE",
    authDomain: "bookstore-398708.firebaseapp.com",
    projectId: "bookstore-398708",
    storageBucket: "bookstore-398708.appspot.com",
    messagingSenderId: "236697940687",
    appId: "1:236697940687:web:76a067b3a766f3486efdba",
    measurementId: "G-XR94E297RP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, facebookProvider, googleProvider, githubProvider }
