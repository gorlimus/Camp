const User = require('../models/user');

module.exports.new = (req, res) => {
    res.render('users/register');
};

module.exports.newPost = async (req, res) => {
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
};

module.exports.login = async (req, res) => {
    res.render('users/login');
};

module.exports.loginPost = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectedUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectedUrl);
};


module.exports.logout = (req, res) => {
    req.logout(err => {
        if (err)
            return next(err);
        req.flash('success', 'Bye!');
        res.redirect('/campgrounds');
    })
};