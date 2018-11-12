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

    const Header = () => (
        <React.Fragment> 
            <h3>Hello Stranger</h3>
            <h4>Welcome to Vinicius´s chat</h4>
        </React.Fragment>
    );

    class InitialForm extends React.Component {
        constructor (props) {
            super(props);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleSubmit (event) {
            event.preventDefault();
            const username = document.getElementById('username-field').value;
            username && this.props.setUsername(username);
        }
        render () {
            return (
                <React.Fragment>
                    <form onSubmit={this.handleSubmit}>
                        <strong>Username: {this.props.currentUsername}</strong>
                        <br/>
                        <input type="text" id="username-field" size="20" 
                            placeholder={this.props.currentUsername} 
                            disabled={this.props.changedUsername}
                        />
                        <button type="submit" disabled={this.props.changedUsername}>Manda saporra</button>
                    </form>
                </React.Fragment>
            );
        }
    }

    const MessageHeader = ({username}) => (
        <div className="columns">
            <div className="column col-12">
                <strong>{username}</strong>
            </div>
        </div>
    );

    const Message = ({username, body, fromMe}) => {
        const classes = `bg-gray message ${fromMe ? 'alignRight' : 'alignLeft'}`;
        return (
            <div className={classes}>
                {
                    !fromMe && <MessageHeader username={username}/>
                }
                
                <div className="columns">
                    <div className="column col-12">{body}</div>
                </div>
            </div>
        );
    };


    const MessagesContainer = ({messages, currentUsername}) => (
        <div id="messages-container">
            {
                messages.map((message) => 
                    <Message 
                        key={Math.random()} 
                        username={message.username} 
                        body={message.body} 
                        fromMe={currentUsername === message.username}
                    />
                )
            }
        </div>
    );

    class MessageForm extends React.Component {
        constructor (props) {
            super(props);
            this.sendMessage = this.sendMessage.bind(this);
        }
        
        sendMessage (event) {
            event.preventDefault();
            const message = document.getElementById('message-input').value;
            message && this.props.addMessage({body: message, username: this.props.username});
            document.getElementById('message-input').value = '';
        }

        render () {
            return (
                <React.Fragment>
                    <form onSubmit={this.sendMessage}>
                        <input type="text" id="message-input" />
                        <button type="submit">Send Message</button>
                    </form>
                </React.Fragment>
            );
        }
    }

    class App extends React.Component {
        constructor (props) {
            super(props);
            this.state = {
                messages: [
                    { username: "Vinicius", body: "qualquer coisa"}, 
                    { username: "Driele", body: "outra coisa"}, 
                ],
                username: 'Stranger',
                changedUsername: false
            }
            this.setUsername = this.setUsername.bind(this);
            this.addMessage = this.addMessage.bind(this);
        }

        setUsername (newUsername) {
            this.setState(() => {
                return {
                    username: newUsername,
                    changedUsername: true
                };
            });
        }


        addMessage (newMessage) {
            this.setState(oldState => {
                return {
                    messages: [...oldState.messages, newMessage]
                };
            });
        }

        render () {
            // just to play around
            window.sendMessage = (username, body) => {
                this.addMessage({username, body});
            };

            return (
                <React.Fragment>
                    <Header/>
                    <InitialForm 
                        setUsername={this.setUsername} 
                        currentUsername={this.state.username} 
                        changedUsername={this.state.changedUsername} 
                    />
                    <MessagesContainer messages={this.state.messages} currentUsername={this.state.username}/>
                    <MessageForm addMessage={this.addMessage} username={this.state.username} />
                </React.Fragment>
            );
        }
    }

    ReactDOM.render(<App/>, document.getElementById('app'));
})();