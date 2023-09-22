In traditional imperative programming, we give the computer a series of instructions to execute in a pre-defined order. 
In contrast, when we write web applications, we often need to write logic to handle situations without knowing exactly when they’ll occur. 
For example, when programming a website, we might provide functionality for a click event without knowing when a user will trigger it. 
When Node was created, it applied this same concept of event-driven principles to the back-end environment.
Node provides an EventEmitter class which we can access by requiring in the events core module:


let events = require('events');

const myEmitter = new events.EventEmitter();

myEmitter.on('celebrate', (data) => {console.log('Celebrate ' + data);}
);

myEmitter.emit('celebrate', 'birthday');