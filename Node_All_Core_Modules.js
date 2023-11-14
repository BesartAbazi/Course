list of core modules can be accessed by typing the command:
require('module').builtinModules

Global modules: Global modules do not need to be imported


global module 'process':
	Global process with useful methods and information about the current process.
	Access to information about the Node.js runtime environment
	
	process.env: property is an object which stores and controls information about the environment in which the process is currently running
	process.memoryUsage():			returns information on the CPU demands of the current process
	process.memoryUsage().heapUsed:	method will return a number representing how many bytes of memory the current process is using
	process.argv:					property holds an array of command line values provided when the current process was initiated.The first element in the array is the absolute path to Node, which ran the process. 
									The second element in the array is the path to the file that’s running. 
									The following elements will be any command line arguments provided when the process was initiated
	

module 'os':
	Provides methods to retrieve information about the computer, operating system, and network interfaces
	
	os.type() — to return the computer’s operating system.
	os.arch() — to return the operating system CPU architecture.
	os.networkInterfaces() — to return information about the network interfaces of the computer, such as IP and MAC address.
	os.homedir() — to return the current user’s home directory.
	os.hostname() — to return the hostname of the operating system.
	os.uptime() — to return the system uptime, in seconds.
	
module 'util':
	Contains methods used to maintain and debug your code.
	
	util.promisify(<func>):	turn function into a promise
	util.types.isDate():	checks for Date objects and returns a boolean value
	
	
module 'events':
	EventEmitter class (events.EventEmitter()):
	Each event emitter instance has an .on() method which assigns a listener callback function to a named event. 
		.on():		The .on() method takes as its first argument the name of the event as a string and, as its second argument, the listener callback function.
		.emit():	Each event emitter instance also has an .emit() method which announces a named event has occurred. The .emit() method takes as its first argument the name of the event as a string and, as its second argument, the data that should be passed into the listener callback function.
		
		
global module 'error':
	Async: 
	Many asynchronous Node APIs use error-first callback functions—callback functions which have an error as the first expected argument and the data as the second argument. 
	If the asynchronous task results in an error, it will be passed in as the first argument to the callback function. 
	If no error was thrown, the first argument will be undefined
	
		// api.js
		errorProneAsyncApi: (input, callback) => {
			console.log(`Running errorProneAsyncApi with input: ${input}...\n`)
			setTimeout(() => {
				let myErr;
				if (input === 'problematic input') {
					myErr = new Error('whoops')
					callback(myErr)
				} else {
					let responseData = `Received valid input "${input}"`
					callback(myErr, responseData)
				}
			}, 0)
		}
		
		//app.js
		const api = require('./api.js');
		
		// An error-first callback
		let errorFirstCallback = (err, data) => {
			if (err) {
				console.log(`Something went wrong. ${err}\n`);
			} else {
				console.log(`Something went right. Data: ${data}\n`);
			}
		};
		
		api.errorProneAsyncApi('problematic input', errorFirstCallback)
	
	
global module 'Buffer':
	In Node.js, the Buffer module is used to handle binary data.
	The Buffer module provides a variety of methods to handle the binary data such as .alloc(), .toString(), .from(), and .concat()
	
	.alloc()	Creates a new Buffer object with the size specified as the first parameter. .alloc() accepts three arguments
				Size:		Required. The size of the buffer
				Fill:		Optional. A value to fill the buffer with. Default is 0.
				Encoding:	Optional. Default is UTF-8.
				
				const buffer = Buffer.alloc(5);
				console.log(buffer); // Ouput: [0, 0, 0, 0, 0]
				
	.toString()	Translates the Buffer object into a human-readable string. It accepts three optional arguments
				Encoding:	Default is UTF-8.
				Start:		The byte offset to begin translating in the Buffer object. Default is 0.
				End:		The byte offset to end translating in the Buffer object. Default is the length of the buffer. The start and end of the buffer are similar to the start and end of an array, where the first element is 0 and increments upwards.
				
				const buffer = Buffer.alloc(5, 'a');
				console.log(buffer.toString()); // Output: aaaaa

	.from()		Create a new Buffer object from the specified string, array, or buffer. The method accepts two arguments
				Object:		Required. An object to fill the buffer with.
				Encoding:	Optional. Default is UTF-8.
				
				const buffer = Buffer.from('hello');
				console.log(buffer); // Output: [104, 101, 108, 108, 111]
	.concat()	Join all buffer objects passed in an array into one Buffer object. .concat() comes in handy because a Buffer object can’t be resized. This method accepts two arguments.
				Array: Required. An array containing Buffer objects.
				Length: Optional. Specifies the length of the concatenated buffer.
				
				const buffer1 = Buffer.from('hello'); // Output: [104, 101, 108, 108, 111]
				const buffer2 = Buffer.from('world'); // Output:[119, 111, 114, 108, 100]
				const array = [buffer1, buffer2];
				const bufferConcat = Buffer.concat(array);

				console.log(bufferConcat); // Output: [104, 101, 108, 108, 111, 119, 111, 114, 108, 100]

			
module 'fs':
	Core module is an API for interacting with the file system.
	The fs module has a synchronous version and an asynchronous version
	
	.readFile():	Method which reads data from a provided file
	
		const fs = require('fs');
		
		let readDataCallback = (err, data) => {
			if (err) {
				console.log(`Something went wrong: ${err}`);
			} else {
				console.log(`Provided file contained: ${data}`);
			}
		};
		
		// asynchronous
		fs.readFile('./file.txt', 'utf-8', readDataCallback);
	
	.createWriteStream():	Writeable stream to a file using the createWriteStream()
		
		// Example 1: Write into a file
		const fs = require('fs')

		const fileStream = fs.createWriteStream('output.txt');

		fileStream.write('This is the first line!'); 
		fileStream.write('This is the second line!');
		fileStream.end();
		
		// Example 2: Read from one file and write into another file
		const readline = require('readline');
		const fs = require('fs');

		// Read
		const myInterface = readline.createInterface({
			input: fs.createReadStream('shoppingList.txt')
		});

		
		// Write
		const fileStream = fs.createWriteStream('shoppingResults.txt');

		const transformData = (line) => {
			fileStream.write(`They were out of: ${line}\n`);
		}

		myInterface.on('line', transformData);
		
		
module 'readline':
	Streaming data is often preferable since you don’t need enough RAM to process all the data at once nor do you need to have all the data on hand to begin processing it.
	One of the simplest uses of streams is reading and writing to files line-by-line
	To read files line-by-line, we can use the .createInterface()
	createInterface() returns an EventEmitter set up to emit 'line' events
	
		const readline = require('readline');
		const fs = require('fs');

		const myInterface = readline.createInterface({
			input: fs.createReadStream('./shoppingList.txt')
		});

		const printData = (data) => {
			console.log(`Item: ${data}`);
		}

		myInterface.on('line', printData); // Event 'line' will lead to reading the file content line by line -> See all events: https://nodejs.org/api/readline.html
	
	
global module 'timer':
	There are times when we want some of our code to be executed at a specified point in time.
	Timer functions in Node.js behave similarly to how they work in front-end JavaScript programs, but the difference is that they are added to the Node.js event loop.
	
	.setImmediate()	Executes the specified callback function after the current (poll phase) is completed
		setImmediate(() => {
		  console.log('I got called right away!')
		})