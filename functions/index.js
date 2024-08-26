const functions = require('firebase-functions');
const express = require('express');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs');

var serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://filthy-deb3f.firebaseio.com"
});

const authMiddleware = require('./authMiddleware');


// Serve the account page, with authentication middleware
app.get('/account', authMiddleware, (req, res) => {
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

const sitesRouters = require('./routes/sites');
app.use('/sites', sitesRouters);


exports.app = functions.https.onRequest(app);

