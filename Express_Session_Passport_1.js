const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const PORT = process.env.PORT || 5000;

app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
    })
);

/*
    Passport.js:
    ------------
        Passport.js is a flexible authentication middleware for Node.js that can be added to any Express-based application. With Passport.js we can implement authentication using the concept of strategies.
        Passport strategies are separate modules created to work with different means of authentication. 
        Passport is a very extensible middleware, and it allows you to plug in over 300 different authentication providers like Facebook, Twitter, Google, and more.

*/

//Install passport packages: npm install passport passport-local

// Import packages
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;   // Importing the passport-local package with its Strategy instance to authenticate users with a username and password.


// initialize the package
// passport is a middleware and must be implemented using app.use(). The initialize() method initializes the authentication module across our app.
app.use(passport.initialize());


// Next, we want to allow for persistent logins, and we can do this by calling session() on our passport module:
// The session() middleware alters the request object and is able to attach a ‘user’ value that can be retrieved from the session id.
app.use(passport.session());


// With Passport configured, we can now set up the passport-local strategy for authenticating with a username and password.
// First, we can configure the local strategy by creating a new instance of it and passing it as middleware into passport:
passport.use(new LocalStrategy(
    function (username, password, done) {

    }
));


/*
    Serializing a user determines which data of the user object should be stored in the session, usually the user id.
    The serializeUser() function sets an id as the cookie in the user’s browser, and the deserializeUser() function uses the id to look up the user in the database and retrieve the user object with data.
    When we serialize a user, Passport takes that user id and stores it internally on req.session.passport which is Passport’s internal mechanism to keep track of things.

    We pass a user object and a callback function called done after successful authentication. The first argument in the done() function is an error object. In this case, since there was no error we pass null as the argument. 
    For the second argument, we pass in the value that we want to store in our Passport’s internal session, the user id. Once configured, the user id will then be stored in Passport’s internal session: req.session.passport.user = {id: 'xyz'}
*/
passport.serializeUser((user, done) => {
    return done(null, user.id)
});


/*
    For any subsequent request, the user object can be retrieved from the session via the deserializeUser() function.
    For the deserializeUser function, we pass the key that was used when we initially serialized a user (id). The id is used to look up the user in storage, and the fetched object is attached to the request object as req.user across our whole application.
    This way we’re able to access the logged-in user’s data in req.user on every subsequent request!
*/
passport.deserializeUser((id, done) => {
    // Look up user id in database.
    db.users.findById(id, function (err, user) {
        if (err) return done(err);
        return done(null, user);
    });
});


/*  The new LocalStrategy object will take in an anonymous function with the following parameters:
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
passport.use(new LocalStrategy(
    function (username, password, done) {
        // Look up user in the db
        db.users.findByUsername(username, (err, user) => {
            // If there's an error in db lookup, 
            // return err callback function
            if (err) return done(err);

            // If user not found, 
            // return null and false in callback
            if (!user) return done(null, false);

            // If user found, but password not valid, 
            // return err and false in callback
            if (user.password != password) return done(null, false);

            // If user found and password valid, 
            // return the user object in callback
            return done(null, user)
        });
    }
));


app.get("/", (req, res) => {
    res.send("Hello from the homepage!");
});


app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});