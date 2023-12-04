const express = require('express');
const app = express();

//app.listen() call will start a server listening on port 4001, and once the server is started it will log 'Server is listening on port 4001'.
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});