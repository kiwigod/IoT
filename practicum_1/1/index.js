// Require
const http = require('http');

// Constants
const PORT = 8080;

// Routes
http.createServer((req, res) => {
    res.write(`${req.url}\n`);
    res.end();
}).listen(PORT);

