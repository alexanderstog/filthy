const functions = require('firebase-functions');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.static('public'));
app.use(cookieParser());


app.set('view engine', 'ejs');

const path = require('path');
const admin = require('firebase-admin');

var serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://filthy-deb3f.firebaseio.com"
});

const checkIfAuthenticated = (req, res, next) => {
    const idToken = req.cookies ? req.cookies.__session : null;
    console.log("idToken is" + idToken);

    if (!idToken) {
        console.log('>>>>>>>>>>>>> No ID token found, redirecting to login');
        return res.redirect('/login?h2'); // Redirect to login if token is missing
    }

    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            console.log('>>>>>>>>>>>>> ID Token verified:', decodedToken);
            req.user = decodedToken;
            next();
        })
        .catch((error) => {
            console.error('>>>>>>>>>>>>> Error verifying ID token:', error.message);
            res.redirect('/login?h2'); // Redirect to login if token verification fails
        });
};



// Serve the account page, with authentication middleware
app.get('/account', checkIfAuthenticated, (req, res) => {
    res.render('account');
});





// Set up a route to respond to GET requests at the root URL '/'
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/hello', (req, res) => {
    res.send('Hello, something else!');
});

app.get('/login', (req, res) => {
    res.render('login');
});



exports.app = functions.https.onRequest(app);

