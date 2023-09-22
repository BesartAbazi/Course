The http.createServer() method returns an instance of an http.server.
An http.server has a method .listen() which causes the server to “listen” for incoming connections.
When we run http.createServer() we pass in a custom callback function (often referred to as the requestListener).
This callback function will be triggered once the server is listening and receives a request.

Let’s break down how the requestListener callback function works:

The function expects two arguments: a request object and a response object.
Each time a request to the server is made, Node will invoke the provided requestListener callback function, passing in the request and response objects of the incoming request.
Request and response objects come with a number of properties and methods of their own, and within the requestListener function, we can access information about the request via the request object passed in.
The requestListener is responsible for setting the response header and body.
The requestListener must signal that the interaction is complete by calling the response.end() method.




const fs = require('fs');

module.exports.requestListener = (req, res) => {
  fs.readFile('./myWebsite.html',  'utf-8', (err, data) => {
    if (err){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(`${err}`);
      res.end();
    } 
    else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end(); 
    }
  })
}


const http = require('http');
let {requestListener} = require('./callbackFile.js');
const PORT = process.env.PORT || 4001;

const server = http.createServer(requestListener);

server.listen(PORT);
