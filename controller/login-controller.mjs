import * as Models from '../models/models.js';

export let LogInForm = function (req, res) {
    res.render('login');
}


export let doLogin = async function (req, res) {
    //Ελέγχει αν το username και το password είναι σωστά και εκτελεί την
    //συνάρτηση επιστροφής authenticated

    const user = await Models.Employee.getByName(req.body.username);
    if (user == undefined ) {
        res.render('login', { message: 'Δε βρέθηκε αυτός ο χρήστης' });
    } else {

        if (user.code == req.body.password) {
            //req.session.loggedUserId = user.id;
            const redirectTo ='/admin/dashboard';

            res.redirect(redirectTo);
        } else {
            res.render('login', { message: 'Ο κωδικός πρόσβασης είναι λάθος' });
        }
    }
}