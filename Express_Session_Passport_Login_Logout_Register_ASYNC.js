const express = require("express");
const app = express();
const session = require("express-session");
const store = new session.MemoryStore();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
        store,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Look up user id in database.
    db.users.findById(id, function (err, user) {
        if (err) {
            return done(err);
        }
        done(null, user);
    });
});

passport.use(
    new LocalStrategy(function (username, password, cb) {
        db.users.findByUsername(username, function (err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            if (user.password != password) {
                return cb(null, false);
            }
            return cb(null, user);
        });
    })
);


// Logout
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login"); // redirect them back to the login path
  });


app.get("/login", (req, res) => {
    res.render("login");
});


// Logging In:
// In order to log in a user we first need a POST request that takes in user credentials. We can add passport middleware in order to process the authentication and, if successful, serialize the user for us:
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('profile');
    }
);
/*
    We’re passing in passport.authenticate() as middleware. Using this middleware allows Passport.js to take care of the authentication process behind the scenes and creates a user session for us.
    passport.authenticate() takes in:
        - string specifying which strategy to employ. In this case, we should use a 'local' strategy.
        - An optional object as the second argument. In this case, we should set the failureRedirect key to '/login'. This will redirect the user to the /login page if the login process fails.
*/


// Once implemented, we can update the '/profile' endpoint to make use of the serialized user found in the request object, req.user:
app.get('/profile', (req, res) => {
    res.render('profile', { user: req.user });
});
// This will render our profile view page along with the user data stored in the session!


app.get("/register", (req, res) => {
    res.render("register");
});

// POST REGISTER:
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    // Create new user:
    const newUser = await db.users.createUser({ username, password });
    // Add if/else statement with the new user as the condition:
    if (newUser) {
        // Send correct response if new user is created:
        res.status(201).json({
            msg: 'New user created.',
            newUser
        });
    } else {
        // Send correct response if new user failed to be created:
        res.status(500).json({
            msg: 'Error: User cannot be created.'
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});