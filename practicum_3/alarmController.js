#!/usr/bin/node

const Mqtt = require('azure-iot-device-mqtt').Mqtt;
const DeviceClient = require('azure-iot-device').Client
const Message = require('azure-iot-device').Message;

const alarmString = 'HostName=gmdelftiotpracticum.azure-devices.net;DeviceId=device-studentB-5-device-1;SharedAccessKey=HLmXSol/8R8DmKKtnvgU4/N9+hU+62/q781RxnyhwwI=';
const client = DeviceClient.fromConnectionString(alarmString, Mqtt);

function enableAlarm(req, res) {
    res.send(200, 'Alarm is about to yeet');
    console.log('Alarm does many yeets');

    client.sendEvent({isYeeting: true}, (err) => {
        if (err) {
            console.log('Alarm failed to send his yeets');
        } else {
            console.log('Alarm sends many yeets');
        }
    });
}

function disableAlarm(req, res) {
    res.send(200, 'Alarm is clapped gg');
    console.log('Alarm has done too many yeets and been yoinked because of that');

    client.sendEvent({isYeeting: false}, (err) => {
        if (err) {
            console.log('Alarm has been yoinked too quickly...');
        } else {
            console.log('Alarm\'s yeet days are over...');
        }
    });
}

client.onDeviceMethod('EnableAlarm', enableAlarm);
client.onDeviceMethod('DisableAlarm', disableAlarm);
