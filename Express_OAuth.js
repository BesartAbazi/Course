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
    
    Authorization Code Grant:
        The Authorization Code Grant is the most widely used grant for publicly available applications. This was the grant type we showed earlier in this article. 
        To use this grant type, the webserver must have the capability to store client credentials securely.
        This approach uses browser redirection to communicate between the resource server and the authorization server. The client will obtain an authorization code and then exchange it for an access token.

    Proof Key for Code Exchange (PKCE):
        PKCE is an extension to the Authorization Code flow, and it is used to prevent attacks and to securely perform the OAuth exchange from public clients. 
        This extension helps prevent authorization code injection from malicious actors.

    Implicit Grant - Deprecated (Veraltet)
        The Implicit Grant is similar to the authorization code grant except in the case of single-page applications that cannot store client credentials. In this case, the authorization server will return an access token directly. The Implicit flow is deprecated, but might still be seen in legacy code. It has been replaced by the PKCE extension.

    Device Code Grant
        The Device Code Grant is used for devices that have no browser and/or have limited input capability to input an access token. Some examples of this might be smart TV apps.

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

// OAuth2Server can be supplied with additional options in the constructor. To pass tokens inside the URL, we’ll set the allowBearerTokensInQueryString attribute to true:
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