/*
express-session Configuration
Now that we have express-session installed, we can configure the middleware and implement it in app.js. Let’s explore a few of the options we can configure:
    secret: The secret property is a key used for signing and/or encrypting cookies in order to protect our session ID.
The next two properties determine how often the session object will be saved.
    resave: Setting this option to true will force a session to be saved back to the session data store, even when no data was modified. Typically, this option should be false, but also depends on your session storage strategy.
    saveUninitialized: This property is a boolean value. If it’s set to true, the server will store every new session, even if there are no changes to the session object. This might be useful if we want to keep track of recurring visits from the same browser, but overall, setting this property to false allows us to save memory space.
Once all options are configured we configure the properties for express-session like so:
*/

app.use(
    session({
        secret: "D53gxl41G",
        resave: false,
        saveUninitialized: false,
    })
);

/*
    Note:
    We are using a hardcoded string of characters for the secret property. Usually, this random string should be stored securely in an environment variable, not in the code.
    The resave and saveUninitialized properties are set to false in order to avoid saving or storing unmodified sessions. With those options put in place, we have the most basic setup of our middleware!
*/



/*
    Sessions are typically stored in three different ways:
        In memory server-side (this is the default storage)
        In a database like MongoDB or MySQL
        A memory cache like Redis or Memcached

    express-session provides an in-memory store called, MemoryStore(). If no other store is specified, then this is set as the default storage. Let’s explore how we would add this to the middleware.

    Note: server-side storing in-memory sessions is something that should be done only during development, NOT during production due to security risks.
*/

// instantiate a new store like so:
const store = new session.MemoryStore();

// Once instantiated, we can add it in the configuration of our session:
app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
        store,
    })
);


// Tell the client browser to create a cookie that stores the session ID. We will also modify cookie attributes to add a bit of security. We can add a cookie property in our session middleware like so:
app.use(
    session({
        secret: "f4z4gs$Gcg",
        cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true, sameSite: "none" },    /*  maxAge: Number of milliseconds until the cookie expires 
                                                                                        secure: "true" -> Sent to the server via HTTPS
                                                                                        sameSite: "none" -> In order to allow a cross-site cookie through different browsers.*/
        saveUninitialized: false,
        resave: false,
    })
);