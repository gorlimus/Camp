const express = require('express');
const router = express.Router();
const passport = require('passport');
const CatchAsync = require('../utils/CatchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
    .get(users.new)
    .post(CatchAsync(users.newPost));

router.route('/login')
    .get(users.login)
    .post(passport.authenticate('local', ({ failureFlash: true, failureRedirect: '/login', keepSessionInfo: true })), users.loginPost);

router.get('/logout', users.logout);

module.exports = router;