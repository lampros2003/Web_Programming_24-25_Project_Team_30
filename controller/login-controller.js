const Models = require('../models/models');

const LogInForm = function (req, res) {
    res.render('login');
}

const doLogin = async function (req, res) {
    const user = await Models.Employee.getByName(req.body.username);
    if (user == undefined) {
        res.render('login', { message: 'Δε βρέθηκε αυτός ο χρήστης' });
    } else {
        if (user.code == req.body.password) {
            req.session.loggedUserId = req.body.username;
            const redirectTo = '/admin/dashboard';
            res.redirect(redirectTo);
        } else {
            res.render('login', { message: 'Ο κωδικός πρόσβασης είναι λάθος' });
        }
    }
}

const Logout = (req, res) => {
    req.session.destroy();
    res.redirect('login');
};

const checkAuthenticated = function (req, res, next) {
    console.log(req.session);
    if (req.session.loggedUserId) {
        console.log('user is authenticated', req.originalUrl);
        next();
    } else {
        if (req.originalUrl === 'login') {
            next();
        } else {
            console.log('not authenticated, redirecting to /login');
            res.redirect('login');
        }
    }
};

module.exports = {
    LogInForm,
    doLogin,
    Logout,
    checkAuthenticated
};