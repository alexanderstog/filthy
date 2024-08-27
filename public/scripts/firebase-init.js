import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, connectAuthEmulator } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, connectFirestoreEmulator } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";


const firebaseConfig = {
    apiKey: "AIzaSyBuoFvl3vqXiiZFkAq_aT2zmsn2xWv0joU",
    authDomain: "filthy-deb3f.firebaseapp.com",
    databaseURL: "https://filthy-deb3f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "filthy-deb3f",
    storageBucket: "filthy-deb3f.appspot.com",
    messagingSenderId: "683533307815",
    appId: "1:683533307815:web:964f98ad9631d2bf627082",
    measurementId: "G-FGD0F0P85W"
  };


console.log("firebase-init code");


  // Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

if (window.location.hostname === 'localhost') {
  console.log("Running on localhost, connecting to emulators nowwww...");
  connectAuthEmulator(auth, 'http://localhost:7000');  // Use your correct port for Auth emulator
  connectFirestoreEmulator(firestore, 'localhost', 8080);  // Use your correct port for Firestore emulator
}

export { app, auth, firestore, analytics };