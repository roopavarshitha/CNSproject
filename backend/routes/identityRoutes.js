const express = require('express');
const { verifyUserIdentity } = require('../controllers/identityController');

const router = express.Router();

router.post('/verify', verifyUserIdentity);

module.exports = router;
