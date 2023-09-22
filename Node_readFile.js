const fs = require('fs');
let fileData = null;

const callbackFunc = (error, data) => {
  if (error){
    console.log('Error: Something went wrong');
  }
  else {
    console.log('Success: The content is: ' + data);
  }
}

fileData = fs.readFile('./finalFile.txt', 'UTF-8', callbackFunc);

console.log(fileData);
