"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
                        "Welcome to Vinicius\xB4s chat"
                    ),
                    React.createElement(
                        "h4",
                        null,
                        "Better than chat uol"
                    )
                );
            }
        }]);

        return Header;
    }(React.Component);

    var InitialForm = function (_React$Component2) {
        _inherits(InitialForm, _React$Component2);

        function InitialForm() {
            _classCallCheck(this, InitialForm);

            return _possibleConstructorReturn(this, (InitialForm.__proto__ || Object.getPrototypeOf(InitialForm)).apply(this, arguments));
        }

        _createClass(InitialForm, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "strong",
                        null,
                        "Username"
                    ),
                    React.createElement("input", { type: "text", id: "username-field", size: "20", placeholder: "add your username" })
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
                return React.createElement(
                    "li",
                    null,
                    this.props.username + ": " + this.props.body
                );
            }
        }]);

        return Message;
    }(React.Component);

    var MessagesContainer = function (_React$Component4) {
        _inherits(MessagesContainer, _React$Component4);

        function MessagesContainer() {
            _classCallCheck(this, MessagesContainer);

            return _possibleConstructorReturn(this, (MessagesContainer.__proto__ || Object.getPrototypeOf(MessagesContainer)).apply(this, arguments));
        }

        _createClass(MessagesContainer, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    "ul",
                    { id: "messages-container" },
                    this.props.messages.map(function (message) {
                        return React.createElement(Message, { key: message.body, username: message.username, body: message.body });
                    })
                );
            }
        }]);

        return MessagesContainer;
    }(React.Component);

    var messages = [{ username: "Vinicius", body: "qualquer coisa" }, { username: "Matheus", body: "outra coisa" }];

    var App = function (_React$Component5) {
        _inherits(App, _React$Component5);

        function App(props) {
            _classCallCheck(this, App);

            return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
        }

        _createClass(App, [{
            key: "render",
            value: function render() {
                var date = new Date();

                window.addMessage = function () {
                    messages.push({
                        username: "Vinicius", body: "qualquer coisa2" + date.getMilliseconds()
                    });
                    rerender();
                };

                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(Header, null),
                    React.createElement(InitialForm, null),
                    React.createElement(MessagesContainer, { messages: messages })
                );
            }
        }]);

        return App;
    }(React.Component);

    function rerender() {
        var template = React.createElement(App, null);
        var appRoot = document.getElementById('app');
        ReactDOM.render(template, appRoot);
    }

    rerender();
})();
