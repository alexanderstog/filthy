const router = require('express').Router();
const admin = require('firebase-admin');

const authMiddleware = require('../authMiddleware');

router.get('/', authMiddleware, (req, res) => {
    return json([]);
});

module.exports = router;