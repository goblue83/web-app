const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

var ws = new WebSocketServer({server});
var messages = [];
ws.on('connection', function (ws) {
  alert('connection made');
});
messages.forEach(function(message){
    ws.send(message);
});
ws.on('message', function (message) {
    messages.push(message);
    console.log('Message Received: %s', message);
    ws.clients.forEach(function (conn) {
      conn.send(message);
    });
});
