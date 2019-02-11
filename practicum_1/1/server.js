// Require
const http = require('http');
const url = require('url');
const fs = require('fs');

// Constants
const PORT = 8080;

// Routes
server = http.createServer();
server.on('request', (req, res) => {
    var route = url.parse(req.url, true);
    console.log(req.url, route);
    switch(route.pathname) {
        case '/':
            home(req, res, route.query.name);
            break;
        default:
            home(req, res, route.query.name);
            break;
    }
});

function home(req, res, name) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    fs.readFile('./index.html', 'utf-8', (err, html) => {
        if(err) {
            res.end(err);
        }
        html = html.replace('*|var|*', name);
        res.end(html);
    });
}

server.listen(PORT, () => {
    console.log(`Node server created on port ${PORT}`);
});

