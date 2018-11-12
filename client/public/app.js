"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {

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

    var Header = function (_React$Component) {
        _inherits(Header, _React$Component);

        function Header() {
            _classCallCheck(this, Header);

            return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
        }

        _createClass(Header, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "h3",
                        null,
                        "Hello Stranger"
                    ),
                    React.createElement(
                        "h4",
                        null,
                        "Welcome to Vinicius\xB4s chat"
                    )
                );
            }
        }]);

        return Header;
    }(React.Component);

    var InitialForm = function (_React$Component2) {
        _inherits(InitialForm, _React$Component2);

        function InitialForm(props) {
            _classCallCheck(this, InitialForm);

            var _this2 = _possibleConstructorReturn(this, (InitialForm.__proto__ || Object.getPrototypeOf(InitialForm)).call(this, props));

            _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
            return _this2;
        }

        _createClass(InitialForm, [{
            key: "handleSubmit",
            value: function handleSubmit(event) {
                event.preventDefault();
                var username = document.getElementById('username-field').value;
                username && this.props.setUsername(username);
            }
        }, {
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "form",
                        { onSubmit: this.handleSubmit },
                        React.createElement(
                            "strong",
                            null,
                            "Username: ",
                            this.props.currentUsername
                        ),
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", id: "username-field", size: "20",
                            placeholder: this.props.currentUsername,
                            disabled: this.props.changedUsername
                        }),
                        React.createElement(
                            "button",
                            { type: "submit", disabled: this.props.changedUsername },
                            "Manda saporra"
                        )
                    )
                );
            }
        }]);

        return InitialForm;
    }(React.Component);

    var Message = function (_React$Component3) {
        _inherits(Message, _React$Component3);

        function Message() {
            _classCallCheck(this, Message);

            return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
        }

        _createClass(Message, [{
            key: "render",
            value: function render() {
                var classes = "bg-gray message " + (this.props.fromMe ? 'alignRight' : 'alignLeft');
                return React.createElement(
                    "div",
                    { className: classes },
                    !this.props.fromMe && React.createElement(MessageHeader, { username: this.props.username }),
                    React.createElement(
                        "div",
                        { className: "columns" },
                        React.createElement(
                            "div",
                            { className: "column col-12" },
                            this.props.body
                        )
                    )
                );
            }
        }]);

        return Message;
    }(React.Component);

    var MessageHeader = function (_React$Component4) {
        _inherits(MessageHeader, _React$Component4);

        function MessageHeader() {
            _classCallCheck(this, MessageHeader);

            return _possibleConstructorReturn(this, (MessageHeader.__proto__ || Object.getPrototypeOf(MessageHeader)).apply(this, arguments));
        }

        _createClass(MessageHeader, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    "div",
                    { className: "columns" },
                    React.createElement(
                        "div",
                        { className: "column col-12" },
                        React.createElement(
                            "strong",
                            null,
                            this.props.username
                        )
                    )
                );
            }
        }]);

        return MessageHeader;
    }(React.Component);

    var MessagesContainer = function (_React$Component5) {
        _inherits(MessagesContainer, _React$Component5);

        function MessagesContainer() {
            _classCallCheck(this, MessagesContainer);

            return _possibleConstructorReturn(this, (MessagesContainer.__proto__ || Object.getPrototypeOf(MessagesContainer)).apply(this, arguments));
        }

        _createClass(MessagesContainer, [{
            key: "render",
            value: function render() {
                var _this6 = this;

                return React.createElement(
                    "div",
                    { id: "messages-container" },
                    this.props.messages.map(function (message) {
                        return React.createElement(Message, {
                            key: Math.random(),
                            username: message.username,
                            body: message.body,
                            fromMe: _this6.props.currentUsername === message.username
                        });
                    })
                );
            }
        }]);

        return MessagesContainer;
    }(React.Component);

    var MessageForm = function (_React$Component6) {
        _inherits(MessageForm, _React$Component6);

        function MessageForm(props) {
            _classCallCheck(this, MessageForm);

            var _this7 = _possibleConstructorReturn(this, (MessageForm.__proto__ || Object.getPrototypeOf(MessageForm)).call(this, props));

            _this7.sendMessage = _this7.sendMessage.bind(_this7);
            return _this7;
        }

        _createClass(MessageForm, [{
            key: "sendMessage",
            value: function sendMessage(event) {
                event.preventDefault();
                var message = document.getElementById('message-input').value;
                message && this.props.addMessage({ body: message, username: this.props.username });
                document.getElementById('message-input').value = '';
            }
        }, {
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "form",
                        { onSubmit: this.sendMessage },
                        React.createElement("input", { type: "text", id: "message-input" }),
                        React.createElement(
                            "button",
                            { type: "submit" },
                            "Send Message"
                        )
                    )
                );
            }
        }]);

        return MessageForm;
    }(React.Component);

    var App = function (_React$Component7) {
        _inherits(App, _React$Component7);

        function App(props) {
            _classCallCheck(this, App);

            var _this8 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this8.state = {
                messages: [{ username: "Vinicius", body: "qualquer coisa" }, { username: "Driele", body: "outra coisa" }],
                username: 'Stranger',
                changedUsername: false
            };
            _this8.setUsername = _this8.setUsername.bind(_this8);
            _this8.addMessage = _this8.addMessage.bind(_this8);
            return _this8;
        }

        _createClass(App, [{
            key: "setUsername",
            value: function setUsername(newUsername) {
                this.setState(function () {
                    return {
                        username: newUsername,
                        changedUsername: true
                    };
                });
            }
        }, {
            key: "addMessage",
            value: function addMessage(newMessage) {
                this.setState(function (oldState) {
                    return {
                        messages: [].concat(_toConsumableArray(oldState.messages), [newMessage])
                    };
                });
            }
        }, {
            key: "render",
            value: function render() {
                var _this9 = this;

                // just to play around
                window.sendMessage = function (username, body) {
                    _this9.addMessage({ username: username, body: body });
                };

                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(Header, null),
                    React.createElement(InitialForm, {
                        setUsername: this.setUsername,
                        currentUsername: this.state.username,
                        changedUsername: this.state.changedUsername
                    }),
                    React.createElement(MessagesContainer, { messages: this.state.messages, currentUsername: this.state.username }),
                    React.createElement(MessageForm, { addMessage: this.addMessage, username: this.state.username })
                );
            }
        }]);

        return App;
    }(React.Component);

    ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
})();
