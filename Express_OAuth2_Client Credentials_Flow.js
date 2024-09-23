/*
    Authentication in OAuth is facilitated by the use of access tokens. 
    Access tokens are used to make API requests on behalf of the user and represent the authorization of a specific application to access specific parts of a user’s data. These API requests are made over HTTPS connections.
    Access tokens are very short-lived, and they only last anywhere from a few minutes to just hours. Their ephemeral nature limits the amount of time an attacker can use a stolen token.

    OAuth 2.0 Grant Types:
        OAuth 2.0 grant types, also known as flows, describe multiple ways to obtain access tokens. Flows involve two main parts:
            Redirecting the user to the OAuth provider and obtaining an access token
            Using the access token to gain restricted access
        Each grant type is optimized for a specific type of application based on complexity and severity. The grant type chosen will depend on whether the code can securely store a secret key and the trust level between a user and a client.

    Client Credentials Grant:
        A Client Credentials Grant is used when applications request an application token to access their own resource. 
        This grant type has a limited use case because it’s only used when the resource server and the authentication server are the same entity.
        Use Case: Used when an application needs to access its own resources, not on behalf of a user.
        Flow: The client application directly requests an access token from the authorization server using its own credentials.
        Example: A backend service accessing its own API.
    
    Authorization Code Grant:
        The Authorization Code Grant is the most widely used grant for publicly available applications. This was the grant type we showed earlier in this article. 
        To use this grant type, the webserver must have the capability to store client credentials securely.
        This approach uses browser redirection to communicate between the resource server and the authorization server. The client will obtain an authorization code and then exchange it for an access token.
        Use Case: Most common for web and mobile applications where the client can securely store credentials.
        Flow:   1. User is redirected to the authorization server to log in and grant permissions. 
                2. Authorization server redirects back to the client with an authorization code. 
                3. Client exchanges the authorization code for an access token.
        Example: A web app allowing users to log in with Google.

    Device Code Grant
        The Device Code Grant is used for devices that have no browser and/or have limited input capability to input an access token. Some examples of this might be smart TV apps.
        Use Case: Used for devices with limited input capabilities (e.g., smart TVs).
        Flow:   1. Device requests a device code and user code from the authorization server.
                2. User is prompted to visit a URL on another device and enter the user code.
                3. User logs in and grants permissions.
                4. Device polls the authorization server for the access token.
        Example: A smart TV app asking the user to log in via a web browser on their phone.

    Proof Key for Code Exchange (PKCE):
        PKCE is an extension to the Authorization Code flow, and it is used to prevent attacks and to securely perform the OAuth exchange from public clients. 
        This extension helps prevent authorization code injection from malicious actors.

    Implicit Grant - Deprecated (Veraltet)
        The Implicit Grant is similar to the authorization code grant except in the case of single-page applications that cannot store client credentials. In this case, the authorization server will return an access token directly. The Implicit flow is deprecated, but might still be seen in legacy code. It has been replaced by the PKCE extension.

    Resource Owner Password Credential Grant - Deprecated (Veralet)
        This grant is used when an application exchanges the user’s username and password for an access token. It’s important to note that third-party applications should never be allowed to ask the user for their password! 
        The Resource Owner Password Credential flow would only be used if you had a high trust relationship with the client application. 
        The Resource Owner Password Credential flow is deprecated, but might still be seen in legacy code.

    
    OAuth 1.0 vs OAuth 2.0
        There are two versions of OAuth, known as OAuth 1.0 and OAuth 2.0. Today OAuth 2.0, the type described in the example above, is more common. 
        The main argument against OAuth 1.0 is that it is difficult to implement for software developers; it is more complex than OAuth2 and disrupts the user experience on mobile applications by requiring a user to open their browser. The complexity of OAuth1 is partially due to additional layers of security, like cryptography, built-in, and OAuth2 trades these additional cryptography protections for easier implementation and a better user experience, since HTTPS protocol already provides encryption.

        Large authenticators, such as Google, no longer support OAuth1; however, it is still used, most notably by Twitter.

    Threats to OAuth:
        OAuth tokens are great at defending users against data breaches because, even if websites that use OAuth to log in are hacked, there are no passwords contained in databases. 
        Even if an attacker were to obtain the access tokens, the usually short-lived nature of the access tokens means an attacker would not be able to do much with them.

        However, OAuth is also vulnerable to a different sort of threat. Remember, OAuth both authorizes and authenticates - in the above example, Codecademy was authorized to only view the user’s private email address, but it could have asked for much more data.

        Let’s assume that an attacker sets up a malicious website, and tells a user that they must authenticate with OAuth through GitHub. 
        Instead of asking for just an email, the website asks for access to private repositories and secret gists. If the user isn’t paying attention, or has been socially engineered into believing that this access is required, they could grant access to the malicious application.

        If a user grants this access to the malicious application, the attacker would have access to all of the user’s private information on Github — without ever knowing their password! 
        This was the method successfully used by the hacking group Fancy Bear (also known as APT28 and Pawn Storm) to attack the Democratic National Convention in 2016.

        All methods of authorization have advantages and vulnerabilities and OAuth is no exception; however, it remains a generally secure and convenient way to authenticate yourself on trusted applications.
*/

// Installing oauth2-server
npm install oauth2 - server

// Instantiate the oauth2-server module and store it in a variable
const OAuth2Server = require('oauth2-server');

// Create an instance of the OAuth2Server object and store it in a variable
const oauth = new OAuth2Server();

// The OAuth2Server object requires a model object which contains functions to access, store, and validate our access tokens
// Inside the constructor of OAuth2Server, pass an object with an attribute named "model", which will get the mentioned functions assigned
const oauth = new OAuth2Server({
    model: require('./model.js')
});

// OAuth2Server can be supplied with additional options in the constructor, for example: To pass tokens inside the URL, we’ll set the allowBearerTokensInQueryString attribute to true:
const oauth = new OAuth2Server({
    model: require('./model.js'),
    allowBearerTokensInQueryString: true
})

// The access token lifetime can also be configured as an option using the accessTokenLifetime attribute. The lifetime is set in seconds, and we can set the access token lifetime to one hour like this:
const oauth = new OAuth2Server({
    model: require('./model.js'),
    allowBearerTokensInQueryString: true,
    accessTokenLifetime: 60 * 60
})

/*
    OAuth defines two types of clients — confidential clients and public clients:
        - Public clients are NOT able to store credentials securely and can only use grant types that do not use their client secret.

        - Confidential clients are applications that can be registered to an authorization server using credentials. 
        Those credentials, a client ID and a client secret, can be secured without exposing them to a third party. 
        They require a backend server to store the credentials. A client’s ability to securely store credentials determines which type of OAuth authorization flows should be used.

    We’ll be implementing the Client Credentials flow to obtain an access token for authentication. When a developer registers a client in an OAuth application, they’ll need:
        - A Client ID: a public identifier for apps that is unique across all clients and the authorization server.
        - A Client Secret: a secret key known only to the application and the authorization server.

    OAuth 2.0 is flexible in which databases to use, and the oauth2-server package implicitly allows Postgres, MongoDB, and Redis. For our example application, we use an in-memory database defined in db.js. 
    Inside db.js, we use modules.exports to create a module to hold our confidential client credentials and access tokens.
    We can register an application to the list of confidentialClients in db.js. Inside the module.exports object, we create an attribute named confidentialClients and set it equal to an array. 
    Within the array, we create an object with the clientId and clientSecret, and specify 'client_credentials' in our array of grant types.

    In our database, we’ll create a location to store access tokens. Within the module.exports object, we create another property named "tokens" and set it equal to an empty array.
*/

module.exports = {
    confidentialClients: [{
        clientId: 'secretapplication',
        clientSecret: 'topsecret',
        grants: [
            'client_credentials'
        ]
    }],

    tokens: []
}


/*
    getClient()
        OAuth2Server requires certain functions implemented in the model regardless of the authorization flow used. The getClient() function is an example of a required model function for all flows. 
        The function is used to retrieve a client using a Client ID and/or a Client Secret combination.
        The getClient() function takes two arguments: clientId and clientSecret. We must write a database query to match the provided arguments and its implementation will vary depending on the type of database used. 
        Since we are using JavaScript as our in-memory database, we can use the .filter() method to evaluate if the clientId and clientSecret match any confidential clients in db.js and return the matching client.
        The getClient() function returns the first found element in confidentialClients.
*/

const getClient = (clientId, clientSecret) => {
    let confidentialClients = db.confidentialClients.filter((client) => {
        return client.clientId === clientId && client.clientSecret === clientSecret
    });
    return confidentialClients[0];
}


// Finally, we export the function from model.js so that it can be used from other files. We can do this using module.exports object.
module.exports = {
    getClient: getClient
}


/*
    saveToken()
        The saveToken() function must be implemented for all grant types in the model used by OAuth2Server. This function stores the access token as an object to a database when an access token is obtained.
        The saveToken() function is implemented with three arguments: token, client, and user. We set the token.client equal an object in which the id attribute is equal to the passed client’s clientId. 
        The client is formatted like below:
*/
const saveToken = (token, client, user) => {
    token.client = {
        id: client.clientId
    }
}

// The token.user is set equal to an object with the username attribute. We set the username attribute equal to the username of the passed user object. The username is formatted like below:
token.user = {
    username: user.username
}

// With the token formatted, we can save the token to our database by pushing the token to our db.tokens array and returning the token.
db.tokens.push(token);
return token;

// Our final saveToken() function looks like:
const saveToken = (token, client, user) => {
    token.client = {
        id: client.clientId
    }
    token.user = {
        username: user.username
    }
    db.tokens.push(token);
    return token;
}

// We’ll also export the saveToken() function from models.js using module.exports (together with the getClient() function):
module.exports = {
    getClient: getClient,
    saveToken: saveToken
}




/*
    getUserFromClient()
        Certain grant types have specific functions that must be implemented for them to work. The Client Credentials grant type must have the getUserFromClient() function implemented to be used.
        The getUserFromClient() function is invoked to retrieve the user associated with the specified client. We are not using a user in our application so we can return an empty object. 
        However, leaving out this function declaration will throw an error when using the Client Credentials grant type!
*/
const getUserFromClient = (client) => {
    return {};
}

// Finally, we export the function from model.js so that it can be used from other files. We can do this using module.exports object.
module.exports = {
    getClient: getClient,
    saveToken: saveToken,
    getUserFromClient: getUserFromClient
}



// Obtaining Token Handler
/*
    Now that our model functions for generating and saving access tokens are implemented in model.js, we need to create a callback function to handle obtaining the access token whenever a URL is requested in our application. 
    Within app.js, we create a function named obtainToken() that takes the HTTP request and HTTP response as arguments—req and res
*/

// Inside obtainToken(), we create a new variable named request and set it to a new instance of OAuth2Server.Request(), passing the HTTP request, req, as the argument:
let request = new OAuth2Server.Request(req);

//We’ll also create a new variable named response and set it to a new instance of OAuth2Server.Response(), taking in res as the argument:
let response = new OAuth2Server.Response(res);

//  The .token() method of the oauth object returns the access token. The method passes the OAuth2Server‘s request and response stored in response and request variables. We use the .then() method to return a promise. 
//  If the token method is successful, we will send the access token back to the client using the .json() Express method:
const obtainToken = (req, res) => {
    let request = new OAuth2Server.Request(req);
    let response = new OAuth2Server.Response(res);

    return oauth.token(request, response)
        .then((token) => {
            res.json(token);
        })
        .catch((err) => {
            res.status(err.code || 500).json(err);
        });
}

// Note, must declare our function expressions before they can be used. To make use of our obtainToken() function, we can define a new route and pass obtainToken() as a callback function.
// We use the .all() method to handle all types of HTTP requests since we will eventually use a POST request on the route. The route name can be anything we’d like—we’ll use /auth for our example.
app.all('/auth', obtainToken);
// Now the client can make an HTTP request with the Client Secret to /auth and receive an access token.


//  getAccessToken()
/*  Now that we’ve written the code to obtain an access token, we can use it to restrict access to content unless a user is authenticated with a valid access token.
    Inside model.js, we implement the getAccessToken() function to retrieve existing tokens that were previously saved when the saveToken() function is invoked.
    The getAccessToken() function is required when the .authenticate() method is used on an OAuth2Server instance. getAccessToken() is declared with one parameter—accessToken.
    When the function is invoked the accessToken is checked against the tokens stored inside the db.js to see if there is a match.
    We can use JavaScript’s .filter() method to each token in the database against the access token that is passed.
    If there is a match, the access token can be returned. The resulting getAccessToken() will look something like this:
*/
const getAccessToken = (accessToken) => {
    let tokens = db.tokens.filter((savedToken) => {
        return savedToken.accessToken === accessToken;
    })
    return tokens[0];
}

/*
    In the above example code, the getAccessToken() function expression is called with an access token as an argument. 
    The .filter() method is used to check each token saved in the tokens array in the database to match the access token passed to the function. Finally, we return the matching access token from the array.
    We export the function from model.js so that it can be used from other files. We can do this using module.exports object.
*/
module.exports = {
    getClient: getClient,
    saveToken: saveToken,
    getUserFromClient: getUserFromClient,
    getAccessToken: getAccessToken
}


// Authentication Middleware
/*
    With the model function for checking access tokens implemented, let’s create a middleware function to handle authenticating access tokens inside our application. 
    Inside app.js, we will create a function named authenticateRequest() that takes three arguments: req, res, next.
    Inside the function, we create a new variable named request and set it to a new instance of OAuth2Server.Request(), taking in the HTTP request, req, as the argument.
*/
let request = new OAuth2Server.Request(req);

//  We’ll create a new variable named response and set it to a new instance of OAuth2Server.Response(), passing in the HTTP response, res.
let response = new OAuth2Server.response(res);

/*
    We then return .authenticate() method, that is provided by the OAuth2Server object, on oauth, passing in response and request. 
    The method returns a Promise that resolves to the access token object returned from the .getAccessToken() method we defined in model.js. 
    We’ll use a promise chain to handle the flow.

    We use the .then() method, and if the access token is valid, we can call the next() function to call the next function. 
    We’ll chain the .catch() method to handle an error or if the access token is invalid. 
    Inside .catch() method, we can send a response back to the client using the .send() method.
*/
const authenticateRequest = (req, res, next) => {

    let request = new OAuth2Server.Request(req);
    let response = new OAuth2Server.Response(res);

    return oauth.authenticate(request, response)
        .then(() => {
            next();
        })
        .catch((err) => {
            res.send(err);
        })
}

/*  Finally, we can add authenticateRequest as a middleware function to a route to restrict access. 
    Now the client must include the bearer token in the header when making a request to the route to gain authenticated access.*/
app.get('/secret', authenticateRequest, function (req, res) {
    res.send("Welcome to the secret area!");
});


// Testing Endpoints with HTTP
// The handling of access tokens is done with HTTP requests. We can make an HTTP POST request to the /auth route to obtain an access token.
POST http://localhost:4001/auth
Content - Type: application / x - www - form - urlencoded
Authorization: Basic Y29kZWNhZGVteTpjb2RlY0BkZW15
grant_type = client_credentials

//  Code via CURL
/*  CURL (Client URL) is a command-line tool used to transfer data to or from a server using various protocols, including HTTP, HTTPS, FTP, and more.
    It is widely used for testing APIs, downloading files, and performing network requests.*/
curl--request POST \
--url http://localhost:4001/auth \
--header 'authorization: Basic Y29kZWNhZGVteTpjb2RlY0BkZW15' \
--header 'content-type: application/x-www-form-urlencoded' \
--data grant_type = client_credentials

/*
    Explanation:
    request POST: Specifies the HTTP method as POST.
    url http://localhost:4001/auth: Specifies the URL to send the request to.
    header 'authorization: Basic Y29kZWNhZGVteTpjb2RlY0BkZW15': Sets the Authorization header with the base64-encoded client ID and secret.
    header 'content-type: application/x-www-form-urlencoded': Sets the Content-Type header.
    data grant_type=client_credentials: Specifies the form data to be sent in the request body.
*/

//  The server will respond with an access token that looks like this:
{
    "accessToken": " " < access token > ",
    "accessTokenExpiresAt": "2021-06-17T01:02:37.272Z",
    "client": {
        "id": "codecademy",
        "user": { }
    }
}
// Example output:
{
    "accessToken": "3e701b0c3c71997e5b4bb78ef7b594e93b385d39",
    "accessTokenExpiresAt": "2024-09-20T07:18:52.529Z", 
    "client": { 
        "id": "codecademy", 
        "user": { }
    }
}

// To use the access token while requesting authenticated content, we pass the bearer token in the Authentication request header, replacing <Access Token> with the token returned from the request to /auth like so:
GET http://localhost:4001/secret
Authorization: Bearer < Access Token >

// Code via CURL:
curl --request GET \
--url http://localhost:4001/secret \
--header 'authorization: Bearer 3e701b0c3c71997e5b4bb78ef7b594e93b385d39'

// Result:
Output: "Welcome to the secret area."

// If a CURL command would be done without token then:
Output: "Your are not allowed."