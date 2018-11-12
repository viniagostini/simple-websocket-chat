(() => { 
    const socket = new WebSocket('ws://localhost:8081');
    
    socket.addEventListener('open', () => {
        console.log('connection open');
    });

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
            this.sendMessage = this.sendMessage.bind(this);

            socket.addEventListener('message', event => {
                const {user, message} = JSON.parse(event.data);
                this.addMessage({username: user, body: message});
            });
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

        sendMessage (newMessage) {
            const user = newMessage.username;
            const message = newMessage.body;
            socket.send(JSON.stringify({user, message}));
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
                    <MessageForm addMessage={this.sendMessage} username={this.state.username} />
                </React.Fragment>
            );
        }
    }

    ReactDOM.render(<App/>, document.getElementById('app'));
})();