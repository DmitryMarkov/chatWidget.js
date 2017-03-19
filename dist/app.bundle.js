/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';')
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(17).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-undef */

var storeService = exports.storeService = {
  getItem: function getItem(key) {
    return localStorage.getItem(key) || '';
  },
  setItem: function setItem(key, string) {
    localStorage.setItem(key, string);
  },

  remove: function remove(key) {
    localStorage.removeItem(key);
  },

  getJSON: function getJSON(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  },
  setJSON: function setJSON(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (messages) {// iterate messages
;(function(){
  var $$obj = messages;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["chat__message",message.my ? 'chat__message-my' : ''], [false,true]), false, true)) + "\u003E\u003Cdiv\u003E" + (pug.escape(null == (pug_interp = message.text) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"message__time float-right\"\u003E" + (pug.escape(null == (pug_interp = message.date) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["chat__message",message.my ? 'chat__message-my' : ''], [false,true]), false, true)) + "\u003E\u003Cdiv\u003E" + (pug.escape(null == (pug_interp = message.text) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"message__time float-right\"\u003E" + (pug.escape(null == (pug_interp = message.date) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);
}.call(this,"messages" in locals_for_with?locals_for_with.messages:typeof messages!=="undefined"?messages:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _main = __webpack_require__(16);

var _main2 = _interopRequireDefault(_main);

var _chatButton = __webpack_require__(5);

var _chatButton2 = _interopRequireDefault(_chatButton);

var _loginForm = __webpack_require__(7);

var _loginForm2 = _interopRequireDefault(_loginForm);

var _messageList = __webpack_require__(9);

var _messageList2 = _interopRequireDefault(_messageList);

var _messageForm = __webpack_require__(8);

var _messageForm2 = _interopRequireDefault(_messageForm);

var _messageService = __webpack_require__(12);

var _messageService2 = _interopRequireDefault(_messageService);

var _audioService = __webpack_require__(10);

var _audioService2 = _interopRequireDefault(_audioService);

var _botikService = __webpack_require__(11);

var _botikService2 = _interopRequireDefault(_botikService);

var _chatBot = __webpack_require__(4);

var _chatBot2 = _interopRequireDefault(_chatBot);

var _storeService = __webpack_require__(1);

var _customEvents = __webpack_require__(6);

var _customEvents2 = _interopRequireDefault(_customEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = function () {
  function Chat(_ref) {
    var _this = this;

    var el = _ref.el,
        buttonEl = _ref.buttonEl,
        isOpenedOnStart = _ref.isOpenedOnStart;

    _classCallCheck(this, Chat);

    this.el = document.querySelector(el);
    this.buttonEl = document.querySelector(buttonEl);
    this.isOpenedOnStart = isOpenedOnStart;

    this._initServices();
    this.userName = _storeService.storeService.getItem('chatWidgetName');

    this.messageService.getMessageList().then(function (res) {
      _this.messages = res; // || []
      _this.render();
      _this._initComponents();
      if (!_this.userName) {
        _this.el.appendChild(_this.loginForm.el);
      }

      _this._initEvents();
    });
  }

  _createClass(Chat, [{
    key: 'render',
    value: function render() {
      this.el.innerHTML = (0, _main2.default)({
        messages: this.messages,
        username: this.userName
      });
      if (!this.isOpenedOnStart) {
        this._onToggle();
      }
    }
  }, {
    key: '_initServices',
    value: function _initServices() {
      this.messageService = new _messageService2.default({
        baseUrl: 'https://components-1601-1930.firebaseio.com/chat/messages.json'
      });
      this.audioService = new _audioService2.default();
      this.botikService = new _botikService2.default();
    }
  }, {
    key: '_initComponents',
    value: function _initComponents() {
      this.chatButton = new _chatButton2.default({
        el: document.createElement('div'),
        parentEl: this.buttonEl,
        isOpenedOnStart: this.isOpenedOnStart,
        EventMixin: _customEvents2.default
      });

      // maybe we should not create instance if already logged in
      this.loginForm = new _loginForm2.default({
        el: document.createElement('div'),
        EventMixin: _customEvents2.default
      });
      this.messageForm = new _messageForm2.default({
        el: this.el.querySelector('.chat__form'),
        EventMixin: _customEvents2.default
      });
      this.messageList = new _messageList2.default({
        el: this.el.querySelector('.chat__body'),
        messages: this.messages,
        messageService: this.messageService
      });

      this.botik = new _chatBot2.default({
        audioService: this.audioService,
        messageList: this.messageList,
        botikService: this.botikService
      });
    }
  }, {
    key: '_initEvents',
    value: function _initEvents() {
      if (!this.userName) {
        this.el.querySelector('.chat__login-button').addEventListener('click', this.loginForm.toggleModal);
      }

      this.loginForm.on('login', this._onLogin.bind(this));

      this.messageForm.on('message', this._onMessage.bind(this));

      this.chatButton.on('toggle', this._onToggle.bind(this));
    }
  }, {
    key: '_onLogin',
    value: function _onLogin(e) {
      this.userName = e.detail.username;
      _storeService.storeService.setItem('chatWidgetName', this.userName);

      this.el.querySelector('.login-false').classList.toggle('hidden');
      this.el.querySelector('.login-true').classList.toggle('hidden');

      if (!this.messages.length && this.userName) {
        this.botik.answer('\u041F\u0440\u0438\u0432\u0435\u0442, ' + this.userName + '!');
      }
    }
  }, {
    key: '_onMessage',
    value: function _onMessage(e) {
      this.messageList.addMessage({
        text: e.detail.text,
        my: true
      });
      this.messageList.render();
      this.botik.answer();
      this.audioService.play('send_message');
    }
  }, {
    key: '_onToggle',
    value: function _onToggle() {
      this.el.classList.toggle('column-25');
      this.el.classList.toggle('column-0');
    }
  }]);

  return Chat;
}();

exports.default = Chat;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatBot = function () {
  function ChatBot(_ref) {
    var audioService = _ref.audioService,
        messageList = _ref.messageList,
        botikService = _ref.botikService;

    _classCallCheck(this, ChatBot);

    this.answers = botikService.getRandomMessages();
    this.messageList = messageList;
    this.audioService = audioService;
  }

  _createClass(ChatBot, [{
    key: 'answer',
    value: function answer(message) {
      var _this = this;

      setTimeout(function () {
        _this.messageList.addMessage({
          text: message || _this.answers[(0, _util.getRandomNumber)(_this.answers.length)],
          my: false
        });
        _this.messageList.render();
        _this.audioService.play('receive_message');
      }, 1500);
    }
  }]);

  return ChatBot;
}();

exports.default = ChatBot;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chatButton = __webpack_require__(14);

var _chatButton2 = _interopRequireDefault(_chatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatButton = function () {
  function ChatButton(_ref) {
    var el = _ref.el,
        parentEl = _ref.parentEl,
        _ref$isOpenedOnStart = _ref.isOpenedOnStart,
        isOpenedOnStart = _ref$isOpenedOnStart === undefined ? true : _ref$isOpenedOnStart,
        EventMixin = _ref.EventMixin;

    _classCallCheck(this, ChatButton);

    // adding on() and trigger() methods
    EventMixin.apply(this);

    this.el = el;
    this.el.classList.add('show__button');
    this.parentEl = parentEl;
    this.isOpenedOnStart = isOpenedOnStart;

    this.render();
    this.el.addEventListener('click', this.toggle.bind(this));
  }

  _createClass(ChatButton, [{
    key: 'render',
    value: function render() {
      this.el.innerHTML = (0, _chatButton2.default)();
      this.parentEl.appendChild(this.el);
      if (!this.isOpenedOnStart) {
        this._toggle(this.el.firstChild);
      }
    }
  }, {
    key: 'toggle',
    value: function toggle(e) {
      e.preventDefault();

      this._toggle(e.target.closest('[data-action]'));
      this.trigger('toggle');
    }
  }, {
    key: '_toggle',
    value: function _toggle(el) {
      el.firstChild.classList.toggle('fa-chevron-left');
      el.firstChild.classList.toggle('fa-chevron-right');
    }
  }]);

  return ChatButton;
}();

exports.default = ChatButton;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global CustomEvent */

function EventMixin() {
  this.on = function (name, cb) {
    this.el.addEventListener(name, cb);
  };
  this.trigger = function (name, data) {
    var event = new CustomEvent(name, { detail: data });
    this.el.dispatchEvent(event);
  };
}

exports.default = EventMixin;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _modal = __webpack_require__(15);

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginForm = function () {
  function LoginForm(_ref) {
    var el = _ref.el,
        EventMixin = _ref.EventMixin;

    _classCallCheck(this, LoginForm);

    // adding on() and trigger() methods
    EventMixin.apply(this);

    this.el = el;

    this.render();

    this.toggleModal = this.toggleModal.bind(this);

    this._initEvents();
  }

  _createClass(LoginForm, [{
    key: 'render',
    value: function render() {
      this.el.innerHTML = (0, _modal2.default)();

      this.chatModal = this.el.querySelector('.modal__chat');
      this.chatModalClose = this.el.querySelector('.modal__chat-close');
      this.chatModalSubmit = this.el.querySelector('.chat-login');
    }
  }, {
    key: 'toggleModal',
    value: function toggleModal(e) {
      e.preventDefault();

      this.chatModal.classList.toggle('not-visible');
    }
  }, {
    key: 'submitLoginForm',
    value: function submitLoginForm(e) {
      e.preventDefault();

      this.trigger('login', { username: e.target.name.value });
      this.toggleModal(e);
    }
  }, {
    key: '_initEvents',
    value: function _initEvents() {
      this.chatModalClose.addEventListener('click', this.toggleModal);
      this.chatModalSubmit.addEventListener('submit', this.submitLoginForm.bind(this));
    }
  }]);

  return LoginForm;
}();

exports.default = LoginForm;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageForm = function () {
  function MessageForm(_ref) {
    var el = _ref.el,
        EventMixin = _ref.EventMixin;

    _classCallCheck(this, MessageForm);

    // adding on() and trigger() methods
    EventMixin.apply(this);

    this.el = el;
    this.messageTextarea = this.el.querySelector('#message');
    this._initEvents();
  }

  _createClass(MessageForm, [{
    key: 'reset',
    value: function reset(e) {
      this.el.reset();
    }
  }, {
    key: 'submitMessageForm',
    value: function submitMessageForm(e) {
      if (e.charCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        if (e.target.value.trim()) {
          this.trigger('message', { text: e.target.value });
          this.reset(e);
        }
      }
    }
  }, {
    key: '_initEvents',
    value: function _initEvents() {
      this.messageTextarea.addEventListener('keypress', this.submitMessageForm.bind(this));
    }
  }]);

  return MessageForm;
}();

exports.default = MessageForm;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chatMessageList = __webpack_require__(2);

var _chatMessageList2 = _interopRequireDefault(_chatMessageList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageList = function () {
  function MessageList(_ref) {
    var el = _ref.el,
        messages = _ref.messages,
        messageService = _ref.messageService;

    _classCallCheck(this, MessageList);

    this.el = el;
    this.messageService = messageService;
    this.messages = messages;
  }

  _createClass(MessageList, [{
    key: 'render',
    value: function render() {
      this.el.innerHTML = (0, _chatMessageList2.default)({
        messages: this.messages
      });
    }

    //  getMessageList () {
    //    return this.messages
    //  }

  }, {
    key: 'addMessage',
    value: function addMessage(data) {
      this.messages.unshift({ // unshift is no good
        text: data.text,
        my: data.my || false,
        date: new Date().getHours() + ':' + new Date().getMinutes()
      });
      this.messageService.saveMessages(this.messages);
    }
  }]);

  return MessageList;
}();

exports.default = MessageList;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global Audio */
var AudioService = function () {
  function AudioService() {
    _classCallCheck(this, AudioService);

    this.sounds = {
      'receive_message': new Audio('./chat/assets/sounds/notification.mp3'),
      'send_message': new Audio('./chat/assets/sounds/sending.mp3')
    };
  }

  _createClass(AudioService, [{
    key: 'play',
    value: function play(sound) {
      this.sounds[sound].play();
    }
  }]);

  return AudioService;
}();

exports.default = AudioService;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BotikService = function () {
  function BotikService() {
    _classCallCheck(this, BotikService);

    this.name = 'BotikService';
  }

  _createClass(BotikService, [{
    key: 'getRandomMessages',
    value: function getRandomMessages() {
      return ['Расскажи мне что-нибудь', 'Мне скучно', 'О чем ты думаешь?', 'Хочешь поговорить об этом?', 'Как ты провел свой день?', 'У тебя есть планы на завтрашний денёк?', 'Тебе нравится погода за окошком?', 'Во сколько ты проснулся?', 'Я тоже', 'Ага', 'И тебе', 'Хмм, интересненько...'];
    }
  }]);

  return BotikService;
}();

exports.default = BotikService;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global fetch */


var _storeService = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageService = function () {
  function MessageService(_ref) {
    var baseUrl = _ref.baseUrl;

    _classCallCheck(this, MessageService);

    this.baseUrl = baseUrl;
  }

  _createClass(MessageService, [{
    key: '_request',
    value: function _request() {
      return fetch('chat/services/mockMessages.json').then(function (response) {
        return response.json();
      }).catch(function (err) {
        console.log(err);
        return _storeService.storeService.getJSON('chatHistory');
      });
    }
  }, {
    key: 'getMessageList',
    value: function getMessageList() {
      return this._request();
    }
  }, {
    key: 'saveMessages',
    value: function saveMessages(messages) {
      _storeService.storeService.setJSON('chatHistory', messages);
    }
  }]);

  return MessageService;
}();

exports.default = MessageService;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomNumber = getRandomNumber;
function getRandomNumber(max) {
  return Math.round(Math.random() * (max - 1));
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cbutton class=\"button button-black button__show-chat\" data-action=\"toggle\"\u003E\u003Ci class=\"fa fa-chevron-right\"\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"modal modal__chat not-visible\"\u003E\u003Cdiv class=\"modal__body\"\u003E\u003Cdiv class=\"modal__content\"\u003E\u003Cform class=\"chat-login\" name=\"chat-login\"\u003E\u003Cfieldset\u003E\u003Clabel for=\"name\"\u003EEnter yo name\u003C\u002Flabel\u003E\u003Cinput id=\"name\" type=\"text\" placeholder=\"name\" required autofocus\u003E\u003C\u002Ffieldset\u003E\u003Cbutton class=\"button-primary m-l-1 float-right\" type=\"submit\"\u003EEnter chat\u003C\u002Fbutton\u003E\u003Cbutton class=\"button-outline float-right modal__chat-close\" type=\"button\"\u003EClose\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (username) {pug_html = pug_html + "\u003Cdiv class=\"column-center chat__app\"\u003E\u003Cdiv" + (pug.attr("class", pug.classes(["login-false",username ? 'hidden' : ''], [false,true]), false, true)) + "\u003E\u003Cbutton class=\"button-primary chat__login-button\"\u003EJoin chat\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv" + (pug.attr("class", pug.classes(["login-true",!username ? 'hidden' : ''], [false,true]), false, true)) + "\u003E\u003Cdiv class=\"chat__header\"\u003E\u003Ci class=\"fa fa-user-circle-o header__avatar\"\u003E\u003C\u002Fi\u003E\u003Cp class=\"header__name\"\u003EChat with Botik\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__body\"\u003E" + (null == (pug_interp = __webpack_require__(2).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__footer\"\u003E\u003Cform class=\"chat__form\" name=\"chat__form\"\u003E\u003Ctextarea id=\"message\" placeholder=\"Enter message...\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"username" in locals_for_with?locals_for_with.username:typeof username!=="undefined"?username:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(3);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-new */
new _main2.default({
  el: '.chat',
  buttonEl: '.website', // element to append chat toogle button. Must be relative.
  isOpenedOnStart: true // default value: true
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjdkMWVkYzExNWY1MDJkODY5MDIiLCJ3ZWJwYWNrOi8vLy4vfi9wdWctcnVudGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L3NlcnZpY2VzL3N0b3JlU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L2NvbXBvbmVudHMvbWVzc2FnZS1saXN0L2NoYXQtbWVzc2FnZS1saXN0LnB1ZyIsIndlYnBhY2s6Ly8vLi9jaGF0L21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9jb21wb25lbnRzL2JvdGlrL2NoYXRCb3QuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9jb21wb25lbnRzL2NoYXQtYnV0dG9uL2NoYXRCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9jb21wb25lbnRzL2NvbW1vbi9jdXN0b21FdmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9jb21wb25lbnRzL2xvZ2luLWZvcm0vbG9naW5Gb3JtLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9tZXNzYWdlLWZvcm0vbWVzc2FnZUZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9tZXNzYWdlTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L3NlcnZpY2VzL2F1ZGlvU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L3NlcnZpY2VzL2JvdGlrU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L3NlcnZpY2VzL21lc3NhZ2VTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2NoYXQvdXRpbHMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L2NvbXBvbmVudHMvY2hhdC1idXR0b24vY2hhdC1idXR0b24ucHVnIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9sb2dpbi1mb3JtL21vZGFsLnB1ZyIsIndlYnBhY2s6Ly8vLi9jaGF0L21haW4ucHVnIiwid2VicGFjazovLy9mcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIl0sIm5hbWVzIjpbInN0b3JlU2VydmljZSIsImdldEl0ZW0iLCJrZXkiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwic3RyaW5nIiwicmVtb3ZlIiwicmVtb3ZlSXRlbSIsImdldEpTT04iLCJKU09OIiwicGFyc2UiLCJzZXRKU09OIiwib2JqIiwic3RyaW5naWZ5IiwiQ2hhdCIsImVsIiwiYnV0dG9uRWwiLCJpc09wZW5lZE9uU3RhcnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJfaW5pdFNlcnZpY2VzIiwidXNlck5hbWUiLCJtZXNzYWdlU2VydmljZSIsImdldE1lc3NhZ2VMaXN0IiwidGhlbiIsInJlcyIsIm1lc3NhZ2VzIiwicmVuZGVyIiwiX2luaXRDb21wb25lbnRzIiwiYXBwZW5kQ2hpbGQiLCJsb2dpbkZvcm0iLCJfaW5pdEV2ZW50cyIsImlubmVySFRNTCIsInVzZXJuYW1lIiwiX29uVG9nZ2xlIiwiYmFzZVVybCIsImF1ZGlvU2VydmljZSIsImJvdGlrU2VydmljZSIsImNoYXRCdXR0b24iLCJjcmVhdGVFbGVtZW50IiwicGFyZW50RWwiLCJFdmVudE1peGluIiwibWVzc2FnZUZvcm0iLCJtZXNzYWdlTGlzdCIsImJvdGlrIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRvZ2dsZU1vZGFsIiwib24iLCJfb25Mb2dpbiIsImJpbmQiLCJfb25NZXNzYWdlIiwiZSIsImRldGFpbCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImxlbmd0aCIsImFuc3dlciIsImFkZE1lc3NhZ2UiLCJ0ZXh0IiwibXkiLCJwbGF5IiwiQ2hhdEJvdCIsImFuc3dlcnMiLCJnZXRSYW5kb21NZXNzYWdlcyIsIm1lc3NhZ2UiLCJzZXRUaW1lb3V0IiwiQ2hhdEJ1dHRvbiIsImFwcGx5IiwiYWRkIiwiX3RvZ2dsZSIsImZpcnN0Q2hpbGQiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImNsb3Nlc3QiLCJ0cmlnZ2VyIiwibmFtZSIsImNiIiwiZGF0YSIsImV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiTG9naW5Gb3JtIiwiY2hhdE1vZGFsIiwiY2hhdE1vZGFsQ2xvc2UiLCJjaGF0TW9kYWxTdWJtaXQiLCJ2YWx1ZSIsInN1Ym1pdExvZ2luRm9ybSIsIk1lc3NhZ2VGb3JtIiwibWVzc2FnZVRleHRhcmVhIiwicmVzZXQiLCJjaGFyQ29kZSIsInNoaWZ0S2V5IiwidHJpbSIsInN1Ym1pdE1lc3NhZ2VGb3JtIiwiTWVzc2FnZUxpc3QiLCJ1bnNoaWZ0IiwiZGF0ZSIsIkRhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJzYXZlTWVzc2FnZXMiLCJBdWRpb1NlcnZpY2UiLCJzb3VuZHMiLCJBdWRpbyIsInNvdW5kIiwiQm90aWtTZXJ2aWNlIiwiTWVzc2FnZVNlcnZpY2UiLCJmZXRjaCIsInJlc3BvbnNlIiwianNvbiIsImNhdGNoIiwiZXJyIiwiY29uc29sZSIsImxvZyIsIl9yZXF1ZXN0IiwiZ2V0UmFuZG9tTnVtYmVyIiwibWF4IiwiTWF0aCIsInJvdW5kIiwicmFuZG9tIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNoRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xC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ckIsQ0FBUDtBQUNELE9BTEksQ0FBUDtBQU1EOzs7cUNBRWlCO0FBQ2hCLGFBQU8sS0FBSzBHLFFBQUwsRUFBUDtBQUNEOzs7aUNBRWF4RixRLEVBQVU7QUFDdEIsaUNBQWFmLE9BQWIsQ0FBcUIsYUFBckIsRUFBb0NlLFFBQXBDO0FBQ0Q7Ozs7OztrQkFHWWdGLGM7Ozs7Ozs7Ozs7OztRQzVCQ1MsZSxHQUFBQSxlO0FBQVQsU0FBU0EsZUFBVCxDQUEwQkMsR0FBMUIsRUFBK0I7QUFDcEMsU0FBT0MsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLE1BQWlCSCxNQUFNLENBQXZCLENBQVgsQ0FBUDtBQUNELEM7Ozs7OztBQ0ZEOztBQUVBLDJCQUEyQixrQ0FBa0MsYUFBYSx5TUFBeU07QUFDblIsMEI7Ozs7OztBQ0hBOztBQUVBLDJCQUEyQixrQ0FBa0MsYUFBYSxvdEJBQW90QjtBQUM5eEIsMEI7Ozs7OztBQ0hBOztBQUVBLDJCQUEyQixrQ0FBa0MsY0FBYyxtQ0FBbUMsRUFBRSxzQkFBc0IsNGlDQUFnbEMsc0hBQXNIO0FBQzUwQywwQjs7Ozs7O0FDSEEsZTs7Ozs7Ozs7O0FDQUE7Ozs7OztBQUVBO0FBQ0EsbUJBQVM7QUFDUHJHLE1BQUksT0FERztBQUVQQyxZQUFVLFVBRkgsRUFFZTtBQUN0QkMsbUJBQWlCLElBSFYsQ0FHZTtBQUhmLENBQVQsRSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDI3ZDFlZGMxMTVmNTAyZDg2OTAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVnX2hhc19vd25fcHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBwdWdfbWVyZ2U7XG5mdW5jdGlvbiBwdWdfbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IHB1Z19tZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSA9PT0gJ2NsYXNzJykge1xuICAgICAgdmFyIHZhbEEgPSBhW2tleV0gfHwgW107XG4gICAgICBhW2tleV0gPSAoQXJyYXkuaXNBcnJheSh2YWxBKSA/IHZhbEEgOiBbdmFsQV0pLmNvbmNhdChiW2tleV0gfHwgW10pO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICB2YXIgdmFsQSA9IHB1Z19zdHlsZShhW2tleV0pO1xuICAgICAgdmFyIHZhbEIgPSBwdWdfc3R5bGUoYltrZXldKTtcbiAgICAgIGFba2V5XSA9IHZhbEEgKyB2YWxCO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYXJyYXksIG9iamVjdCwgb3Igc3RyaW5nIGFzIGEgc3RyaW5nIG9mIGNsYXNzZXMgZGVsaW1pdGVkIGJ5IGEgc3BhY2UuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gYXJyYXksIGFsbCBtZW1iZXJzIG9mIGl0IGFuZCBpdHMgc3ViYXJyYXlzIGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBJZiBgZXNjYXBpbmdgIGlzIGFuIGFycmF5LCB0aGVuIHdoZXRoZXIgb3Igbm90IHRoZSBpdGVtIGluIGB2YWxgIGlzXG4gKiBlc2NhcGVkIGRlcGVuZHMgb24gdGhlIGNvcnJlc3BvbmRpbmcgaXRlbSBpbiBgZXNjYXBpbmdgLiBJZiBgZXNjYXBpbmdgIGlzXG4gKiBub3QgYW4gYXJyYXksIG5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gb2JqZWN0LCBhbGwgdGhlIGtleXMgd2hvc2UgdmFsdWUgaXMgdHJ1dGh5IGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBObyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIElmIGB2YWxgIGlzIGEgc3RyaW5nLCBpdCBpcyBjb3VudGVkIGFzIGEgY2xhc3MuIE5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogQHBhcmFtIHsoQXJyYXkuPHN0cmluZz58T2JqZWN0LjxzdHJpbmcsIGJvb2xlYW4+fHN0cmluZyl9IHZhbFxuICogQHBhcmFtIHs/QXJyYXkuPHN0cmluZz59IGVzY2FwaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xhc3NlcyA9IHB1Z19jbGFzc2VzO1xuZnVuY3Rpb24gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZykge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgY2xhc3NOYW1lLCBwYWRkaW5nID0gJycsIGVzY2FwZUVuYWJsZWQgPSBBcnJheS5pc0FycmF5KGVzY2FwaW5nKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICBjbGFzc05hbWUgPSBwdWdfY2xhc3Nlcyh2YWxbaV0pO1xuICAgIGlmICghY2xhc3NOYW1lKSBjb250aW51ZTtcbiAgICBlc2NhcGVFbmFibGVkICYmIGVzY2FwaW5nW2ldICYmIChjbGFzc05hbWUgPSBwdWdfZXNjYXBlKGNsYXNzTmFtZSkpO1xuICAgIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgKyBwYWRkaW5nICsgY2xhc3NOYW1lO1xuICAgIHBhZGRpbmcgPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNsYXNzU3RyaW5nO1xufVxuZnVuY3Rpb24gcHVnX2NsYXNzZXNfb2JqZWN0KHZhbCkge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgcGFkZGluZyA9ICcnO1xuICBmb3IgKHZhciBrZXkgaW4gdmFsKSB7XG4gICAgaWYgKGtleSAmJiB2YWxba2V5XSAmJiBwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwga2V5KSkge1xuICAgICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHBhZGRpbmcgKyBrZXk7XG4gICAgICBwYWRkaW5nID0gJyAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2xhc3NTdHJpbmc7XG59XG5mdW5jdGlvbiBwdWdfY2xhc3Nlcyh2YWwsIGVzY2FwaW5nKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICByZXR1cm4gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZyk7XG4gIH0gZWxzZSBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHB1Z19jbGFzc2VzX29iamVjdCh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWwgfHwgJyc7XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IG9iamVjdCBvciBzdHJpbmcgdG8gYSBzdHJpbmcgb2YgQ1NTIHN0eWxlcyBkZWxpbWl0ZWQgYnkgYSBzZW1pY29sb24uXG4gKlxuICogQHBhcmFtIHsoT2JqZWN0LjxzdHJpbmcsIHN0cmluZz58c3RyaW5nKX0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZXhwb3J0cy5zdHlsZSA9IHB1Z19zdHlsZTtcbmZ1bmN0aW9uIHB1Z19zdHlsZSh2YWwpIHtcbiAgaWYgKCF2YWwpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIHN0eWxlIGluIHZhbCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwgc3R5bGUpKSB7XG4gICAgICAgIG91dCA9IG91dCArIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXSArICc7JztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfSBlbHNlIHtcbiAgICB2YWwgKz0gJyc7XG4gICAgaWYgKHZhbFt2YWwubGVuZ3RoIC0gMV0gIT09ICc7JykgXG4gICAgICByZXR1cm4gdmFsICsgJzsnO1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IHB1Z19hdHRyO1xuZnVuY3Rpb24gcHVnX2F0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmICh2YWwgPT09IGZhbHNlIHx8IHZhbCA9PSBudWxsIHx8ICF2YWwgJiYgKGtleSA9PT0gJ2NsYXNzJyB8fCBrZXkgPT09ICdzdHlsZScpKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbC50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YWwgPSB2YWwudG9KU09OKCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICBpZiAoIWVzY2FwZWQgJiYgdmFsLmluZGV4T2YoJ1wiJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cXCcnICsgdmFsLnJlcGxhY2UoLycvZywgJyYjMzk7JykgKyAnXFwnJztcbiAgICB9XG4gIH1cbiAgaWYgKGVzY2FwZWQpIHZhbCA9IHB1Z19lc2NhcGUodmFsKTtcbiAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gdGVyc2Ugd2hldGhlciB0byB1c2UgSFRNTDUgdGVyc2UgYm9vbGVhbiBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBwdWdfYXR0cnM7XG5mdW5jdGlvbiBwdWdfYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBhdHRycyA9ICcnO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAocHVnX2hhc19vd25fcHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfY2xhc3Nlcyh2YWwpO1xuICAgICAgICBhdHRycyA9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpICsgYXR0cnM7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKCdzdHlsZScgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfc3R5bGUodmFsKTtcbiAgICAgIH1cbiAgICAgIGF0dHJzICs9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdHRycztcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgcHVnX21hdGNoX2h0bWwgPSAvW1wiJjw+XS87XG5leHBvcnRzLmVzY2FwZSA9IHB1Z19lc2NhcGU7XG5mdW5jdGlvbiBwdWdfZXNjYXBlKF9odG1sKXtcbiAgdmFyIGh0bWwgPSAnJyArIF9odG1sO1xuICB2YXIgcmVnZXhSZXN1bHQgPSBwdWdfbWF0Y2hfaHRtbC5leGVjKGh0bWwpO1xuICBpZiAoIXJlZ2V4UmVzdWx0KSByZXR1cm4gX2h0bWw7XG5cbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgaSwgbGFzdEluZGV4LCBlc2NhcGU7XG4gIGZvciAoaSA9IHJlZ2V4UmVzdWx0LmluZGV4LCBsYXN0SW5kZXggPSAwOyBpIDwgaHRtbC5sZW5ndGg7IGkrKykge1xuICAgIHN3aXRjaCAoaHRtbC5jaGFyQ29kZUF0KGkpKSB7XG4gICAgICBjYXNlIDM0OiBlc2NhcGUgPSAnJnF1b3Q7JzsgYnJlYWs7XG4gICAgICBjYXNlIDM4OiBlc2NhcGUgPSAnJmFtcDsnOyBicmVhaztcbiAgICAgIGNhc2UgNjA6IGVzY2FwZSA9ICcmbHQ7JzsgYnJlYWs7XG4gICAgICBjYXNlIDYyOiBlc2NhcGUgPSAnJmd0Oyc7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogY29udGludWU7XG4gICAgfVxuICAgIGlmIChsYXN0SW5kZXggIT09IGkpIHJlc3VsdCArPSBodG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsIGkpO1xuICAgIGxhc3RJbmRleCA9IGkgKyAxO1xuICAgIHJlc3VsdCArPSBlc2NhcGU7XG4gIH1cbiAgaWYgKGxhc3RJbmRleCAhPT0gaSkgcmV0dXJuIHJlc3VsdCArIGh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCwgaSk7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgcHVnIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIG9yaWdpbmFsIHNvdXJjZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gcHVnX3JldGhyb3c7XG5mdW5jdGlvbiBwdWdfcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcHVnX3JldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdQdWcnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wdWctcnVudGltZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuXG5leHBvcnQgY29uc3Qgc3RvcmVTZXJ2aWNlID0ge1xuICBnZXRJdGVtOiAoa2V5KSA9PiB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkgfHwgJydcbiAgfSxcbiAgc2V0SXRlbTogKGtleSwgc3RyaW5nKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBzdHJpbmcpXG4gIH0sXG5cbiAgcmVtb3ZlOiAoa2V5KSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KVxuICB9LFxuXG4gIGdldEpTT046IChrZXkpID0+IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpIHx8ICdbXScpXG4gIH0sXG4gIHNldEpTT046IChrZXksIG9iaikgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkob2JqKSlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9zZXJ2aWNlcy9zdG9yZVNlcnZpY2UuanMiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDs7dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobWVzc2FnZXMpIHsvLyBpdGVyYXRlIG1lc3NhZ2VzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IG1lc3NhZ2VzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgcHVnX2luZGV4MCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgcHVnX2luZGV4MCA8ICQkbDsgcHVnX2luZGV4MCsrKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gJCRvYmpbcHVnX2luZGV4MF07XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZGl2XCIgKyAocHVnLmF0dHIoXCJjbGFzc1wiLCBwdWcuY2xhc3NlcyhbXCJjaGF0X19tZXNzYWdlXCIsbWVzc2FnZS5teSA/ICdjaGF0X19tZXNzYWdlLW15JyA6ICcnXSwgW2ZhbHNlLHRydWVdKSwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NkaXZcXHUwMDNFXCIgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gbWVzc2FnZS50ZXh0KSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcIm1lc3NhZ2VfX3RpbWUgZmxvYXQtcmlnaHRcXFwiXFx1MDAzRVwiICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IG1lc3NhZ2UuZGF0ZSkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcIjtcbiAgICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciBwdWdfaW5kZXgwIGluICQkb2JqKSB7XG4gICAgICAkJGwrKztcbiAgICAgIHZhciBtZXNzYWdlID0gJCRvYmpbcHVnX2luZGV4MF07XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZGl2XCIgKyAocHVnLmF0dHIoXCJjbGFzc1wiLCBwdWcuY2xhc3NlcyhbXCJjaGF0X19tZXNzYWdlXCIsbWVzc2FnZS5teSA/ICdjaGF0X19tZXNzYWdlLW15JyA6ICcnXSwgW2ZhbHNlLHRydWVdKSwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NkaXZcXHUwMDNFXCIgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gbWVzc2FnZS50ZXh0KSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcIm1lc3NhZ2VfX3RpbWUgZmxvYXQtcmlnaHRcXFwiXFx1MDAzRVwiICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IG1lc3NhZ2UuZGF0ZSkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcIjtcbiAgICB9XG4gIH1cbn0pLmNhbGwodGhpcyk7XG59LmNhbGwodGhpcyxcIm1lc3NhZ2VzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5tZXNzYWdlczp0eXBlb2YgbWVzc2FnZXMhPT1cInVuZGVmaW5lZFwiP21lc3NhZ2VzOnVuZGVmaW5lZCkpOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jaGF0L2NvbXBvbmVudHMvbWVzc2FnZS1saXN0L2NoYXQtbWVzc2FnZS1saXN0LnB1Z1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgY2hhdFRtcGwgZnJvbSAnLi9tYWluLnB1ZydcbmltcG9ydCBDaGF0QnV0dG9uIGZyb20gJy4vY29tcG9uZW50cy9jaGF0LWJ1dHRvbi9jaGF0QnV0dG9uJ1xuaW1wb3J0IExvZ2luRm9ybSBmcm9tICcuL2NvbXBvbmVudHMvbG9naW4tZm9ybS9sb2dpbkZvcm0nXG5pbXBvcnQgTWVzc2FnZUxpc3QgZnJvbSAnLi9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9tZXNzYWdlTGlzdCdcbmltcG9ydCBNZXNzYWdlRm9ybSBmcm9tICcuL2NvbXBvbmVudHMvbWVzc2FnZS1mb3JtL21lc3NhZ2VGb3JtJ1xuaW1wb3J0IE1lc3NhZ2VTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvbWVzc2FnZVNlcnZpY2UnXG5pbXBvcnQgQXVkaW9TZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvYXVkaW9TZXJ2aWNlJ1xuaW1wb3J0IEJvdGlrU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL2JvdGlrU2VydmljZSdcbmltcG9ydCBCb3RpayBmcm9tICcuL2NvbXBvbmVudHMvYm90aWsvY2hhdEJvdCdcbmltcG9ydCB7IHN0b3JlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3RvcmVTZXJ2aWNlJ1xuaW1wb3J0IEV2ZW50TWl4aW4gZnJvbSAnLi9jb21wb25lbnRzL2NvbW1vbi9jdXN0b21FdmVudHMnXG5cbmNsYXNzIENoYXQge1xuICBjb25zdHJ1Y3RvciAoe1xuICAgIGVsLFxuICAgIGJ1dHRvbkVsLFxuICAgIGlzT3BlbmVkT25TdGFydFxuICB9KSB7XG4gICAgdGhpcy5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG4gICAgdGhpcy5idXR0b25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uRWwpXG4gICAgdGhpcy5pc09wZW5lZE9uU3RhcnQgPSBpc09wZW5lZE9uU3RhcnRcblxuICAgIHRoaXMuX2luaXRTZXJ2aWNlcygpXG4gICAgdGhpcy51c2VyTmFtZSA9IHN0b3JlU2VydmljZS5nZXRJdGVtKCdjaGF0V2lkZ2V0TmFtZScpXG5cbiAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmdldE1lc3NhZ2VMaXN0KClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHJlcy8vIHx8IFtdXG4gICAgICAgIHRoaXMucmVuZGVyKClcbiAgICAgICAgdGhpcy5faW5pdENvbXBvbmVudHMoKVxuICAgICAgICBpZiAoIXRoaXMudXNlck5hbWUpIHtcbiAgICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMubG9naW5Gb3JtLmVsKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5pdEV2ZW50cygpXG4gICAgICB9KVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICB0aGlzLmVsLmlubmVySFRNTCA9IGNoYXRUbXBsKHtcbiAgICAgIG1lc3NhZ2VzOiB0aGlzLm1lc3NhZ2VzLFxuICAgICAgdXNlcm5hbWU6IHRoaXMudXNlck5hbWVcbiAgICB9KVxuICAgIGlmICghdGhpcy5pc09wZW5lZE9uU3RhcnQpIHtcbiAgICAgIHRoaXMuX29uVG9nZ2xlKClcbiAgICB9XG4gIH1cblxuICBfaW5pdFNlcnZpY2VzICgpIHtcbiAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlID0gbmV3IE1lc3NhZ2VTZXJ2aWNlKHtcbiAgICAgIGJhc2VVcmw6ICdodHRwczovL2NvbXBvbmVudHMtMTYwMS0xOTMwLmZpcmViYXNlaW8uY29tL2NoYXQvbWVzc2FnZXMuanNvbidcbiAgICB9KVxuICAgIHRoaXMuYXVkaW9TZXJ2aWNlID0gbmV3IEF1ZGlvU2VydmljZSgpXG4gICAgdGhpcy5ib3Rpa1NlcnZpY2UgPSBuZXcgQm90aWtTZXJ2aWNlKClcbiAgfVxuXG4gIF9pbml0Q29tcG9uZW50cyAoKSB7XG4gICAgdGhpcy5jaGF0QnV0dG9uID0gbmV3IENoYXRCdXR0b24oe1xuICAgICAgZWw6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgcGFyZW50RWw6IHRoaXMuYnV0dG9uRWwsXG4gICAgICBpc09wZW5lZE9uU3RhcnQ6IHRoaXMuaXNPcGVuZWRPblN0YXJ0LFxuICAgICAgRXZlbnRNaXhpblxuICAgIH0pXG5cbiAgICAvLyBtYXliZSB3ZSBzaG91bGQgbm90IGNyZWF0ZSBpbnN0YW5jZSBpZiBhbHJlYWR5IGxvZ2dlZCBpblxuICAgIHRoaXMubG9naW5Gb3JtID0gbmV3IExvZ2luRm9ybSh7XG4gICAgICBlbDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICBFdmVudE1peGluXG4gICAgfSlcbiAgICB0aGlzLm1lc3NhZ2VGb3JtID0gbmV3IE1lc3NhZ2VGb3JtKHtcbiAgICAgIGVsOiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGF0X19mb3JtJyksXG4gICAgICBFdmVudE1peGluXG4gICAgfSlcbiAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gbmV3IE1lc3NhZ2VMaXN0KHtcbiAgICAgIGVsOiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGF0X19ib2R5JyksXG4gICAgICBtZXNzYWdlczogdGhpcy5tZXNzYWdlcyxcbiAgICAgIG1lc3NhZ2VTZXJ2aWNlOiB0aGlzLm1lc3NhZ2VTZXJ2aWNlXG4gICAgfSlcblxuICAgIHRoaXMuYm90aWsgPSBuZXcgQm90aWsoe1xuICAgICAgYXVkaW9TZXJ2aWNlOiB0aGlzLmF1ZGlvU2VydmljZSxcbiAgICAgIG1lc3NhZ2VMaXN0OiB0aGlzLm1lc3NhZ2VMaXN0LFxuICAgICAgYm90aWtTZXJ2aWNlOiB0aGlzLmJvdGlrU2VydmljZVxuICAgIH0pXG4gIH1cblxuICBfaW5pdEV2ZW50cyAoKSB7XG4gICAgaWYgKCF0aGlzLnVzZXJOYW1lKSB7XG4gICAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGF0X19sb2dpbi1idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubG9naW5Gb3JtLnRvZ2dsZU1vZGFsKVxuICAgIH1cblxuICAgIHRoaXMubG9naW5Gb3JtLm9uKCdsb2dpbicsIHRoaXMuX29uTG9naW4uYmluZCh0aGlzKSlcblxuICAgIHRoaXMubWVzc2FnZUZvcm0ub24oJ21lc3NhZ2UnLCB0aGlzLl9vbk1lc3NhZ2UuYmluZCh0aGlzKSlcblxuICAgIHRoaXMuY2hhdEJ1dHRvbi5vbigndG9nZ2xlJywgdGhpcy5fb25Ub2dnbGUuYmluZCh0aGlzKSlcbiAgfVxuXG4gIF9vbkxvZ2luIChlKSB7XG4gICAgdGhpcy51c2VyTmFtZSA9IGUuZGV0YWlsLnVzZXJuYW1lXG4gICAgc3RvcmVTZXJ2aWNlLnNldEl0ZW0oJ2NoYXRXaWRnZXROYW1lJywgdGhpcy51c2VyTmFtZSlcblxuICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmxvZ2luLWZhbHNlJykuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbi10cnVlJykuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcblxuICAgIGlmICghdGhpcy5tZXNzYWdlcy5sZW5ndGggJiYgdGhpcy51c2VyTmFtZSkge1xuICAgICAgdGhpcy5ib3Rpay5hbnN3ZXIoYNCf0YDQuNCy0LXRgiwgJHt0aGlzLnVzZXJOYW1lfSFgKVxuICAgIH1cbiAgfVxuXG4gIF9vbk1lc3NhZ2UgKGUpIHtcbiAgICB0aGlzLm1lc3NhZ2VMaXN0LmFkZE1lc3NhZ2Uoe1xuICAgICAgdGV4dDogZS5kZXRhaWwudGV4dCxcbiAgICAgIG15OiB0cnVlXG4gICAgfSlcbiAgICB0aGlzLm1lc3NhZ2VMaXN0LnJlbmRlcigpXG4gICAgdGhpcy5ib3Rpay5hbnN3ZXIoKVxuICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnBsYXkoJ3NlbmRfbWVzc2FnZScpXG4gIH1cblxuICBfb25Ub2dnbGUgKCkge1xuICAgIHRoaXMuZWwuY2xhc3NMaXN0LnRvZ2dsZSgnY29sdW1uLTI1JylcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC50b2dnbGUoJ2NvbHVtbi0wJylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGF0XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L21haW4uanMiLCJpbXBvcnQgeyBnZXRSYW5kb21OdW1iZXIgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJ1xuXG5jbGFzcyBDaGF0Qm90IHtcbiAgY29uc3RydWN0b3IgKHtcbiAgICBhdWRpb1NlcnZpY2UsXG4gICAgbWVzc2FnZUxpc3QsXG4gICAgYm90aWtTZXJ2aWNlXG4gIH0pIHtcbiAgICB0aGlzLmFuc3dlcnMgPSBib3Rpa1NlcnZpY2UuZ2V0UmFuZG9tTWVzc2FnZXMoKVxuICAgIHRoaXMubWVzc2FnZUxpc3QgPSBtZXNzYWdlTGlzdFxuICAgIHRoaXMuYXVkaW9TZXJ2aWNlID0gYXVkaW9TZXJ2aWNlXG4gIH1cblxuICBhbnN3ZXIgKG1lc3NhZ2UpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubWVzc2FnZUxpc3QuYWRkTWVzc2FnZSh7XG4gICAgICAgIHRleHQ6IG1lc3NhZ2UgfHwgdGhpcy5hbnN3ZXJzW2dldFJhbmRvbU51bWJlcih0aGlzLmFuc3dlcnMubGVuZ3RoKV0sXG4gICAgICAgIG15OiBmYWxzZVxuICAgICAgfSlcbiAgICAgIHRoaXMubWVzc2FnZUxpc3QucmVuZGVyKClcbiAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnBsYXkoJ3JlY2VpdmVfbWVzc2FnZScpXG4gICAgfSwgMTUwMClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGF0Qm90XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L2NvbXBvbmVudHMvYm90aWsvY2hhdEJvdC5qcyIsImltcG9ydCBidXR0b25UZW1wbGF0ZSBmcm9tICcuL2NoYXQtYnV0dG9uLnB1ZydcblxuY2xhc3MgQ2hhdEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgZWwsXG4gICAgcGFyZW50RWwsXG4gICAgaXNPcGVuZWRPblN0YXJ0ID0gdHJ1ZSxcbiAgICBFdmVudE1peGluXG4gIH0pIHtcbiAgICAvLyBhZGRpbmcgb24oKSBhbmQgdHJpZ2dlcigpIG1ldGhvZHNcbiAgICBFdmVudE1peGluLmFwcGx5KHRoaXMpXG5cbiAgICB0aGlzLmVsID0gZWxcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3Nob3dfX2J1dHRvbicpXG4gICAgdGhpcy5wYXJlbnRFbCA9IHBhcmVudEVsXG4gICAgdGhpcy5pc09wZW5lZE9uU3RhcnQgPSBpc09wZW5lZE9uU3RhcnRcblxuICAgIHRoaXMucmVuZGVyKClcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUuYmluZCh0aGlzKSlcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgdGhpcy5lbC5pbm5lckhUTUwgPSBidXR0b25UZW1wbGF0ZSgpXG4gICAgdGhpcy5wYXJlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLmVsKVxuICAgIGlmICghdGhpcy5pc09wZW5lZE9uU3RhcnQpIHtcbiAgICAgIHRoaXMuX3RvZ2dsZSh0aGlzLmVsLmZpcnN0Q2hpbGQpXG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICB0aGlzLl90b2dnbGUoZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtYWN0aW9uXScpKVxuICAgIHRoaXMudHJpZ2dlcigndG9nZ2xlJylcbiAgfVxuXG4gIF90b2dnbGUgKGVsKSB7XG4gICAgZWwuZmlyc3RDaGlsZC5jbGFzc0xpc3QudG9nZ2xlKCdmYS1jaGV2cm9uLWxlZnQnKVxuICAgIGVsLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LnRvZ2dsZSgnZmEtY2hldnJvbi1yaWdodCcpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdEJ1dHRvblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9jb21wb25lbnRzL2NoYXQtYnV0dG9uL2NoYXRCdXR0b24uanMiLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZnVuY3Rpb24gRXZlbnRNaXhpbiAoKSB7XG4gIHRoaXMub24gPSBmdW5jdGlvbiAobmFtZSwgY2IpIHtcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgY2IpXG4gIH1cbiAgdGhpcy50cmlnZ2VyID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcbiAgICBsZXQgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSwgeyBkZXRhaWw6IGRhdGEgfSlcbiAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRNaXhpblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9jb21wb25lbnRzL2NvbW1vbi9jdXN0b21FdmVudHMuanMiLCJpbXBvcnQgbW9kYWxUbXBsIGZyb20gJy4vbW9kYWwucHVnJ1xuXG5jbGFzcyBMb2dpbkZvcm0ge1xuICBjb25zdHJ1Y3RvciAoe1xuICAgIGVsLFxuICAgIEV2ZW50TWl4aW5cbiAgfSkge1xuICAgIC8vIGFkZGluZyBvbigpIGFuZCB0cmlnZ2VyKCkgbWV0aG9kc1xuICAgIEV2ZW50TWl4aW4uYXBwbHkodGhpcylcblxuICAgIHRoaXMuZWwgPSBlbFxuXG4gICAgdGhpcy5yZW5kZXIoKVxuXG4gICAgdGhpcy50b2dnbGVNb2RhbCA9IHRoaXMudG9nZ2xlTW9kYWwuYmluZCh0aGlzKVxuXG4gICAgdGhpcy5faW5pdEV2ZW50cygpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gbW9kYWxUbXBsKClcblxuICAgIHRoaXMuY2hhdE1vZGFsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2NoYXQnKVxuICAgIHRoaXMuY2hhdE1vZGFsQ2xvc2UgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY2hhdC1jbG9zZScpXG4gICAgdGhpcy5jaGF0TW9kYWxTdWJtaXQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGF0LWxvZ2luJylcbiAgfVxuXG4gIHRvZ2dsZU1vZGFsIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICB0aGlzLmNoYXRNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdub3QtdmlzaWJsZScpXG4gIH1cblxuICBzdWJtaXRMb2dpbkZvcm0gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIHRoaXMudHJpZ2dlcignbG9naW4nLCB7IHVzZXJuYW1lOiBlLnRhcmdldC5uYW1lLnZhbHVlIH0pXG4gICAgdGhpcy50b2dnbGVNb2RhbChlKVxuICB9XG5cbiAgX2luaXRFdmVudHMgKCkge1xuICAgIHRoaXMuY2hhdE1vZGFsQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZU1vZGFsKVxuICAgIHRoaXMuY2hhdE1vZGFsU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0TG9naW5Gb3JtLmJpbmQodGhpcykpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9naW5Gb3JtXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L2NvbXBvbmVudHMvbG9naW4tZm9ybS9sb2dpbkZvcm0uanMiLCJjbGFzcyBNZXNzYWdlRm9ybSB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgZWwsXG4gICAgRXZlbnRNaXhpblxuICB9KSB7XG4gICAgLy8gYWRkaW5nIG9uKCkgYW5kIHRyaWdnZXIoKSBtZXRob2RzXG4gICAgRXZlbnRNaXhpbi5hcHBseSh0aGlzKVxuXG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5tZXNzYWdlVGV4dGFyZWEgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlJylcbiAgICB0aGlzLl9pbml0RXZlbnRzKClcbiAgfVxuXG4gIHJlc2V0IChlKSB7XG4gICAgdGhpcy5lbC5yZXNldCgpXG4gIH1cblxuICBzdWJtaXRNZXNzYWdlRm9ybSAoZSkge1xuICAgIGlmIChlLmNoYXJDb2RlID09PSAxMyAmJiBlLnNoaWZ0S2V5ID09PSBmYWxzZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBpZiAoZS50YXJnZXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcignbWVzc2FnZScsIHsgdGV4dDogZS50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgdGhpcy5yZXNldChlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9pbml0RXZlbnRzICgpIHtcbiAgICB0aGlzLm1lc3NhZ2VUZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuc3VibWl0TWVzc2FnZUZvcm0uYmluZCh0aGlzKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlRm9ybVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9jb21wb25lbnRzL21lc3NhZ2UtZm9ybS9tZXNzYWdlRm9ybS5qcyIsImltcG9ydCBjaGF0bWxUbXBsIGZyb20gJy4vY2hhdC1tZXNzYWdlLWxpc3QucHVnJ1xuXG5jbGFzcyBNZXNzYWdlTGlzdCB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgZWwsXG4gICAgbWVzc2FnZXMsXG4gICAgbWVzc2FnZVNlcnZpY2VcbiAgfSkge1xuICAgIHRoaXMuZWwgPSBlbFxuICAgIHRoaXMubWVzc2FnZVNlcnZpY2UgPSBtZXNzYWdlU2VydmljZVxuICAgIHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlc1xuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICB0aGlzLmVsLmlubmVySFRNTCA9IGNoYXRtbFRtcGwoe1xuICAgICAgbWVzc2FnZXM6IHRoaXMubWVzc2FnZXNcbiAgICB9KVxuICB9XG5cbi8vICBnZXRNZXNzYWdlTGlzdCAoKSB7XG4vLyAgICByZXR1cm4gdGhpcy5tZXNzYWdlc1xuLy8gIH1cblxuICBhZGRNZXNzYWdlIChkYXRhKSB7XG4gICAgdGhpcy5tZXNzYWdlcy51bnNoaWZ0KHsgLy8gdW5zaGlmdCBpcyBubyBnb29kXG4gICAgICB0ZXh0OiBkYXRhLnRleHQsXG4gICAgICBteTogZGF0YS5teSB8fCBmYWxzZSxcbiAgICAgIGRhdGU6IG5ldyBEYXRlKCkuZ2V0SG91cnMoKSArICc6JyArIG5ldyBEYXRlKCkuZ2V0TWludXRlcygpXG4gICAgfSlcbiAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNhdmVNZXNzYWdlcyh0aGlzLm1lc3NhZ2VzKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VMaXN0XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L2NvbXBvbmVudHMvbWVzc2FnZS1saXN0L21lc3NhZ2VMaXN0LmpzIiwiLyogZ2xvYmFsIEF1ZGlvICovXG5jbGFzcyBBdWRpb1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5zb3VuZHMgPSB7XG4gICAgICAncmVjZWl2ZV9tZXNzYWdlJzogbmV3IEF1ZGlvKCcuL2NoYXQvYXNzZXRzL3NvdW5kcy9ub3RpZmljYXRpb24ubXAzJyksXG4gICAgICAnc2VuZF9tZXNzYWdlJzogbmV3IEF1ZGlvKCcuL2NoYXQvYXNzZXRzL3NvdW5kcy9zZW5kaW5nLm1wMycpXG4gICAgfVxuICB9XG5cbiAgcGxheSAoc291bmQpIHtcbiAgICB0aGlzLnNvdW5kc1tzb3VuZF0ucGxheSgpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXVkaW9TZXJ2aWNlXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L3NlcnZpY2VzL2F1ZGlvU2VydmljZS5qcyIsImNsYXNzIEJvdGlrU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLm5hbWUgPSAnQm90aWtTZXJ2aWNlJ1xuICB9XG5cbiAgZ2V0UmFuZG9tTWVzc2FnZXMgKCkge1xuICAgIHJldHVybiBbXG4gICAgICAn0KDQsNGB0YHQutCw0LbQuCDQvNC90LUg0YfRgtC+LdC90LjQsdGD0LTRjCcsXG4gICAgICAn0JzQvdC1INGB0LrRg9GH0L3QvicsXG4gICAgICAn0J4g0YfQtdC8INGC0Ysg0LTRg9C80LDQtdGI0Yw/JyxcbiAgICAgICfQpdC+0YfQtdGI0Ywg0L/QvtCz0L7QstC+0YDQuNGC0Ywg0L7QsSDRjdGC0L7QvD8nLFxuICAgICAgJ9Ca0LDQuiDRgtGLINC/0YDQvtCy0LXQuyDRgdCy0L7QuSDQtNC10L3RjD8nLFxuICAgICAgJ9CjINGC0LXQsdGPINC10YHRgtGMINC/0LvQsNC90Ysg0L3QsCDQt9Cw0LLRgtGA0LDRiNC90LjQuSDQtNC10L3RkdC6PycsXG4gICAgICAn0KLQtdCx0LUg0L3RgNCw0LLQuNGC0YHRjyDQv9C+0LPQvtC00LAg0LfQsCDQvtC60L7RiNC60L7QvD8nLFxuICAgICAgJ9CS0L4g0YHQutC+0LvRjNC60L4g0YLRiyDQv9GA0L7RgdC90YPQu9GB0Y8/JyxcbiAgICAgICfQryDRgtC+0LbQtScsXG4gICAgICAn0JDQs9CwJyxcbiAgICAgICfQmCDRgtC10LHQtScsXG4gICAgICAn0KXQvNC8LCDQuNC90YLQtdGA0LXRgdC90LXQvdGM0LrQvi4uLidcbiAgICBdXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQm90aWtTZXJ2aWNlXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L3NlcnZpY2VzL2JvdGlrU2VydmljZS5qcyIsIi8qIGdsb2JhbCBmZXRjaCAqL1xuaW1wb3J0IHsgc3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yZVNlcnZpY2UnXG5cbmNsYXNzIE1lc3NhZ2VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IgKHtcbiAgICBiYXNlVXJsXG4gIH0pIHtcbiAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsXG4gIH1cblxuICBfcmVxdWVzdCAoKSB7XG4gICAgcmV0dXJuIGZldGNoKCdjaGF0L3NlcnZpY2VzL21vY2tNZXNzYWdlcy5qc29uJylcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICByZXR1cm4gc3RvcmVTZXJ2aWNlLmdldEpTT04oJ2NoYXRIaXN0b3J5JylcbiAgICAgIH0pXG4gIH1cblxuICBnZXRNZXNzYWdlTGlzdCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoKVxuICB9XG5cbiAgc2F2ZU1lc3NhZ2VzIChtZXNzYWdlcykge1xuICAgIHN0b3JlU2VydmljZS5zZXRKU09OKCdjaGF0SGlzdG9yeScsIG1lc3NhZ2VzKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VTZXJ2aWNlXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L3NlcnZpY2VzL21lc3NhZ2VTZXJ2aWNlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbU51bWJlciAobWF4KSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gMSkpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L3V0aWxzL3V0aWwuanMiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDtwdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDYnV0dG9uIGNsYXNzPVxcXCJidXR0b24gYnV0dG9uLWJsYWNrIGJ1dHRvbl9fc2hvdy1jaGF0XFxcIiBkYXRhLWFjdGlvbj1cXFwidG9nZ2xlXFxcIlxcdTAwM0VcXHUwMDNDaSBjbGFzcz1cXFwiZmEgZmEtY2hldnJvbi1yaWdodFxcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZpXFx1MDAzRVxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVwiOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jaGF0L2NvbXBvbmVudHMvY2hhdC1idXR0b24vY2hhdC1idXR0b24ucHVnXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDtwdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZGl2IGNsYXNzPVxcXCJtb2RhbCBtb2RhbF9fY2hhdCBub3QtdmlzaWJsZVxcXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwibW9kYWxfX2JvZHlcXFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcIm1vZGFsX19jb250ZW50XFxcIlxcdTAwM0VcXHUwMDNDZm9ybSBjbGFzcz1cXFwiY2hhdC1sb2dpblxcXCIgbmFtZT1cXFwiY2hhdC1sb2dpblxcXCJcXHUwMDNFXFx1MDAzQ2ZpZWxkc2V0XFx1MDAzRVxcdTAwM0NsYWJlbCBmb3I9XFxcIm5hbWVcXFwiXFx1MDAzRUVudGVyIHlvIG5hbWVcXHUwMDNDXFx1MDAyRmxhYmVsXFx1MDAzRVxcdTAwM0NpbnB1dCBpZD1cXFwibmFtZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIm5hbWVcXFwiIHJlcXVpcmVkIGF1dG9mb2N1c1xcdTAwM0VcXHUwMDNDXFx1MDAyRmZpZWxkc2V0XFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcImJ1dHRvbi1wcmltYXJ5IG0tbC0xIGZsb2F0LXJpZ2h0XFxcIiB0eXBlPVxcXCJzdWJtaXRcXFwiXFx1MDAzRUVudGVyIGNoYXRcXHUwMDNDXFx1MDAyRmJ1dHRvblxcdTAwM0VcXHUwMDNDYnV0dG9uIGNsYXNzPVxcXCJidXR0b24tb3V0bGluZSBmbG9hdC1yaWdodCBtb2RhbF9fY2hhdC1jbG9zZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIlxcdTAwM0VDbG9zZVxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NcXHUwMDJGZm9ybVxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcIjs7cmV0dXJuIHB1Z19odG1sO307XG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2hhdC9jb21wb25lbnRzL2xvZ2luLWZvcm0vbW9kYWwucHVnXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDs7dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAodXNlcm5hbWUpIHtwdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZGl2IGNsYXNzPVxcXCJjb2x1bW4tY2VudGVyIGNoYXRfX2FwcFxcXCJcXHUwMDNFXFx1MDAzQ2RpdlwiICsgKHB1Zy5hdHRyKFwiY2xhc3NcIiwgcHVnLmNsYXNzZXMoW1wibG9naW4tZmFsc2VcIix1c2VybmFtZSA/ICdoaWRkZW4nIDogJyddLCBbZmFsc2UsdHJ1ZV0pLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXFx1MDAzQ2J1dHRvbiBjbGFzcz1cXFwiYnV0dG9uLXByaW1hcnkgY2hhdF9fbG9naW4tYnV0dG9uXFxcIlxcdTAwM0VKb2luIGNoYXRcXHUwMDNDXFx1MDAyRmJ1dHRvblxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2XCIgKyAocHVnLmF0dHIoXCJjbGFzc1wiLCBwdWcuY2xhc3NlcyhbXCJsb2dpbi10cnVlXCIsIXVzZXJuYW1lID8gJ2hpZGRlbicgOiAnJ10sIFtmYWxzZSx0cnVlXSksIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJjaGF0X19oZWFkZXJcXFwiXFx1MDAzRVxcdTAwM0NpIGNsYXNzPVxcXCJmYSBmYS11c2VyLWNpcmNsZS1vIGhlYWRlcl9fYXZhdGFyXFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRmlcXHUwMDNFXFx1MDAzQ3AgY2xhc3M9XFxcImhlYWRlcl9fbmFtZVxcXCJcXHUwMDNFQ2hhdCB3aXRoIEJvdGlrXFx1MDAzQ1xcdTAwMkZwXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImNoYXRfX2JvZHlcXFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9jaGF0LW1lc3NhZ2UtbGlzdC5wdWdcIikuY2FsbCh0aGlzLCBsb2NhbHMpKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwiY2hhdF9fZm9vdGVyXFxcIlxcdTAwM0VcXHUwMDNDZm9ybSBjbGFzcz1cXFwiY2hhdF9fZm9ybVxcXCIgbmFtZT1cXFwiY2hhdF9fZm9ybVxcXCJcXHUwMDNFXFx1MDAzQ3RleHRhcmVhIGlkPVxcXCJtZXNzYWdlXFxcIiBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgbWVzc2FnZS4uLlxcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZ0ZXh0YXJlYVxcdTAwM0VcXHUwMDNDXFx1MDAyRmZvcm1cXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXCI7fS5jYWxsKHRoaXMsXCJ1c2VybmFtZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudXNlcm5hbWU6dHlwZW9mIHVzZXJuYW1lIT09XCJ1bmRlZmluZWRcIj91c2VybmFtZTp1bmRlZmluZWQpKTs7cmV0dXJuIHB1Z19odG1sO307XG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2hhdC9tYWluLnB1Z1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogKGlnbm9yZWQpICovXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZnMgKGlnbm9yZWQpXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgQ2hhdCBmcm9tICcuL2NoYXQvbWFpbidcblxuLyogZXNsaW50LWRpc2FibGUgbm8tbmV3ICovXG5uZXcgQ2hhdCh7XG4gIGVsOiAnLmNoYXQnLFxuICBidXR0b25FbDogJy53ZWJzaXRlJywgLy8gZWxlbWVudCB0byBhcHBlbmQgY2hhdCB0b29nbGUgYnV0dG9uLiBNdXN0IGJlIHJlbGF0aXZlLlxuICBpc09wZW5lZE9uU3RhcnQ6IHRydWUgLy8gZGVmYXVsdCB2YWx1ZTogdHJ1ZVxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=
