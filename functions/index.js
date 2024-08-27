const functions = require('firebase-functions');
const express = require('express');
const cookieParser = require('cookie-parser');




const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(require("./serviceAccountKey.json")),
    databaseURL: "https://filthy-deb3f.firebaseio.com"
});

// Check if the app is running locally and set up the emulator
if (process.env.NODE_ENV !== 'production') {
    console.log("Using Firebase Auth Emulator for development");
    process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:7000';  // Auth emulator port
    process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';       // Firestore emulator port
    process.env.FUNCTIONS_EMULATOR_HOST = 'localhost:5001'; 
}

const db = admin.firestore();
const app = express();
app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs');

// Middleware for authentication
const checkIfAuthenticated = (req, res, next) => {
    const idToken = req.cookies ? req.cookies.__session : null;
    console.log("idToken is " + idToken);

    if (!idToken) {
        console.log('No ID token found, redirecting to login');
        return res.redirect('/login?h2'); // Redirect to login if token is missing
    }

    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            console.log('ID Token verified:', decodedToken);
            req.user = decodedToken;
            next();
        })
        .catch((error) => {
            console.error('Error verifying ID token:', error.message);
            res.redirect('/login?h2'); // Redirect to login if token verification fails
        });
};

// Routes
app.get('/account', checkIfAuthenticated, (req, res) => {
    res.render('account');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// Export the HTTP function
exports.app = functions.https.onRequest(app);

// Firestore trigger function to generate/update JS file
exports.generateUserScript = functions.firestore
    .document('user_data/{userId}')
    .onWrite(async (change, context) => {
        console.log(">>> Firestore trigger function executed because document was changed");

        const userId = context.params.userId;
        const newValue = change.after.exists ? change.after.data() : null;

        if (!newValue || !newValue.text) {
            console.log(`No valid data found for user ${userId}`);
            return null;
        }

        // Generate the JavaScript content
        // do something here to convert the nl
        const jsContent = `console.log("hello world");`;

        try {
            // Update the Firestore document with the generated JavaScript content
            await db.collection('user_data').doc(userId).set({ script: jsContent }, { merge: true });
            console.log(`JavaScript file updated for user ${userId}`);
        } catch (error) {
            console.error(`Error updating JavaScript for user ${userId}:`, error);
        }

        return null;
    });
