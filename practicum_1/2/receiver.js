const mqtt = require('mqtt');

const channel = 'weather';
const client = mqtt.connect('mqtt://broker.mqttdashboard.com');
const clientHeighest = mqtt.connect('mqtt://broker.mqttdashboard.com');

client.on('connect', () => {
    client.subscribe(channel);
});

clientHeighest.on('connect', () => {
    clientHeighest.subscribe(channel + '-heighest');
});

client.on('message', (topic, message) => {
    console.log('Client received the following message: ' + message);
});

clientHeighest.on('message', (topic, message) => {
    console.log('Client received following heighest value: ' + message);
});

