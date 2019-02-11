// Require
const http = require('http');
const url = require('url');
const fs = require('fs');

// Constants
const PORT = 8080;

// Routes
server = http.createServer();
fs.readFile('./index.html', 'utf-8', (err, html) => {
    server.on('request', (req, res) => {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        var page = html.replace('*|var|*', url.parse(req.url, true).query.name);
        res.end(page);
    });
});

server.listen(PORT, () => {
    console.log(`Node server created on port ${PORT}`);
});

