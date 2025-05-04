const express = require('express');
const { signup, login, logout } = require('../controllers/auth.controller');
const { validateSignup, validateLogin } = require('../middleware/validation.middleware');

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

module.exports = router;