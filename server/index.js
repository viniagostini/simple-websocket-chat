const WebSocket = require('ws');

const ws = new WebSocket.Server({port:8080});

ws.on('connection', (socket, req) => {
    socket.on('message', message => {
        const ip = req.connection.remoteAddress;
        console.log(`From ${ip} -> ` + JSON.stringify(message));
        broadcast(message);
    });
});

const broadcast = (message) => {
    ws.clients.forEach(client => {
        client.send(message);
    });
}