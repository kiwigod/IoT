// Require
const http = require('http');
const url = require('url');
const fs = require('fs');

// Constants
const PORT = 8080;

// Datasets
var cars = require('./cars.json');

// Routes
server = http.createServer();
server.on('request', (req, res) => {
    var route = url.parse(req.url, true);
    console.log(req.url, route);
    switch(route.pathname) {
        case '/':
            home(req, res, route.query.name);
            break;
        case '/cars':
            if (!isEmpty(route.query)) applyFilterOnDataset(route.query, cars, res);
            else res.end(JSON.stringify(cars));
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

function applyFilterOnDataset(filters, data, res) {
    let json_res = [];
    for (var prop in filters) {
        for (var i in data) {
            if (data[i]['engine'] === filters[prop])
                json_res.push(data[i]);
        }
    }
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.end(JSON.stringify(json_res));
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

server.listen(PORT, () => {
    console.log(`Node server created on port ${PORT}`);
});

