const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const passport = require('./config/passport'); // Assuming passport is configured

// Middleware and routes setup
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Load SSL certificates
const privateKey = fs.readFileSync('path/to/private.key', 'utf8');
const certificate = fs.readFileSync('path/to/certificate.crt', 'utf8');
const ca = fs.readFileSync('path/to/ca_bundle.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: ca };

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});