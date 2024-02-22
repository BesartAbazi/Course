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