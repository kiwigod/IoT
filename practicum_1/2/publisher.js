const mqtt = require('mqtt');

const channel = 'weather';
const publisher = mqtt.connect('mqtt://broker.mqttdashboard.com');
const intervalPublisher = mqtt.connect('mqtt://broker.mqttdashboard.com');

var interval = 2000;
var heighestTemp = -1;
var time = 0;

function publishMessage(channel, msg) {
    console.log('Publishing message to chanel: ' + channel);
    publisher.publish(channel, msg);
}

publisher.on('connect', () => {
    publisher.subscribe(channel + '-interval');
});

publisher.on('message', (topic, message) => {
    console.log('set interval to ' + message);
    interval = parseInt(message);
});

setInterval(() => {
    intervalPublisher.publish(channel + '-interval', Math.floor((Math.random() * 3000) + 500).toString());
}, 5000);

setInterval(() => {
    var msg = {
        'city' : 'Delft',
        'temp' : Math.floor((Math.random() * 30) + 1)
    };
    publishMessage(channel, JSON.stringify(msg));
    if (time >= 20) {
        publishMessage(channel + '-heighest', msg.temp.toString());
        time = 0;
        heighestTemp = -1;
    }
}, interval);

setInterval(() => {
    time++;
}, 1000);

