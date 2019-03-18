// Require
const mqtt = require('mqtt');

// Constants
const channel = generateId() + '-' + 'weather';
const client = mqtt.connect('mqtt://broker.mqttdashboard.com');
const client2 = mqtt.connect('mqtt://broker.mqttdashboard.com');
const client3 = mqtt.connect('mqtt://broker.mqttdashboard.com');

// Global vars
var highestTemp = -1;
var seconds_up = 0;

client.on('connect', () => {
//    client.subscribe('number');
    client.subscribe(channel);
    client2.subscribe(channel);
    client3.subscribe(channel + 'highest');
});

client.on('message', (topic, message) => {
    console.log("Client received the following message:\n" + message.toString());
});

client2.on('message', (topic, message) => {
    var json_msg = JSON.parse(message);
    if (json_msg['temp'] > highestTemp) highestTemp = json_msg['temp'];
    console.log("Client 2 received the following message:\n" + message.toString());
});

client3.on('message', (topic, message) => {
    console.log("Client 3 received the following heighest value: " + message);
});

function publishRandomNumber() {
//    console.log('Publishing random number');
    client.publish('number', Math.random().toString());
}

function publishWeather() {
    var weather = {
        'city' : 'Delft',
        'temp' : Math.floor((Math.random() * 30) + 1)
    };
    client.publish(channel, JSON.stringify(weather));
    if (seconds_up >= 20) {
        client3.publish(channel + 'highest', highestTemp.toString());
        highestTemp = -1;
        seconds_up = 0;
    }
}

function generateId() {
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        id += possible.charAt(Math.floor(Math.random() * possible.length));

    return id;
}

setInterval(() => {
    publishWeather();
}, Math.floor((Math.random() * 3000) + 500));

setInterval(() => {
    seconds_up += 1;
}, 1000);
