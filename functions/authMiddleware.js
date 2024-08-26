const functions = require("firebase-functions");
const admin = require('firebase-admin');

const authMiddleware = async (req, res, next) => {
    const idToken = req.cookies ? req.cookies.__session : null;

    if (!idToken) {
        console.log('>>>>>>>>>>>>> No ID token found, redirecting to login');
        return res.redirect('/login?h2'); // Redirect to login if token is missing
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log('>>>>>>>>>>>>> ID Token verified:', decodedToken);
        req.user = decodedToken;
        next();
        return;

    } catch (error) {
        console.error('>>>>>>>>>>>>> Error verifying ID token:', error.message);
        res.redirect('/login?h2'); // Redirect to login if token verification fails
        return;

    }
};

module.exports = authMiddleware;