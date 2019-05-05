const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');


router.get('/signup', UserController.user_signup);

module.exports = router;