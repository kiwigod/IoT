// Require
const mqtt = require('mqtt');

// Constants
const PORT = 8080;
const client = mqtt.connect('mqtt://broker.mqttdashboard.com');

client.on('connect', () => {
    client.subscribe('number');
});

client.on('message', (topic, message) => {
    console.log("Client received the following message:\n" + message.toString());
});

function publishRandomNumber() {
//    console.log('Publishing random number');
    client.publish('number', Math.random().toString());
}

setInterval(() => {
    publishRandomNumber();
}, 3000);

