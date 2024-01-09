/*
    CORS (cross-origin resource sharing):
    A request for a resource (like an image or a font) outside of the origin is known as a cross-origin request. CORS (cross-origin resource sharing) manages cross-origin requests.
    The CORS standard is needed because it allows servers to specify not only who can access the assets, but also how they can be accessed.
    Cross-origin requests are made using the standard HTTP request methods. Most servers will allow GET requests, meaning they will allow resources from external origins (say, a web page) to read their assets. 
    HTTP requests methods like PATCH, PUT, or DELETE, however, may be denied to prevent malicious behavior. For many servers, this is intentional. For example, it is likely that server A does not want servers B, C, or D to edit or delete its assets.
    With CORS, a server can specify who can access its assets and which HTTP request methods are allowed from external resources.
    You can think of these interactions as a building with a security entrance. For example, if you need to borrow a ladder, you could ask a neighbor in the building who has one. 
    The building’s security would likely not have a problem with this request (i.e., same-origin). If you needed a particular tool, however, and you ordered it from an outside source like an online marketplace (i.e., cross-origin), the security at the entrance may request that the delivery person provide identification when your tool arrives.

    How does CORS manage requests from external resources?
        An HTTP header is a piece of information associated with a request or a response. Headers are passed back and forth between your web browser (also referred to as a client) and a server when the web page you are on wants to use resources hosted on a different server. 
        Headers are used to describe requests and responses. The CORS standard manages cross-origin requests by adding new HTTP headers to the standard list of headers.
        The following are the new HTTP headers added by the CORS standard:
            Access-Control-Allow-Origin
            Access-Control-Allow-Credentials
            Access-Control-Allow-Headers
            Access-Control-Allow-Methods
            Access-Control-Expose-Headers
            Access-Control-Max-Age
            Access-Control-Request-Headers
            Access-Control-Request-Method
            Origin
        These are all important, but let’s focus on the following header: Access-Control-Allow-Origin
            The Access-Control-Allow-Origin header allows servers to specify how their resources are shared with external domains. When a GET request is made to access a resource on Server A, Server A will respond with a value for the Access-Control-Allow-Origin header. 
            Many times, this value will be *, meaning that Server A will share the requested resources with any domain on the Internet. 
            Other times, the value of this header may be set to a particular domain (or list of domains), meaning that Server A will share its resources with that specific domain (or list of domains). The Access-Control-Allow-Origin header is critical to resource security.

    Pre-flight Requests
        As mentioned before, most servers will allow GET requests but may block requests to modify resources on the server. Servers don’t just blindly block such requests though; they have a process in place that first checks and then communicates to the client (your web browser) which requests are allowed.

        When a request is made using any of the following HTTP request methods, a standard preflight request will be made before the original request.

        PUT
        DELETE
        CONNECT
        OPTIONS
        TRACE
        PATCH
        Preflight requests use the OPTIONS header. The preflight request is sent before the original request, hence the term “preflight.” The purpose of the preflight request is to determine whether or not the original request is safe (for example, a DELETE request). 
        The server will respond to the preflight request and indicate whether or not the original request is safe. If the server specifies that the original request is safe, it will allow the original request. Otherwise, it will block the original request.

        The request methods above aren’t the only thing that will trigger a preflight request. If any of the headers that are automatically set by your browser (i.e., user agent) are modified, that will also trigger a preflight request.
*/


/*  
    Install CORS:
    $ npm install cors
*/

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/hello/:id', function (req, res, next) {
    res.json({ msg: 'Hello world, we are CORS-enabled!' });
});

app.listen(80, function () {
    console.log('CORS-enabled web server is listening on port 80');
});
