const router = require('express').Router();

const authMiddleware = require('../authMiddleware');

router.get('/', authMiddleware, (req, res) => {
    return res.status(200).json(["here", "are", "some", "sites"]);
});

module.exports = router;