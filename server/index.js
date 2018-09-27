const WebSocket = require('ws');

const ws = new WebSocket.Server({port:8080});

ws.on('connection', socket => {
    socket.on('message', message => {
        broadcast(message);
        console.log(JSON.stringify(message));
    });

    console.log("connection opened");
});

const broadcast = (message) => {
    ws.clients.forEach(client => {
        client.send(message);
    });
}