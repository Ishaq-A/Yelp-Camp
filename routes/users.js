const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

// Register Route
router.route('/register')
.get(users.renderRegister)
.post(catchAsync(users.register));


// Login Route
const authenticateUser = passport.authenticate('local', {
    failureFlash: true, 
    failureRedirect: '/login' 
});

router.route('/login')
.get(users.renderLogin)
.post(authenticateUser, users.login);

// Logout Route
router.get('/logout', users.logout);

module.exports = router;

