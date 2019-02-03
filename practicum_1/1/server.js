// Require
const http = require('http');
const url = require('url');
const ejs = require('ejs');

// Constants
const PORT = 8080;

// Routes
server = http.createServer();
server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    ejs.renderFile(__dirname + '/index.ejs',
        {name: url.parse(req.url, true).query.name},
        (err, result) => {
            if (err) {
                res.end('An error occured');
                console.log(err);
            }
            res.end(result);
        }
    );
    res.end();
});

server.listen(PORT, () => {
    console.log(`Node server created on port ${PORT}`);
});

