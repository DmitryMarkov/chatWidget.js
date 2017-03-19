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
      // this.messages = messages
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2Y3MGE2NDU0NTc5N2M5ZTJhZjAiLCJ3ZWJwYWNrOi8vLy4vfi9wdWctcnVudGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L3NlcnZpY2VzL3N0b3JlU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L2NvbXBvbmVudHMvbWVzc2FnZS1saXN0L2NoYXQtbWVzc2FnZS1saXN0LnB1ZyIsIndlYnBhY2s6Ly8vLi9jaGF0L21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9jb21wb25lbnRzL2JvdGlrL2NoYXRCb3QuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9jb21wb25lbnRzL2NoYXQtYnV0dG9uL2NoYXRCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9jb21wb25lbnRzL2NvbW1vbi9jdXN0b21FdmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9jb21wb25lbnRzL2xvZ2luLWZvcm0vbG9naW5Gb3JtLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9tZXNzYWdlLWZvcm0vbWVzc2FnZUZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9tZXNzYWdlTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L3NlcnZpY2VzL2F1ZGlvU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L3NlcnZpY2VzL2JvdGlrU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L3NlcnZpY2VzL21lc3NhZ2VTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2NoYXQvdXRpbHMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L2NvbXBvbmVudHMvY2hhdC1idXR0b24vY2hhdC1idXR0b24ucHVnIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9sb2dpbi1mb3JtL21vZGFsLnB1ZyIsIndlYnBhY2s6Ly8vLi9jaGF0L21haW4ucHVnIiwid2VicGFjazovLy9mcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIl0sIm5hbWVzIjpbInN0b3JlU2VydmljZSIsImdldEl0ZW0iLCJrZXkiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwic3RyaW5nIiwicmVtb3ZlIiwicmVtb3ZlSXRlbSIsImdldEpTT04iLCJKU09OIiwicGFyc2UiLCJzZXRKU09OIiwib2JqIiwic3RyaW5naWZ5IiwiQ2hhdCIsImVsIiwiYnV0dG9uRWwiLCJpc09wZW5lZE9uU3RhcnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJfaW5pdFNlcnZpY2VzIiwidXNlck5hbWUiLCJtZXNzYWdlU2VydmljZSIsImdldE1lc3NhZ2VMaXN0IiwidGhlbiIsInJlcyIsIm1lc3NhZ2VzIiwicmVuZGVyIiwiX2luaXRDb21wb25lbnRzIiwiYXBwZW5kQ2hpbGQiLCJsb2dpbkZvcm0iLCJfaW5pdEV2ZW50cyIsImlubmVySFRNTCIsInVzZXJuYW1lIiwiX29uVG9nZ2xlIiwiYmFzZVVybCIsImF1ZGlvU2VydmljZSIsImJvdGlrU2VydmljZSIsImNoYXRCdXR0b24iLCJjcmVhdGVFbGVtZW50IiwicGFyZW50RWwiLCJFdmVudE1peGluIiwibWVzc2FnZUZvcm0iLCJtZXNzYWdlTGlzdCIsImJvdGlrIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRvZ2dsZU1vZGFsIiwib24iLCJfb25Mb2dpbiIsImJpbmQiLCJfb25NZXNzYWdlIiwiZSIsImRldGFpbCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImxlbmd0aCIsImFuc3dlciIsImFkZE1lc3NhZ2UiLCJ0ZXh0IiwibXkiLCJwbGF5IiwiQ2hhdEJvdCIsImFuc3dlcnMiLCJnZXRSYW5kb21NZXNzYWdlcyIsIm1lc3NhZ2UiLCJzZXRUaW1lb3V0IiwiQ2hhdEJ1dHRvbiIsImFwcGx5IiwiYWRkIiwiX3RvZ2dsZSIsImZpcnN0Q2hpbGQiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImNsb3Nlc3QiLCJ0cmlnZ2VyIiwibmFtZSIsImNiIiwiZGF0YSIsImV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiTG9naW5Gb3JtIiwiY2hhdE1vZGFsIiwiY2hhdE1vZGFsQ2xvc2UiLCJjaGF0TW9kYWxTdWJtaXQiLCJ2YWx1ZSIsInN1Ym1pdExvZ2luRm9ybSIsIk1lc3NhZ2VGb3JtIiwibWVzc2FnZVRleHRhcmVhIiwicmVzZXQiLCJjaGFyQ29kZSIsInNoaWZ0S2V5IiwidHJpbSIsInN1Ym1pdE1lc3NhZ2VGb3JtIiwiTWVzc2FnZUxpc3QiLCJ1bnNoaWZ0IiwiZGF0ZSIsIkRhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJzYXZlTWVzc2FnZXMiLCJBdWRpb1NlcnZpY2UiLCJzb3VuZHMiLCJBdWRpbyIsInNvdW5kIiwiQm90aWtTZXJ2aWNlIiwiTWVzc2FnZVNlcnZpY2UiLCJmZXRjaCIsInJlc3BvbnNlIiwianNvbiIsImNhdGNoIiwiZXJyIiwiY29uc29sZSIsImxvZyIsIl9yZXF1ZXN0IiwiZ2V0UmFuZG9tTnVtYmVyIiwibWF4IiwiTWF0aCIsInJvdW5kIiwicmFuZG9tIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNoRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xC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ckIsQ0FBUDtBQUNELE9BTEksQ0FBUDtBQU1EOzs7cUNBRWlCO0FBQ2hCLGFBQU8sS0FBSzBHLFFBQUwsRUFBUDtBQUNEOzs7aUNBRWF4RixRLEVBQVU7QUFDdEI7QUFDQSxpQ0FBYWYsT0FBYixDQUFxQixhQUFyQixFQUFvQ2UsUUFBcEM7QUFDRDs7Ozs7O2tCQUdZZ0YsYzs7Ozs7Ozs7Ozs7O1FDN0JDUyxlLEdBQUFBLGU7QUFBVCxTQUFTQSxlQUFULENBQTBCQyxHQUExQixFQUErQjtBQUNwQyxTQUFPQyxLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsTUFBaUJILE1BQU0sQ0FBdkIsQ0FBWCxDQUFQO0FBQ0QsQzs7Ozs7O0FDRkQ7O0FBRUEsMkJBQTJCLGtDQUFrQyxhQUFhLHlNQUF5TTtBQUNuUiwwQjs7Ozs7O0FDSEE7O0FBRUEsMkJBQTJCLGtDQUFrQyxhQUFhLG90QkFBb3RCO0FBQzl4QiwwQjs7Ozs7O0FDSEE7O0FBRUEsMkJBQTJCLGtDQUFrQyxjQUFjLG1DQUFtQyxFQUFFLHNCQUFzQiw0aUNBQWdsQyxzSEFBc0g7QUFDNTBDLDBCOzs7Ozs7QUNIQSxlOzs7Ozs7Ozs7QUNBQTs7Ozs7O0FBRUE7QUFDQSxtQkFBUztBQUNQckcsTUFBSSxPQURHO0FBRVBDLFlBQVUsVUFGSCxFQUVlO0FBQ3RCQyxtQkFBaUIsSUFIVixDQUdlO0FBSGYsQ0FBVCxFIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxOCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2Y3MGE2NDU0NTc5N2M5ZTJhZjAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBwdWdfaGFzX293bl9wcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IHB1Z19tZXJnZTtcbmZ1bmN0aW9uIHB1Z19tZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gcHVnX21lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ID09PSAnY2xhc3MnKSB7XG4gICAgICB2YXIgdmFsQSA9IGFba2V5XSB8fCBbXTtcbiAgICAgIGFba2V5XSA9IChBcnJheS5pc0FycmF5KHZhbEEpID8gdmFsQSA6IFt2YWxBXSkuY29uY2F0KGJba2V5XSB8fCBbXSk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgIHZhciB2YWxBID0gcHVnX3N0eWxlKGFba2V5XSk7XG4gICAgICB2YXIgdmFsQiA9IHB1Z19zdHlsZShiW2tleV0pO1xuICAgICAgYVtrZXldID0gdmFsQSArIHZhbEI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBhcnJheSwgb2JqZWN0LCBvciBzdHJpbmcgYXMgYSBzdHJpbmcgb2YgY2xhc3NlcyBkZWxpbWl0ZWQgYnkgYSBzcGFjZS5cbiAqXG4gKiBJZiBgdmFsYCBpcyBhbiBhcnJheSwgYWxsIG1lbWJlcnMgb2YgaXQgYW5kIGl0cyBzdWJhcnJheXMgYXJlIGNvdW50ZWQgYXNcbiAqIGNsYXNzZXMuIElmIGBlc2NhcGluZ2AgaXMgYW4gYXJyYXksIHRoZW4gd2hldGhlciBvciBub3QgdGhlIGl0ZW0gaW4gYHZhbGAgaXNcbiAqIGVzY2FwZWQgZGVwZW5kcyBvbiB0aGUgY29ycmVzcG9uZGluZyBpdGVtIGluIGBlc2NhcGluZ2AuIElmIGBlc2NhcGluZ2AgaXNcbiAqIG5vdCBhbiBhcnJheSwgbm8gZXNjYXBpbmcgaXMgZG9uZS5cbiAqXG4gKiBJZiBgdmFsYCBpcyBhbiBvYmplY3QsIGFsbCB0aGUga2V5cyB3aG9zZSB2YWx1ZSBpcyB0cnV0aHkgYXJlIGNvdW50ZWQgYXNcbiAqIGNsYXNzZXMuIE5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogSWYgYHZhbGAgaXMgYSBzdHJpbmcsIGl0IGlzIGNvdW50ZWQgYXMgYSBjbGFzcy4gTm8gZXNjYXBpbmcgaXMgZG9uZS5cbiAqXG4gKiBAcGFyYW0geyhBcnJheS48c3RyaW5nPnxPYmplY3QuPHN0cmluZywgYm9vbGVhbj58c3RyaW5nKX0gdmFsXG4gKiBAcGFyYW0gez9BcnJheS48c3RyaW5nPn0gZXNjYXBpbmdcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbGFzc2VzID0gcHVnX2NsYXNzZXM7XG5mdW5jdGlvbiBwdWdfY2xhc3Nlc19hcnJheSh2YWwsIGVzY2FwaW5nKSB7XG4gIHZhciBjbGFzc1N0cmluZyA9ICcnLCBjbGFzc05hbWUsIHBhZGRpbmcgPSAnJywgZXNjYXBlRW5hYmxlZCA9IEFycmF5LmlzQXJyYXkoZXNjYXBpbmcpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xuICAgIGNsYXNzTmFtZSA9IHB1Z19jbGFzc2VzKHZhbFtpXSk7XG4gICAgaWYgKCFjbGFzc05hbWUpIGNvbnRpbnVlO1xuICAgIGVzY2FwZUVuYWJsZWQgJiYgZXNjYXBpbmdbaV0gJiYgKGNsYXNzTmFtZSA9IHB1Z19lc2NhcGUoY2xhc3NOYW1lKSk7XG4gICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHBhZGRpbmcgKyBjbGFzc05hbWU7XG4gICAgcGFkZGluZyA9ICcgJztcbiAgfVxuICByZXR1cm4gY2xhc3NTdHJpbmc7XG59XG5mdW5jdGlvbiBwdWdfY2xhc3Nlc19vYmplY3QodmFsKSB7XG4gIHZhciBjbGFzc1N0cmluZyA9ICcnLCBwYWRkaW5nID0gJyc7XG4gIGZvciAodmFyIGtleSBpbiB2YWwpIHtcbiAgICBpZiAoa2V5ICYmIHZhbFtrZXldICYmIHB1Z19oYXNfb3duX3Byb3BlcnR5LmNhbGwodmFsLCBrZXkpKSB7XG4gICAgICBjbGFzc1N0cmluZyA9IGNsYXNzU3RyaW5nICsgcGFkZGluZyArIGtleTtcbiAgICAgIHBhZGRpbmcgPSAnICc7XG4gICAgfVxuICB9XG4gIHJldHVybiBjbGFzc1N0cmluZztcbn1cbmZ1bmN0aW9uIHB1Z19jbGFzc2VzKHZhbCwgZXNjYXBpbmcpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgIHJldHVybiBwdWdfY2xhc3Nlc19hcnJheSh2YWwsIGVzY2FwaW5nKTtcbiAgfSBlbHNlIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gcHVnX2NsYXNzZXNfb2JqZWN0KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbCB8fCAnJztcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgb2JqZWN0IG9yIHN0cmluZyB0byBhIHN0cmluZyBvZiBDU1Mgc3R5bGVzIGRlbGltaXRlZCBieSBhIHNlbWljb2xvbi5cbiAqXG4gKiBAcGFyYW0geyhPYmplY3QuPHN0cmluZywgc3RyaW5nPnxzdHJpbmcpfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5leHBvcnRzLnN0eWxlID0gcHVnX3N0eWxlO1xuZnVuY3Rpb24gcHVnX3N0eWxlKHZhbCkge1xuICBpZiAoIXZhbCkgcmV0dXJuICcnO1xuICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgZm9yICh2YXIgc3R5bGUgaW4gdmFsKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHB1Z19oYXNfb3duX3Byb3BlcnR5LmNhbGwodmFsLCBzdHlsZSkpIHtcbiAgICAgICAgb3V0ID0gb3V0ICsgc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdICsgJzsnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9IGVsc2Uge1xuICAgIHZhbCArPSAnJztcbiAgICBpZiAodmFsW3ZhbC5sZW5ndGggLSAxXSAhPT0gJzsnKSBcbiAgICAgIHJldHVybiB2YWwgKyAnOyc7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gcHVnX2F0dHI7XG5mdW5jdGlvbiBwdWdfYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKHZhbCA9PT0gZmFsc2UgfHwgdmFsID09IG51bGwgfHwgIXZhbCAmJiAoa2V5ID09PSAnY2xhc3MnIHx8IGtleSA9PT0gJ3N0eWxlJykpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhbCA9IHZhbC50b0pTT04oKTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbCAhPT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgIGlmICghZXNjYXBlZCAmJiB2YWwuaW5kZXhPZignXCInKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVxcJycgKyB2YWwucmVwbGFjZSgvJy9nLCAnJiMzOTsnKSArICdcXCcnO1xuICAgIH1cbiAgfVxuICBpZiAoZXNjYXBlZCkgdmFsID0gcHVnX2VzY2FwZSh2YWwpO1xuICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0ZXJzZSB3aGV0aGVyIHRvIHVzZSBIVE1MNSB0ZXJzZSBib29sZWFuIGF0dHJpYnV0ZXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IHB1Z19hdHRycztcbmZ1bmN0aW9uIHB1Z19hdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGF0dHJzID0gJyc7XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PT0ga2V5KSB7XG4gICAgICAgIHZhbCA9IHB1Z19jbGFzc2VzKHZhbCk7XG4gICAgICAgIGF0dHJzID0gcHVnX2F0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkgKyBhdHRycztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoJ3N0eWxlJyA9PT0ga2V5KSB7XG4gICAgICAgIHZhbCA9IHB1Z19zdHlsZSh2YWwpO1xuICAgICAgfVxuICAgICAgYXR0cnMgKz0gcHVnX2F0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGF0dHJzO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBwdWdfbWF0Y2hfaHRtbCA9IC9bXCImPD5dLztcbmV4cG9ydHMuZXNjYXBlID0gcHVnX2VzY2FwZTtcbmZ1bmN0aW9uIHB1Z19lc2NhcGUoX2h0bWwpe1xuICB2YXIgaHRtbCA9ICcnICsgX2h0bWw7XG4gIHZhciByZWdleFJlc3VsdCA9IHB1Z19tYXRjaF9odG1sLmV4ZWMoaHRtbCk7XG4gIGlmICghcmVnZXhSZXN1bHQpIHJldHVybiBfaHRtbDtcblxuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHZhciBpLCBsYXN0SW5kZXgsIGVzY2FwZTtcbiAgZm9yIChpID0gcmVnZXhSZXN1bHQuaW5kZXgsIGxhc3RJbmRleCA9IDA7IGkgPCBodG1sLmxlbmd0aDsgaSsrKSB7XG4gICAgc3dpdGNoIChodG1sLmNoYXJDb2RlQXQoaSkpIHtcbiAgICAgIGNhc2UgMzQ6IGVzY2FwZSA9ICcmcXVvdDsnOyBicmVhaztcbiAgICAgIGNhc2UgMzg6IGVzY2FwZSA9ICcmYW1wOyc7IGJyZWFrO1xuICAgICAgY2FzZSA2MDogZXNjYXBlID0gJyZsdDsnOyBicmVhaztcbiAgICAgIGNhc2UgNjI6IGVzY2FwZSA9ICcmZ3Q7JzsgYnJlYWs7XG4gICAgICBkZWZhdWx0OiBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGxhc3RJbmRleCAhPT0gaSkgcmVzdWx0ICs9IGh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCwgaSk7XG4gICAgbGFzdEluZGV4ID0gaSArIDE7XG4gICAgcmVzdWx0ICs9IGVzY2FwZTtcbiAgfVxuICBpZiAobGFzdEluZGV4ICE9PSBpKSByZXR1cm4gcmVzdWx0ICsgaHRtbC5zdWJzdHJpbmcobGFzdEluZGV4LCBpKTtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBwdWcgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgb3JpZ2luYWwgc291cmNlXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBwdWdfcmV0aHJvdztcbmZ1bmN0aW9uIHB1Z19yZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICBwdWdfcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ1B1ZycpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3B1Zy1ydW50aW1lL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5cbmV4cG9ydCBjb25zdCBzdG9yZVNlcnZpY2UgPSB7XG4gIGdldEl0ZW06IChrZXkpID0+IHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSB8fCAnJ1xuICB9LFxuICBzZXRJdGVtOiAoa2V5LCBzdHJpbmcpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHN0cmluZylcbiAgfSxcblxuICByZW1vdmU6IChrZXkpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXG4gIH0sXG5cbiAgZ2V0SlNPTjogKGtleSkgPT4ge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkgfHwgJ1tdJylcbiAgfSxcbiAgc2V0SlNPTjogKGtleSwgb2JqKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShvYmopKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L3NlcnZpY2VzL3N0b3JlU2VydmljZS5qcyIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwOzt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChtZXNzYWdlcykgey8vIGl0ZXJhdGUgbWVzc2FnZXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbWVzc2FnZXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBwdWdfaW5kZXgwID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyBwdWdfaW5kZXgwIDwgJCRsOyBwdWdfaW5kZXgwKyspIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAkJG9ialtwdWdfaW5kZXgwXTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXZcIiArIChwdWcuYXR0cihcImNsYXNzXCIsIHB1Zy5jbGFzc2VzKFtcImNoYXRfX21lc3NhZ2VcIixtZXNzYWdlLm15ID8gJ2NoYXRfX21lc3NhZ2UtbXknIDogJyddLCBbZmFsc2UsdHJ1ZV0pLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXFx1MDAzQ2RpdlxcdTAwM0VcIiArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBtZXNzYWdlLnRleHQpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwibWVzc2FnZV9fdGltZSBmbG9hdC1yaWdodFxcXCJcXHUwMDNFXCIgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gbWVzc2FnZS5kYXRlKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiO1xuICAgICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyIHB1Z19pbmRleDAgaW4gJCRvYmopIHtcbiAgICAgICQkbCsrO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAkJG9ialtwdWdfaW5kZXgwXTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXZcIiArIChwdWcuYXR0cihcImNsYXNzXCIsIHB1Zy5jbGFzc2VzKFtcImNoYXRfX21lc3NhZ2VcIixtZXNzYWdlLm15ID8gJ2NoYXRfX21lc3NhZ2UtbXknIDogJyddLCBbZmFsc2UsdHJ1ZV0pLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXFx1MDAzQ2RpdlxcdTAwM0VcIiArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBtZXNzYWdlLnRleHQpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwibWVzc2FnZV9fdGltZSBmbG9hdC1yaWdodFxcXCJcXHUwMDNFXCIgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gbWVzc2FnZS5kYXRlKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiO1xuICAgIH1cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwibWVzc2FnZXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm1lc3NhZ2VzOnR5cGVvZiBtZXNzYWdlcyE9PVwidW5kZWZpbmVkXCI/bWVzc2FnZXM6dW5kZWZpbmVkKSk7O3JldHVybiBwdWdfaHRtbDt9O1xubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NoYXQvY29tcG9uZW50cy9tZXNzYWdlLWxpc3QvY2hhdC1tZXNzYWdlLWxpc3QucHVnXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBjaGF0VG1wbCBmcm9tICcuL21haW4ucHVnJ1xuaW1wb3J0IENoYXRCdXR0b24gZnJvbSAnLi9jb21wb25lbnRzL2NoYXQtYnV0dG9uL2NoYXRCdXR0b24nXG5pbXBvcnQgTG9naW5Gb3JtIGZyb20gJy4vY29tcG9uZW50cy9sb2dpbi1mb3JtL2xvZ2luRm9ybSdcbmltcG9ydCBNZXNzYWdlTGlzdCBmcm9tICcuL2NvbXBvbmVudHMvbWVzc2FnZS1saXN0L21lc3NhZ2VMaXN0J1xuaW1wb3J0IE1lc3NhZ2VGb3JtIGZyb20gJy4vY29tcG9uZW50cy9tZXNzYWdlLWZvcm0vbWVzc2FnZUZvcm0nXG5pbXBvcnQgTWVzc2FnZVNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9tZXNzYWdlU2VydmljZSdcbmltcG9ydCBBdWRpb1NlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9hdWRpb1NlcnZpY2UnXG5pbXBvcnQgQm90aWtTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvYm90aWtTZXJ2aWNlJ1xuaW1wb3J0IEJvdGlrIGZyb20gJy4vY29tcG9uZW50cy9ib3Rpay9jaGF0Qm90J1xuaW1wb3J0IHsgc3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdG9yZVNlcnZpY2UnXG5pbXBvcnQgRXZlbnRNaXhpbiBmcm9tICcuL2NvbXBvbmVudHMvY29tbW9uL2N1c3RvbUV2ZW50cydcblxuY2xhc3MgQ2hhdCB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgZWwsXG4gICAgYnV0dG9uRWwsXG4gICAgaXNPcGVuZWRPblN0YXJ0XG4gIH0pIHtcbiAgICB0aGlzLmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcbiAgICB0aGlzLmJ1dHRvbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b25FbClcbiAgICB0aGlzLmlzT3BlbmVkT25TdGFydCA9IGlzT3BlbmVkT25TdGFydFxuXG4gICAgdGhpcy5faW5pdFNlcnZpY2VzKClcbiAgICB0aGlzLnVzZXJOYW1lID0gc3RvcmVTZXJ2aWNlLmdldEl0ZW0oJ2NoYXRXaWRnZXROYW1lJylcblxuICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZ2V0TWVzc2FnZUxpc3QoKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gcmVzLy8gfHwgW11cbiAgICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgICB0aGlzLl9pbml0Q29tcG9uZW50cygpXG4gICAgICAgIGlmICghdGhpcy51c2VyTmFtZSkge1xuICAgICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy5sb2dpbkZvcm0uZWwpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pbml0RXZlbnRzKClcbiAgICAgIH0pXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gY2hhdFRtcGwoe1xuICAgICAgbWVzc2FnZXM6IHRoaXMubWVzc2FnZXMsXG4gICAgICB1c2VybmFtZTogdGhpcy51c2VyTmFtZVxuICAgIH0pXG4gICAgaWYgKCF0aGlzLmlzT3BlbmVkT25TdGFydCkge1xuICAgICAgdGhpcy5fb25Ub2dnbGUoKVxuICAgIH1cbiAgfVxuXG4gIF9pbml0U2VydmljZXMgKCkge1xuICAgIHRoaXMubWVzc2FnZVNlcnZpY2UgPSBuZXcgTWVzc2FnZVNlcnZpY2Uoe1xuICAgICAgYmFzZVVybDogJ2h0dHBzOi8vY29tcG9uZW50cy0xNjAxLTE5MzAuZmlyZWJhc2Vpby5jb20vY2hhdC9tZXNzYWdlcy5qc29uJ1xuICAgIH0pXG4gICAgdGhpcy5hdWRpb1NlcnZpY2UgPSBuZXcgQXVkaW9TZXJ2aWNlKClcbiAgICB0aGlzLmJvdGlrU2VydmljZSA9IG5ldyBCb3Rpa1NlcnZpY2UoKVxuICB9XG5cbiAgX2luaXRDb21wb25lbnRzICgpIHtcbiAgICB0aGlzLmNoYXRCdXR0b24gPSBuZXcgQ2hhdEJ1dHRvbih7XG4gICAgICBlbDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICBwYXJlbnRFbDogdGhpcy5idXR0b25FbCxcbiAgICAgIGlzT3BlbmVkT25TdGFydDogdGhpcy5pc09wZW5lZE9uU3RhcnQsXG4gICAgICBFdmVudE1peGluXG4gICAgfSlcblxuICAgIC8vIG1heWJlIHdlIHNob3VsZCBub3QgY3JlYXRlIGluc3RhbmNlIGlmIGFscmVhZHkgbG9nZ2VkIGluXG4gICAgdGhpcy5sb2dpbkZvcm0gPSBuZXcgTG9naW5Gb3JtKHtcbiAgICAgIGVsOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgIEV2ZW50TWl4aW5cbiAgICB9KVxuICAgIHRoaXMubWVzc2FnZUZvcm0gPSBuZXcgTWVzc2FnZUZvcm0oe1xuICAgICAgZWw6IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmNoYXRfX2Zvcm0nKSxcbiAgICAgIEV2ZW50TWl4aW5cbiAgICB9KVxuICAgIHRoaXMubWVzc2FnZUxpc3QgPSBuZXcgTWVzc2FnZUxpc3Qoe1xuICAgICAgZWw6IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmNoYXRfX2JvZHknKSxcbiAgICAgIG1lc3NhZ2VzOiB0aGlzLm1lc3NhZ2VzLFxuICAgICAgbWVzc2FnZVNlcnZpY2U6IHRoaXMubWVzc2FnZVNlcnZpY2VcbiAgICB9KVxuXG4gICAgdGhpcy5ib3RpayA9IG5ldyBCb3Rpayh7XG4gICAgICBhdWRpb1NlcnZpY2U6IHRoaXMuYXVkaW9TZXJ2aWNlLFxuICAgICAgbWVzc2FnZUxpc3Q6IHRoaXMubWVzc2FnZUxpc3QsXG4gICAgICBib3Rpa1NlcnZpY2U6IHRoaXMuYm90aWtTZXJ2aWNlXG4gICAgfSlcbiAgfVxuXG4gIF9pbml0RXZlbnRzICgpIHtcbiAgICBpZiAoIXRoaXMudXNlck5hbWUpIHtcbiAgICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmNoYXRfX2xvZ2luLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5sb2dpbkZvcm0udG9nZ2xlTW9kYWwpXG4gICAgfVxuXG4gICAgdGhpcy5sb2dpbkZvcm0ub24oJ2xvZ2luJywgdGhpcy5fb25Mb2dpbi5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5tZXNzYWdlRm9ybS5vbignbWVzc2FnZScsIHRoaXMuX29uTWVzc2FnZS5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5jaGF0QnV0dG9uLm9uKCd0b2dnbGUnLCB0aGlzLl9vblRvZ2dsZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgX29uTG9naW4gKGUpIHtcbiAgICB0aGlzLnVzZXJOYW1lID0gZS5kZXRhaWwudXNlcm5hbWVcbiAgICBzdG9yZVNlcnZpY2Uuc2V0SXRlbSgnY2hhdFdpZGdldE5hbWUnLCB0aGlzLnVzZXJOYW1lKVxuXG4gICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubG9naW4tZmFsc2UnKS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmxvZ2luLXRydWUnKS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuXG4gICAgaWYgKCF0aGlzLm1lc3NhZ2VzLmxlbmd0aCAmJiB0aGlzLnVzZXJOYW1lKSB7XG4gICAgICB0aGlzLmJvdGlrLmFuc3dlcihg0J/RgNC40LLQtdGCLCAke3RoaXMudXNlck5hbWV9IWApXG4gICAgfVxuICB9XG5cbiAgX29uTWVzc2FnZSAoZSkge1xuICAgIHRoaXMubWVzc2FnZUxpc3QuYWRkTWVzc2FnZSh7XG4gICAgICB0ZXh0OiBlLmRldGFpbC50ZXh0LFxuICAgICAgbXk6IHRydWVcbiAgICB9KVxuICAgIHRoaXMubWVzc2FnZUxpc3QucmVuZGVyKClcbiAgICB0aGlzLmJvdGlrLmFuc3dlcigpXG4gICAgdGhpcy5hdWRpb1NlcnZpY2UucGxheSgnc2VuZF9tZXNzYWdlJylcbiAgfVxuXG4gIF9vblRvZ2dsZSAoKSB7XG4gICAgdGhpcy5lbC5jbGFzc0xpc3QudG9nZ2xlKCdjb2x1bW4tMjUnKVxuICAgIHRoaXMuZWwuY2xhc3NMaXN0LnRvZ2dsZSgnY29sdW1uLTAnKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYXRcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvbWFpbi5qcyIsImltcG9ydCB7IGdldFJhbmRvbU51bWJlciB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnXG5cbmNsYXNzIENoYXRCb3Qge1xuICBjb25zdHJ1Y3RvciAoe1xuICAgIGF1ZGlvU2VydmljZSxcbiAgICBtZXNzYWdlTGlzdCxcbiAgICBib3Rpa1NlcnZpY2VcbiAgfSkge1xuICAgIHRoaXMuYW5zd2VycyA9IGJvdGlrU2VydmljZS5nZXRSYW5kb21NZXNzYWdlcygpXG4gICAgdGhpcy5tZXNzYWdlTGlzdCA9IG1lc3NhZ2VMaXN0XG4gICAgdGhpcy5hdWRpb1NlcnZpY2UgPSBhdWRpb1NlcnZpY2VcbiAgfVxuXG4gIGFuc3dlciAobWVzc2FnZSkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5tZXNzYWdlTGlzdC5hZGRNZXNzYWdlKHtcbiAgICAgICAgdGV4dDogbWVzc2FnZSB8fCB0aGlzLmFuc3dlcnNbZ2V0UmFuZG9tTnVtYmVyKHRoaXMuYW5zd2Vycy5sZW5ndGgpXSxcbiAgICAgICAgbXk6IGZhbHNlXG4gICAgICB9KVxuICAgICAgdGhpcy5tZXNzYWdlTGlzdC5yZW5kZXIoKVxuICAgICAgdGhpcy5hdWRpb1NlcnZpY2UucGxheSgncmVjZWl2ZV9tZXNzYWdlJylcbiAgICB9LCAxNTAwKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYXRCb3RcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvY29tcG9uZW50cy9ib3Rpay9jaGF0Qm90LmpzIiwiaW1wb3J0IGJ1dHRvblRlbXBsYXRlIGZyb20gJy4vY2hhdC1idXR0b24ucHVnJ1xuXG5jbGFzcyBDaGF0QnV0dG9uIHtcbiAgY29uc3RydWN0b3IgKHtcbiAgICBlbCxcbiAgICBwYXJlbnRFbCxcbiAgICBpc09wZW5lZE9uU3RhcnQgPSB0cnVlLFxuICAgIEV2ZW50TWl4aW5cbiAgfSkge1xuICAgIC8vIGFkZGluZyBvbigpIGFuZCB0cmlnZ2VyKCkgbWV0aG9kc1xuICAgIEV2ZW50TWl4aW4uYXBwbHkodGhpcylcblxuICAgIHRoaXMuZWwgPSBlbFxuICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnc2hvd19fYnV0dG9uJylcbiAgICB0aGlzLnBhcmVudEVsID0gcGFyZW50RWxcbiAgICB0aGlzLmlzT3BlbmVkT25TdGFydCA9IGlzT3BlbmVkT25TdGFydFxuXG4gICAgdGhpcy5yZW5kZXIoKVxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICB0aGlzLmVsLmlubmVySFRNTCA9IGJ1dHRvblRlbXBsYXRlKClcbiAgICB0aGlzLnBhcmVudEVsLmFwcGVuZENoaWxkKHRoaXMuZWwpXG4gICAgaWYgKCF0aGlzLmlzT3BlbmVkT25TdGFydCkge1xuICAgICAgdGhpcy5fdG9nZ2xlKHRoaXMuZWwuZmlyc3RDaGlsZClcbiAgICB9XG4gIH1cblxuICB0b2dnbGUgKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIHRoaXMuX3RvZ2dsZShlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1hY3Rpb25dJykpXG4gICAgdGhpcy50cmlnZ2VyKCd0b2dnbGUnKVxuICB9XG5cbiAgX3RvZ2dsZSAoZWwpIHtcbiAgICBlbC5maXJzdENoaWxkLmNsYXNzTGlzdC50b2dnbGUoJ2ZhLWNoZXZyb24tbGVmdCcpXG4gICAgZWwuZmlyc3RDaGlsZC5jbGFzc0xpc3QudG9nZ2xlKCdmYS1jaGV2cm9uLXJpZ2h0JylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGF0QnV0dG9uXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L2NvbXBvbmVudHMvY2hhdC1idXR0b24vY2hhdEJ1dHRvbi5qcyIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5mdW5jdGlvbiBFdmVudE1peGluICgpIHtcbiAgdGhpcy5vbiA9IGZ1bmN0aW9uIChuYW1lLCBjYikge1xuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBjYilcbiAgfVxuICB0aGlzLnRyaWdnZXIgPSBmdW5jdGlvbiAobmFtZSwgZGF0YSkge1xuICAgIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudChuYW1lLCB7IGRldGFpbDogZGF0YSB9KVxuICAgIHRoaXMuZWwuZGlzcGF0Y2hFdmVudChldmVudClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudE1peGluXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L2NvbXBvbmVudHMvY29tbW9uL2N1c3RvbUV2ZW50cy5qcyIsImltcG9ydCBtb2RhbFRtcGwgZnJvbSAnLi9tb2RhbC5wdWcnXG5cbmNsYXNzIExvZ2luRm9ybSB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgZWwsXG4gICAgRXZlbnRNaXhpblxuICB9KSB7XG4gICAgLy8gYWRkaW5nIG9uKCkgYW5kIHRyaWdnZXIoKSBtZXRob2RzXG4gICAgRXZlbnRNaXhpbi5hcHBseSh0aGlzKVxuXG4gICAgdGhpcy5lbCA9IGVsXG5cbiAgICB0aGlzLnJlbmRlcigpXG5cbiAgICB0aGlzLnRvZ2dsZU1vZGFsID0gdGhpcy50b2dnbGVNb2RhbC5iaW5kKHRoaXMpXG5cbiAgICB0aGlzLl9pbml0RXZlbnRzKClcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgdGhpcy5lbC5pbm5lckhUTUwgPSBtb2RhbFRtcGwoKVxuXG4gICAgdGhpcy5jaGF0TW9kYWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY2hhdCcpXG4gICAgdGhpcy5jaGF0TW9kYWxDbG9zZSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsX19jaGF0LWNsb3NlJylcbiAgICB0aGlzLmNoYXRNb2RhbFN1Ym1pdCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmNoYXQtbG9naW4nKVxuICB9XG5cbiAgdG9nZ2xlTW9kYWwgKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIHRoaXMuY2hhdE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ25vdC12aXNpYmxlJylcbiAgfVxuXG4gIHN1Ym1pdExvZ2luRm9ybSAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgdGhpcy50cmlnZ2VyKCdsb2dpbicsIHsgdXNlcm5hbWU6IGUudGFyZ2V0Lm5hbWUudmFsdWUgfSlcbiAgICB0aGlzLnRvZ2dsZU1vZGFsKGUpXG4gIH1cblxuICBfaW5pdEV2ZW50cyAoKSB7XG4gICAgdGhpcy5jaGF0TW9kYWxDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTW9kYWwpXG4gICAgdGhpcy5jaGF0TW9kYWxTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRMb2dpbkZvcm0uYmluZCh0aGlzKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dpbkZvcm1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvY29tcG9uZW50cy9sb2dpbi1mb3JtL2xvZ2luRm9ybS5qcyIsImNsYXNzIE1lc3NhZ2VGb3JtIHtcbiAgY29uc3RydWN0b3IgKHtcbiAgICBlbCxcbiAgICBFdmVudE1peGluXG4gIH0pIHtcbiAgICAvLyBhZGRpbmcgb24oKSBhbmQgdHJpZ2dlcigpIG1ldGhvZHNcbiAgICBFdmVudE1peGluLmFwcGx5KHRoaXMpXG5cbiAgICB0aGlzLmVsID0gZWxcbiAgICB0aGlzLm1lc3NhZ2VUZXh0YXJlYSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignI21lc3NhZ2UnKVxuICAgIHRoaXMuX2luaXRFdmVudHMoKVxuICB9XG5cbiAgcmVzZXQgKGUpIHtcbiAgICB0aGlzLmVsLnJlc2V0KClcbiAgfVxuXG4gIHN1Ym1pdE1lc3NhZ2VGb3JtIChlKSB7XG4gICAgaWYgKGUuY2hhckNvZGUgPT09IDEzICYmIGUuc2hpZnRLZXkgPT09IGZhbHNlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGlmIChlLnRhcmdldC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdtZXNzYWdlJywgeyB0ZXh0OiBlLnRhcmdldC52YWx1ZSB9KVxuICAgICAgICB0aGlzLnJlc2V0KGUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2luaXRFdmVudHMgKCkge1xuICAgIHRoaXMubWVzc2FnZVRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5zdWJtaXRNZXNzYWdlRm9ybS5iaW5kKHRoaXMpKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VGb3JtXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L2NvbXBvbmVudHMvbWVzc2FnZS1mb3JtL21lc3NhZ2VGb3JtLmpzIiwiaW1wb3J0IGNoYXRtbFRtcGwgZnJvbSAnLi9jaGF0LW1lc3NhZ2UtbGlzdC5wdWcnXG5cbmNsYXNzIE1lc3NhZ2VMaXN0IHtcbiAgY29uc3RydWN0b3IgKHtcbiAgICBlbCxcbiAgICBtZXNzYWdlcyxcbiAgICBtZXNzYWdlU2VydmljZVxuICB9KSB7XG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5tZXNzYWdlU2VydmljZSA9IG1lc3NhZ2VTZXJ2aWNlXG4gICAgdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2VzXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gY2hhdG1sVG1wbCh7XG4gICAgICBtZXNzYWdlczogdGhpcy5tZXNzYWdlc1xuICAgIH0pXG4gIH1cblxuLy8gIGdldE1lc3NhZ2VMaXN0ICgpIHtcbi8vICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzXG4vLyAgfVxuXG4gIGFkZE1lc3NhZ2UgKGRhdGEpIHtcbiAgICB0aGlzLm1lc3NhZ2VzLnVuc2hpZnQoeyAvLyB1bnNoaWZ0IGlzIG5vIGdvb2RcbiAgICAgIHRleHQ6IGRhdGEudGV4dCxcbiAgICAgIG15OiBkYXRhLm15IHx8IGZhbHNlLFxuICAgICAgZGF0ZTogbmV3IERhdGUoKS5nZXRIb3VycygpICsgJzonICsgbmV3IERhdGUoKS5nZXRNaW51dGVzKClcbiAgICB9KVxuICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc2F2ZU1lc3NhZ2VzKHRoaXMubWVzc2FnZXMpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZUxpc3RcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvY29tcG9uZW50cy9tZXNzYWdlLWxpc3QvbWVzc2FnZUxpc3QuanMiLCIvKiBnbG9iYWwgQXVkaW8gKi9cbmNsYXNzIEF1ZGlvU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnNvdW5kcyA9IHtcbiAgICAgICdyZWNlaXZlX21lc3NhZ2UnOiBuZXcgQXVkaW8oJy4vY2hhdC9hc3NldHMvc291bmRzL25vdGlmaWNhdGlvbi5tcDMnKSxcbiAgICAgICdzZW5kX21lc3NhZ2UnOiBuZXcgQXVkaW8oJy4vY2hhdC9hc3NldHMvc291bmRzL3NlbmRpbmcubXAzJylcbiAgICB9XG4gIH1cblxuICBwbGF5IChzb3VuZCkge1xuICAgIHRoaXMuc291bmRzW3NvdW5kXS5wbGF5KClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdWRpb1NlcnZpY2VcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvc2VydmljZXMvYXVkaW9TZXJ2aWNlLmpzIiwiY2xhc3MgQm90aWtTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubmFtZSA9ICdCb3Rpa1NlcnZpY2UnXG4gIH1cblxuICBnZXRSYW5kb21NZXNzYWdlcyAoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICfQoNCw0YHRgdC60LDQttC4INC80L3QtSDRh9GC0L4t0L3QuNCx0YPQtNGMJyxcbiAgICAgICfQnNC90LUg0YHQutGD0YfQvdC+JyxcbiAgICAgICfQniDRh9C10Lwg0YLRiyDQtNGD0LzQsNC10YjRjD8nLFxuICAgICAgJ9Cl0L7Rh9C10YjRjCDQv9C+0LPQvtCy0L7RgNC40YLRjCDQvtCxINGN0YLQvtC8PycsXG4gICAgICAn0JrQsNC6INGC0Ysg0L/RgNC+0LLQtdC7INGB0LLQvtC5INC00LXQvdGMPycsXG4gICAgICAn0KMg0YLQtdCx0Y8g0LXRgdGC0Ywg0L/Qu9Cw0L3RiyDQvdCwINC30LDQstGC0YDQsNGI0L3QuNC5INC00LXQvdGR0Lo/JyxcbiAgICAgICfQotC10LHQtSDQvdGA0LDQstC40YLRgdGPINC/0L7Qs9C+0LTQsCDQt9CwINC+0LrQvtGI0LrQvtC8PycsXG4gICAgICAn0JLQviDRgdC60L7Qu9GM0LrQviDRgtGLINC/0YDQvtGB0L3Rg9C70YHRjz8nLFxuICAgICAgJ9CvINGC0L7QttC1JyxcbiAgICAgICfQkNCz0LAnLFxuICAgICAgJ9CYINGC0LXQsdC1JyxcbiAgICAgICfQpdC80LwsINC40L3RgtC10YDQtdGB0L3QtdC90YzQutC+Li4uJ1xuICAgIF1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCb3Rpa1NlcnZpY2VcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvc2VydmljZXMvYm90aWtTZXJ2aWNlLmpzIiwiLyogZ2xvYmFsIGZldGNoICovXG5pbXBvcnQgeyBzdG9yZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JlU2VydmljZSdcblxuY2xhc3MgTWVzc2FnZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciAoe1xuICAgIGJhc2VVcmxcbiAgfSkge1xuICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmxcbiAgfVxuXG4gIF9yZXF1ZXN0ICgpIHtcbiAgICByZXR1cm4gZmV0Y2goJ2NoYXQvc2VydmljZXMvbW9ja01lc3NhZ2VzLmpzb24nKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgIHJldHVybiBzdG9yZVNlcnZpY2UuZ2V0SlNPTignY2hhdEhpc3RvcnknKVxuICAgICAgfSlcbiAgfVxuXG4gIGdldE1lc3NhZ2VMaXN0ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgpXG4gIH1cblxuICBzYXZlTWVzc2FnZXMgKG1lc3NhZ2VzKSB7XG4gICAgLy8gdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2VzXG4gICAgc3RvcmVTZXJ2aWNlLnNldEpTT04oJ2NoYXRIaXN0b3J5JywgbWVzc2FnZXMpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZVNlcnZpY2VcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvc2VydmljZXMvbWVzc2FnZVNlcnZpY2UuanMiLCJleHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tTnVtYmVyIChtYXgpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChtYXggLSAxKSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvdXRpbHMvdXRpbC5qcyIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwO3B1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NidXR0b24gY2xhc3M9XFxcImJ1dHRvbiBidXR0b24tYmxhY2sgYnV0dG9uX19zaG93LWNoYXRcXFwiIGRhdGEtYWN0aW9uPVxcXCJ0b2dnbGVcXFwiXFx1MDAzRVxcdTAwM0NpIGNsYXNzPVxcXCJmYSBmYS1jaGV2cm9uLXJpZ2h0XFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRmlcXHUwMDNFXFx1MDAzQ1xcdTAwMkZidXR0b25cXHUwMDNFXCI7O3JldHVybiBwdWdfaHRtbDt9O1xubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NoYXQvY29tcG9uZW50cy9jaGF0LWJ1dHRvbi9jaGF0LWJ1dHRvbi5wdWdcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwO3B1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXYgY2xhc3M9XFxcIm1vZGFsIG1vZGFsX19jaGF0IG5vdC12aXNpYmxlXFxcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJtb2RhbF9fYm9keVxcXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwibW9kYWxfX2NvbnRlbnRcXFwiXFx1MDAzRVxcdTAwM0Nmb3JtIGNsYXNzPVxcXCJjaGF0LWxvZ2luXFxcIiBuYW1lPVxcXCJjaGF0LWxvZ2luXFxcIlxcdTAwM0VcXHUwMDNDZmllbGRzZXRcXHUwMDNFXFx1MDAzQ2xhYmVsIGZvcj1cXFwibmFtZVxcXCJcXHUwMDNFRW50ZXIgeW8gbmFtZVxcdTAwM0NcXHUwMDJGbGFiZWxcXHUwMDNFXFx1MDAzQ2lucHV0IGlkPVxcXCJuYW1lXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwibmFtZVxcXCIgcmVxdWlyZWQgYXV0b2ZvY3VzXFx1MDAzRVxcdTAwM0NcXHUwMDJGZmllbGRzZXRcXHUwMDNFXFx1MDAzQ2J1dHRvbiBjbGFzcz1cXFwiYnV0dG9uLXByaW1hcnkgbS1sLTEgZmxvYXQtcmlnaHRcXFwiIHR5cGU9XFxcInN1Ym1pdFxcXCJcXHUwMDNFRW50ZXIgY2hhdFxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcImJ1dHRvbi1vdXRsaW5lIGZsb2F0LXJpZ2h0IG1vZGFsX19jaGF0LWNsb3NlXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiXFx1MDAzRUNsb3NlXFx1MDAzQ1xcdTAwMkZidXR0b25cXHUwMDNFXFx1MDAzQ1xcdTAwMkZmb3JtXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jaGF0L2NvbXBvbmVudHMvbG9naW4tZm9ybS9tb2RhbC5wdWdcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwOzt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uICh1c2VybmFtZSkge3B1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXYgY2xhc3M9XFxcImNvbHVtbi1jZW50ZXIgY2hhdF9fYXBwXFxcIlxcdTAwM0VcXHUwMDNDZGl2XCIgKyAocHVnLmF0dHIoXCJjbGFzc1wiLCBwdWcuY2xhc3NlcyhbXCJsb2dpbi1mYWxzZVwiLHVzZXJuYW1lID8gJ2hpZGRlbicgOiAnJ10sIFtmYWxzZSx0cnVlXSksIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcXHUwMDNDYnV0dG9uIGNsYXNzPVxcXCJidXR0b24tcHJpbWFyeSBjaGF0X19sb2dpbi1idXR0b25cXFwiXFx1MDAzRUpvaW4gY2hhdFxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NkaXZcIiArIChwdWcuYXR0cihcImNsYXNzXCIsIHB1Zy5jbGFzc2VzKFtcImxvZ2luLXRydWVcIiwhdXNlcm5hbWUgPyAnaGlkZGVuJyA6ICcnXSwgW2ZhbHNlLHRydWVdKSwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImNoYXRfX2hlYWRlclxcXCJcXHUwMDNFXFx1MDAzQ2kgY2xhc3M9XFxcImZhIGZhLXVzZXItY2lyY2xlLW8gaGVhZGVyX19hdmF0YXJcXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGaVxcdTAwM0VcXHUwMDNDcCBjbGFzcz1cXFwiaGVhZGVyX19uYW1lXFxcIlxcdTAwM0VDaGF0IHdpdGggQm90aWtcXHUwMDNDXFx1MDAyRnBcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwiY2hhdF9fYm9keVxcXCJcXHUwMDNFXCIgKyAobnVsbCA9PSAocHVnX2ludGVycCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvbWVzc2FnZS1saXN0L2NoYXQtbWVzc2FnZS1saXN0LnB1Z1wiKS5jYWxsKHRoaXMsIGxvY2FscykpID8gXCJcIiA6IHB1Z19pbnRlcnApICsgXCJcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJjaGF0X19mb290ZXJcXFwiXFx1MDAzRVxcdTAwM0Nmb3JtIGNsYXNzPVxcXCJjaGF0X19mb3JtXFxcIiBuYW1lPVxcXCJjaGF0X19mb3JtXFxcIlxcdTAwM0VcXHUwMDNDdGV4dGFyZWEgaWQ9XFxcIm1lc3NhZ2VcXFwiIHBsYWNlaG9sZGVyPVxcXCJFbnRlciBtZXNzYWdlLi4uXFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRnRleHRhcmVhXFx1MDAzRVxcdTAwM0NcXHUwMDJGZm9ybVxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcIjt9LmNhbGwodGhpcyxcInVzZXJuYW1lXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51c2VybmFtZTp0eXBlb2YgdXNlcm5hbWUhPT1cInVuZGVmaW5lZFwiP3VzZXJuYW1lOnVuZGVmaW5lZCkpOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jaGF0L21haW4ucHVnXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiAoaWdub3JlZCkgKi9cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBmcyAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBDaGF0IGZyb20gJy4vY2hhdC9tYWluJ1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1uZXcgKi9cbm5ldyBDaGF0KHtcbiAgZWw6ICcuY2hhdCcsXG4gIGJ1dHRvbkVsOiAnLndlYnNpdGUnLCAvLyBlbGVtZW50IHRvIGFwcGVuZCBjaGF0IHRvb2dsZSBidXR0b24uIE11c3QgYmUgcmVsYXRpdmUuXG4gIGlzT3BlbmVkT25TdGFydDogdHJ1ZSAvLyBkZWZhdWx0IHZhbHVlOiB0cnVlXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
