#!/usr/bin/node

const http = require('http');
const url = require('url');
const Client = require('azure-iothub').Client;

const PORT = 8080;
const AUTH = 'me0w';
const connectionString = 'HostName=gmdelftiotpracticum.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=TIJxaNj/GJkVuJavJDv5RcH9bEbWye0jDURSp3yVp3w=';
const azureServer = Client.fromConnectionString(connectionString);

var dataset = [
    {
        'id': '0',
        'naam': 'yeet',
        'description': 'yoink',
        'child': [{
            'id': '0.0',
            'naam': 'teey',
            'description': 'yoink kid',
            'child': [{
                'id': '0.0.0',
                'naam': 'MEOW',
                'description': 'donkey'
            }]
        }]
    }
];
dataset[1] = {'id': '1', 'naam': 'meow', 'description': 'YEEEEEEEe'};
var alarm = false;

server = http.createServer();
server.on('request', (req, res) => {
    var route = url.parse(req.url, true);
    console.log(route, req.method);
    if (req.headers.authorization !== AUTH) {
        return res.end('Invalid Authorization');
    }
    if (req.method === 'GET' && route.pathname === '/all') {
        listAllDevices(res);
    }
    else if (req.method === 'GET' && route.pathname === '/get') {
        listDevicePerId(res, route.query.id);
    }
    else if (req.method === 'POST' && route.pathname === '/add') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            addDevice(res, JSON.parse(body));
        });
    }
    else if (req.method === 'PUT' && route.pathname === '/edit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            editDevice(res, JSON.parse(body));
        });
    }
    else if (req.method === 'DELETE' && route.pathname === '/del') {
        deleteDevice(res, route.query.id);
    }
    else if (req.method === 'GET' && route.pathname === '/alarm') {
        controlAlarm(res);
    }
});

function listAllDevices(res) {
    res.end(JSON.stringify(dataset));
}

function listDevicePerId(res, id) {
    dataset.some((device) => {
        if (device.id == id) {
            return res.end(JSON.stringify(device));
        }
        if (device.hasOwnProperty('child')) {
            return resolveNesting(res, device.child, id);
        }
    });
}

function resolveNesting(res, devices, id, returnBool=false) {
    return devices.some((device) => {
        if (device.id == id) {
            return returnBool ? true : res.end(JSON.stringify(device));
        }
        if (device.hasOwnProperty('child')) {
            return resolveNesting(res, device.child, id, returnBool);
        }
    });
}

function addDevice(res, body) {
    if (resolveNesting(res, dataset, body.id, true)) {
        return res.end('Device with id already exists');
    }
    else {
        dataset.push(body);
        res.end('Added device!');
        console.log(dataset);
    }
}

function editDevice(res, body) {
    dataset.forEach((device) => {
        if (device.id == body.id) {
            for (const key in body) {
                device[key] = body[key];
            }
            res.end('Device updated');
        }
        if (device.hasOwnProperty('child')) {
            editNested(res, device.child, body);
        }
    });
    console.log(dataset);
}

function editNested(res, device, body) {
    device.forEach((device) => {
        if (device.id == body.id) {
            for (const key in body) {
                device[key] = body[key];
            }
            res.end('Device updated');
        }
        if (device.hasOwnProperty('child')) {
            editNested(res, device.child, body);
        }
    });
}

function deleteDevice(res, id) {
    dataset = dataset.filter((device) => {
        // if (device.id == id) {
        //     res.end('Device deleted!');
        //     return false;
        // }
        while(true) {
            if (device.id == id) {
                res.end('Device deleted!');
                return false;
            }
            if (!device.hasOwnProperty('child')) {
                break;
            }
            device = device.child;
        }
        res.end('Device could not be found');
        return true;
    });
    console.log(dataset);
}

function controlAlarm(res) {
    azureServer.invokeDeviceMethod('device-studentB-5-device-1', {methodName: (alarm ? 'DisableAlarm' : 'EnableAlarm')}, (err, result) => {
        if (err) {
            console.log('Failed to execute method: ' + err.message);
        } else {
            console.log('Response: ' + JSON.stringify(result));
            res.end(result.payload);
            alarm = !alarm;
        }
    });
}

server.listen(PORT, () => {
    console.log(`Node server created on port ${PORT}`);
});

