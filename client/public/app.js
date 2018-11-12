'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
    var socket = new WebSocket('ws://localhost:8081');

    socket.addEventListener('open', function () {
        console.log('connection open');
    });

    var Header = function Header() {
        return React.createElement(
            React.Fragment,
            null,
            React.createElement(
                'h3',
                null,
                'Hello Stranger'
            ),
            React.createElement(
                'h4',
                null,
                'Welcome to Vinicius\xB4s chat'
            )
        );
    };

    var InitialForm = function (_React$Component) {
        _inherits(InitialForm, _React$Component);

        function InitialForm(props) {
            _classCallCheck(this, InitialForm);

            var _this = _possibleConstructorReturn(this, (InitialForm.__proto__ || Object.getPrototypeOf(InitialForm)).call(this, props));

            _this.handleSubmit = _this.handleSubmit.bind(_this);
            return _this;
        }

        _createClass(InitialForm, [{
            key: 'handleSubmit',
            value: function handleSubmit(event) {
                event.preventDefault();
                var username = document.getElementById('username-field').value;
                username && this.props.setUsername(username);
            }
        }, {
            key: 'render',
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        'form',
                        { onSubmit: this.handleSubmit },
                        React.createElement(
                            'strong',
                            null,
                            'Username: ',
                            this.props.currentUsername
                        ),
                        React.createElement('br', null),
                        React.createElement('input', { type: 'text', id: 'username-field', size: '20',
                            placeholder: this.props.currentUsername,
                            disabled: this.props.changedUsername
                        }),
                        React.createElement(
                            'button',
                            { type: 'submit', disabled: this.props.changedUsername },
                            'Manda saporra'
                        )
                    )
                );
            }
        }]);

        return InitialForm;
    }(React.Component);

    var MessageHeader = function MessageHeader(_ref) {
        var username = _ref.username;
        return React.createElement(
            'div',
            { className: 'columns' },
            React.createElement(
                'div',
                { className: 'column col-12' },
                React.createElement(
                    'strong',
                    null,
                    username
                )
            )
        );
    };

    var Message = function Message(_ref2) {
        var username = _ref2.username,
            body = _ref2.body,
            fromMe = _ref2.fromMe;

        var classes = 'bg-gray message ' + (fromMe ? 'alignRight' : 'alignLeft');
        return React.createElement(
            'div',
            { className: classes },
            !fromMe && React.createElement(MessageHeader, { username: username }),
            React.createElement(
                'div',
                { className: 'columns' },
                React.createElement(
                    'div',
                    { className: 'column col-12' },
                    body
                )
            )
        );
    };

    var MessagesContainer = function MessagesContainer(_ref3) {
        var messages = _ref3.messages,
            currentUsername = _ref3.currentUsername;
        return React.createElement(
            'div',
            { id: 'messages-container' },
            messages.map(function (message) {
                return React.createElement(Message, {
                    key: Math.random(),
                    username: message.username,
                    body: message.body,
                    fromMe: currentUsername === message.username
                });
            })
        );
    };

    var MessageForm = function (_React$Component2) {
        _inherits(MessageForm, _React$Component2);

        function MessageForm(props) {
            _classCallCheck(this, MessageForm);

            var _this2 = _possibleConstructorReturn(this, (MessageForm.__proto__ || Object.getPrototypeOf(MessageForm)).call(this, props));

            _this2.sendMessage = _this2.sendMessage.bind(_this2);
            return _this2;
        }

        _createClass(MessageForm, [{
            key: 'sendMessage',
            value: function sendMessage(event) {
                event.preventDefault();
                var message = document.getElementById('message-input').value;
                message && this.props.addMessage({ body: message, username: this.props.username });
                document.getElementById('message-input').value = '';
            }
        }, {
            key: 'render',
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        'form',
                        { onSubmit: this.sendMessage },
                        React.createElement('input', { type: 'text', id: 'message-input' }),
                        React.createElement(
                            'button',
                            { type: 'submit' },
                            'Send Message'
                        )
                    )
                );
            }
        }]);

        return MessageForm;
    }(React.Component);

    var App = function (_React$Component3) {
        _inherits(App, _React$Component3);

        function App(props) {
            _classCallCheck(this, App);

            var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this3.state = {
                messages: [{ username: "Vinicius", body: "qualquer coisa" }, { username: "Driele", body: "outra coisa" }],
                username: 'Stranger',
                changedUsername: false
            };
            _this3.setUsername = _this3.setUsername.bind(_this3);
            _this3.addMessage = _this3.addMessage.bind(_this3);
            _this3.sendMessage = _this3.sendMessage.bind(_this3);

            socket.addEventListener('message', function (event) {
                var _JSON$parse = JSON.parse(event.data),
                    user = _JSON$parse.user,
                    message = _JSON$parse.message;

                _this3.addMessage({ username: user, body: message });
            });
            return _this3;
        }

        _createClass(App, [{
            key: 'setUsername',
            value: function setUsername(newUsername) {
                this.setState(function () {
                    return {
                        username: newUsername,
                        changedUsername: true
                    };
                });
            }
        }, {
            key: 'addMessage',
            value: function addMessage(newMessage) {
                this.setState(function (oldState) {
                    return {
                        messages: [].concat(_toConsumableArray(oldState.messages), [newMessage])
                    };
                });
            }
        }, {
            key: 'sendMessage',
            value: function sendMessage(newMessage) {
                var user = newMessage.username;
                var message = newMessage.body;
                socket.send(JSON.stringify({ user: user, message: message }));
            }
        }, {
            key: 'render',
            value: function render() {
                var _this4 = this;

                // just to play around
                window.sendMessage = function (username, body) {
                    _this4.addMessage({ username: username, body: body });
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
                    React.createElement(MessageForm, { addMessage: this.sendMessage, username: this.state.username })
                );
            }
        }]);

        return App;
    }(React.Component);

    ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
})();
