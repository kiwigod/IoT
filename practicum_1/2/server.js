// Require
const mqtt = require('mqtt');

// Constants
const prefix = generateId();
const client = mqtt.connect('mqtt://broker.mqttdashboard.com');
const client2 = mqtt.connect('mqtt://broker.mqttdashboard.com');

client.on('connect', () => {
//    client.subscribe('number');
    client.subscribe(prefix + 'weather');
    client2.subscribe(prefix + 'weather');
});

client.on('message', (topic, message) => {
    console.log("Client received the following message:\n" + message.toString());
});

client2.on('message', (topic, message) => {
    console.log("Client 2 received the following message:\n" + message.toString());
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
    client.publish(prefix + 'weather', JSON.stringify(weather));
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
}, 3000);

