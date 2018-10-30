(() => { 
    

    // <h3>Come to zap</h3>
    // <h4>Better than chat uol</h4>
    // <br>
    // <br>
    // <div>
    //     <strong>Username</strong> 
    //     <input type="text" id="username-field" size="20" placeholder="add your username">
    // </div>

    // <ul id="messages"></ul>
    
    // <form id="message-form">
    //     <input type="text" id="message-field" placeholder="type here" size="40">
    //     <button type="submit" class="btn btn-primary">send</button>
    // </form>

    // const socket = new WebSocket('ws://localhost:8080');
    
    // socket.addEventListener('open', () => {
    //     console.log('connection open');
    // });
     
    // socket.addEventListener('message', event => {
    //     const {message, user} = JSON.parse(event.data);
    //     addMessage(message, user);
    // });

    // const addMessage = (message, user) => {
    //     const ul = document.getElementById("messages");
    //     const li = document.createElement("li");
    //     li.appendChild(document.createTextNode(`${user}: ${message}`));
    //     ul.appendChild(li);
        
    //     ul.scrollTop = ul.scrollHeight;
    // };

    // const sendMessage = (message, user) => {
    //     socket.send(JSON.stringify({user, message}));
    // }


    // document.getElementById("message-form").addEventListener("submit", function(e){
    //     e.preventDefault();    //stop form from submitting
    //     console.log(e);
    //     const messageField = document.getElementById('message-field');

    //     const username = document.getElementById('username-field').value;
    //     const message = messageField.value;
        
    //     sendMessage(message, username);

    //     messageField.value = '';
    // });

    class Header extends React.Component {
        render () {
            return (
                <React.Fragment> 
                    <h3>Welcome to Vinicius´s chat</h3>
                    <h4>Better than chat uol</h4>
                </React.Fragment>
            );
        }
    }

    class InitialForm extends React.Component {
        render () {
            return (
                <React.Fragment>
                    <strong>Username</strong> 
                    <input type="text" id="username-field" size="20" placeholder="add your username"/>
                </React.Fragment>
            );
        }
    }

    class Message extends React.Component {
        render () {
            return (
                <li>{`${this.props.username}: ${this.props.body}`}</li>
            );
        }
    }

    class MessagesContainer extends React.Component {
        render () {
            return (
                <ul id="messages-container">
                    {
                        this.props.messages.map((message) => 
                            <Message key={message.body} username={message.username} body={message.body}/>)
                    }
                </ul>
            );
        }
    }

    let messages = [
        { username: "Vinicius", body: "qualquer coisa"}, 
        { username: "Matheus", body: "outra coisa"}, 
    ];

    class App extends React.Component {
        constructor (props) {
            super(props);
        }

        render () {
            const date = new Date();

            window.addMessage = () => {
                messages.push({
                    username: "Vinicius", body: "qualquer coisa2" + date.getMilliseconds()
                });
                rerender();
            }

            return (
                <React.Fragment>
                    <Header/>
                    <InitialForm/>
                    <MessagesContainer messages={messages}/>
                </React.Fragment>
            );
        }
    }

    function rerender () {
        const template = <App/>
        const appRoot = document.getElementById('app');
        ReactDOM.render(template, appRoot);
    }

    rerender();
})();