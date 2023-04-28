// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyAo8ZnYnZYoVRIz_jW1TULks3djRpTisRE",
    authDomain: "meat4u-2a33c.firebaseapp.com",
    projectId: "meat4u-2a33c",
    storageBucket: "meat4u-2a33c.appspot.com",
    messagingSenderId: "805000943563",
    appId: "1:805000943563:web:4a5125bcb37464f395c84e",
    measurementId: "G-NCZZGWXZ41"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const Firebase = firebase