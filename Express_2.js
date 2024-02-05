const express = require('express');
const app = express();
const session = require('express-session');
const store = new session.MemoryStore();

app.use(
    session({
        secret: 'f4z4gs$Gcg',
        cookie: { maxAge: 300000000, secure: true, sameSite: 'none' },
        saveUninitialized: false,
        resave: false,
        store,
    })
);

function ensureAuthentication(req, res, next) {
    // Complete the if statement below:
    if (req.session.authenticated) {
        return next();
    } else {
        res.status(403).json({ msg: "You're not authorized to view this page" });
    }
}

// Add your ensureAuthentication middleware below:
app.get('/shop', ensureAuthentication, (req, res) => {
    // Send the user object to the view page:
    res.render('shop', { user: req.session.user });     // render the HTML file shop.etj (saved in folder "view")
});

app.get('/login', (req, res) => {
    res.render('login');    // render the HTML file login.etj (saved in folder "view")
});

// POST request for logging in
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.users.findByUsername(username, (err, user) => {
        if (!user) return res.status(403).json({ msg: 'No user found!' });
        if (user.password === password) {
            // Add your authenticated property below:
            req.session.authenticated = true;
            // Add the user object below:
            req.session.user = {
                username: username,
                password: password
            };
            // Log the session below:
            console.log(req.session)
            res.redirect('/shop');
        } else {
            res.status(403).json({ msg: 'Bad Credentials' });
        }
    });
});