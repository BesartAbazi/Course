A callback function (commonly used for asynchronous code) is an argument to the function in which we implement error handling.
The purpose of a callback function is to check the errors before the result of the primary function is used. 
The callback is usually the final argument to the primary function, and it executes when an error or outcome of the operation emerges.


const errorProneAsyncApi = (input, callbackFunc) => {
    console.log(`Running errorProneAsyncApi with input: ${input}...\n`)
    setTimeout(() => {
      let myErr;
      if (input === 'problematic input') {
        myErr = new Error('whoops')
        callbackFunc(myErr)
      } else {
        let responseData = `Received valid input "${input}"`
        callbackFunc(myErr, responseData)
      }
    }, 0)
  }
  
  
  let errorFirstCallback = (err, data) => {
	  if (err) {
		console.log(`Something went wrong. ${err}\n`);
	  } else {
		console.log(`Something went right. Data: ${data}\n`);
	  }
	};


api.errorProneAsyncApi('problematic input', errorFirstCallback);
