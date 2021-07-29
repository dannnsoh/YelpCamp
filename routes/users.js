const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');

const catchAsync = require('../utilities/catchAsync');
const authLogin = passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' });

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(authLogin, users.login);

router.get('/logout', users.logout);

module.exports = router;