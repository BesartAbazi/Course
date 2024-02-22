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


/*
    Passport.js:
    ------------
        Passport.js is a flexible authentication middleware for Node.js that can be added to any Express-based application. With Passport.js we can implement authentication using the concept of strategies.
        Passport strategies are separate modules created to work with different means of authentication. 
        Passport is a very extensible middleware, and it allows you to plug in over 300 different authentication providers like Facebook, Twitter, Google, and more.

*/


// initialize the package
// passport is a middleware and must be implemented using app.use(). The initialize() method initializes the authentication module across our app.
app.use(passport.initialize());

// Next, we want to allow for persistent logins, and we can do this by calling session() on our passport module:
// The session() middleware alters the request object and is able to attach a ‘user’ value that can be retrieved from the session id.
app.use(passport.session());

/*
    Serializing a user determines which data of the user object should be stored in the session, usually the user id.
    The serializeUser() function sets an id as the cookie in the user’s browser, and the deserializeUser() function uses the id to look up the user in the database and retrieve the user object with data.
    When we serialize a user, Passport takes that user id and stores it internally on req.session.passport which is Passport’s internal mechanism to keep track of things.

    We pass a user object and a callback function called done after successful authentication. The first argument in the done() function is an error object. In this case, since there was no error we pass null as the argument. 
    For the second argument, we pass in the value that we want to store in our Passport’s internal session, the user id. Once configured, the user id will then be stored in Passport’s internal session: req.session.passport.user = {id: 'xyz'}
*/
passport.serializeUser((user, done) => {
    done(null, user.id);
});

/*
    For any subsequent request, the user object can be retrieved from the session via the deserializeUser() function.
    For the deserializeUser function, we pass the key that was used when we initially serialized a user (id). The id is used to look up the user in storage, and the fetched object is attached to the request object as req.user across our whole application.
    This way we’re able to access the logged-in user’s data in req.user on every subsequent request!
*/
passport.deserializeUser((id, done) => {
    // Look up user id in database.
    db.users.findById(id, function (err, user) {
        if (err) {
            return done(err);
        }
        done(null, user);
    });
});

/*  When a user attempts to log in, Passport’s local strategy will be called and look for a user in the DB with the password that was sent.
    The new LocalStrategy object will take in an anonymous function with the following parameters:
        - username
        - password
        - A callback function called done.

    The purpose of the done callback is to supply an authenticated user to Passport if a user is authenticated. The logic within the anonymous function follows this order:
        1. Verify login details in the callback function.
        2. If login details are valid, the done callback function is invoked and the user is authenticated.
        3. If the user is not authenticated, pass false into the callback function.

    The done callback function takes in two arguments:
        - An error or null if no error is found.
        - A user or false if no user is found.
        With those steps implemented our updated strategy should look like:
*/
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
app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('profile');
});
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








// Utils / Helper functions
let records = [
    {
        id: 1,
        username: "sam",
        password: "codec@demy10",
    },
    {
        id: 2,
        username: "jill",
        password: "birthday",
    },
];

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1;
    } else {
        return 1;
    }
};

exports.createUser = function (user) {
    return new Promise((resolve, reject) => {
        const newUser = {
            id: getNewId(records),
            ...user,
        };
        records = [newUser, ...records];
        console.log(records);
        resolve(newUser);
    });
};

exports.findById = function (id, cb) {
    process.nextTick(function () {
        var idx = id - 1;
        if (records[idx]) {
            cb(null, records[idx]);
        } else {
            cb(new Error("User " + id + " does not exist"));
        }
    });
};

exports.findByUsername = function (username, cb) {
    process.nextTick(function () {
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.username === username) {
                return cb(null, record);
            }
        }
        return cb(null, null);
    });
};
