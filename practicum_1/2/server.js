// Require
const mqtt = require('mqtt');

// Constants
const PORT = 8080;
const client = mqtt.connect('mqtt://broker.mqttdashboard.com');
const client2 = mqtt.connect('mqtt://broker.mqttdashboard.com');

client.on('connect', () => {
//    client.subscribe('number');
    client.subscribe('weather');
    client2.subscribe('weather');
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
        'city' : 'Deflt',
        'temp' : Math.floor((Math.random() * 30) + 1)
    };
    client.publish('weather', JSON.stringify(weather));
}

setInterval(() => {
    publishWeather();
}, 3000);

