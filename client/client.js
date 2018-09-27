(() => {
    const socket = new WebSocket('ws://localhost:8080');
    
    socket.addEventListener('open', () => {
        console.log('connection open');
    });
     
    socket.addEventListener('message', event => {
        const {message, user} = JSON.parse(event.data);
        addMessage(message, user);
    });

    const addMessage = (message, user) => {
        const ul = document.getElementById("messages");
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(`${user}: ${message}`));
        ul.appendChild(li);        
    };

    const sendMessage = (message, user) => {
        socket.send(JSON.stringify({user, message}));
    }

    window.sendMessage = sendMessage;

})();