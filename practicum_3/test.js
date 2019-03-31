#!/usr/bin/node

const http = require('http');

var options = {
    host: 'localhost',
    port: 8080,
    path: '',
    method: '',
    headers: {
        Authorization: 'me0w'
    }
}

/**
 * Tests whether the expected device is returned
 * @test
 */
options.path = '/get?id=0.0.0';
options.method = 'GET';
http.get(options, (res) => {
    var data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(data);
    });
});

/**
 * Tests wether a device is successfully added
 * @test
 */
var data = JSON.stringify({
    id: 'yoink',
    name: 'empty',
    description: 'this device empty YEET'
});
options.path = '/add';
options.method = 'POST';
options.headers['Content-Type'] = 'application/json';
options.headers['Content-Length'] = data.length;
var req = http.request(options, (res) => {
    var data = '';

    res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(data);
      });
});
req.write(data);
req.end();
