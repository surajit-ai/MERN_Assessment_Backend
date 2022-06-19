const express = require('express');
const router = express.Router();
const UserCTRL = require('../controller/user_controller');

router.post('/signup',UserCTRL.signup);
router.post('/signin',UserCTRL.signin);

module.exports = router;