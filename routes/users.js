const express = require('express');
const router = express.Router();
const passport = require('passport');
const CatchAsync = require('../utils/CatchAsync');
const User = require('../models/user');
const { query } = require('express');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', CatchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err)
                return next(err);
            req.flash('success', `Welcome to Yelp-Camp, ${username}!`);
            res.redirect('/campgrounds');
        });
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/register');
    }
}));

router.get('/login', async (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', ({ failureFlash: true, failureRedirect: '/login', keepSessionInfo: true })), (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectedUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectedUrl);
})

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err)
            return next(err);
        req.flash('success', 'Bye!');
        res.redirect('/campgrounds');
    })
});


module.exports = router;