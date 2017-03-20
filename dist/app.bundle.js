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
exports.getRandomNumber = getRandomNumber;
exports.formatDate = formatDate;
exports.deepEqual = deepEqual;
/**
 * Generate random number
 * @param {number} maximum value
 * @returns {number} random value
 */
function getRandomNumber(max) {
  return Math.round(Math.random() * (max - 1));
}

/**
 * Date format
 * @param {number} date in ms
 * @returns {string} formattedDate
 */
function formatDate(dateString) {
  var dateObj = new Date(dateString);
  var formattedDate = dateObj.getHours() + ':' + dateObj.getMinutes();
  return formattedDate;
}

/**
 * Deep equal arrays
 * @param {array} src - first array
 * @param {array} dest - second array
 * @returns {boolean} true if qual
 */
function deepEqual(src, dest) {
  return JSON.stringify(src) === JSON.stringify(dest);
}

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (formatDate, messages, username) {// iterate messages
;(function(){
  var $$obj = messages;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["chat__message",message.name === username ? 'chat__message-my' : ''], [false,true]), false, true)) + "\u003E\u003Cdiv class=\"message__time\"\u003E" + (pug.escape(null == (pug_interp = message.name === username ? '' : message.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv\u003E" + (pug.escape(null == (pug_interp = message.text) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"message__time float-right\"\u003E" + (pug.escape(null == (pug_interp = formatDate(message.date)) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["chat__message",message.name === username ? 'chat__message-my' : ''], [false,true]), false, true)) + "\u003E\u003Cdiv class=\"message__time\"\u003E" + (pug.escape(null == (pug_interp = message.name === username ? '' : message.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv\u003E" + (pug.escape(null == (pug_interp = message.text) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"message__time float-right\"\u003E" + (pug.escape(null == (pug_interp = formatDate(message.date)) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);
}.call(this,"formatDate" in locals_for_with?locals_for_with.formatDate:typeof formatDate!=="undefined"?formatDate:undefined,"messages" in locals_for_with?locals_for_with.messages:typeof messages!=="undefined"?messages:undefined,"username" in locals_for_with?locals_for_with.username:typeof username!=="undefined"?username:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _main = __webpack_require__(16);

var _main2 = _interopRequireDefault(_main);

var _messageService = __webpack_require__(13);

var _messageService2 = _interopRequireDefault(_messageService);

var _audioService = __webpack_require__(11);

var _audioService2 = _interopRequireDefault(_audioService);

var _botikService = __webpack_require__(12);

var _botikService2 = _interopRequireDefault(_botikService);

var _chatButton = __webpack_require__(6);

var _chatButton2 = _interopRequireDefault(_chatButton);

var _loginForm = __webpack_require__(8);

var _loginForm2 = _interopRequireDefault(_loginForm);

var _messageList = __webpack_require__(10);

var _messageList2 = _interopRequireDefault(_messageList);

var _messageForm = __webpack_require__(9);

var _messageForm2 = _interopRequireDefault(_messageForm);

var _chatBot = __webpack_require__(5);

var _chatBot2 = _interopRequireDefault(_chatBot);

var _storeService = __webpack_require__(2);

var _util = __webpack_require__(1);

var _customEvents = __webpack_require__(7);

var _customEvents2 = _interopRequireDefault(_customEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = function () {
  function Chat(_ref) {
    var el = _ref.el,
        buttonEl = _ref.buttonEl,
        isOpenedOnStart = _ref.isOpenedOnStart;

    _classCallCheck(this, Chat);

    this.el = document.querySelector(el);
    this.buttonEl = document.querySelector(buttonEl);
    this.isOpenedOnStart = isOpenedOnStart;

    this._initToggleButton();
    this._init();
  }

  _createClass(Chat, [{
    key: 'render',
    value: function render() {
      var _this = this;

      this.el.innerHTML = (0, _main2.default)({
        messages: this.messages,
        username: this.userName,
        formatDate: _util.formatDate
      });

      if (!this.isOpenedOnStart) {
        this._onToggle();
      }

      [].concat(_toConsumableArray(this.el.querySelectorAll('.header__name a'))).forEach(function (el) {
        if (el.dataset.action === _this.chatGroup) el.classList.add('active');
      });
    }
  }, {
    key: '_init',
    value: function _init() {
      var _this2 = this;

      this.userName = _storeService.storeService.getItem('chatWidgetName');
      this.chatGroup = _storeService.storeService.getItem('chatWidgetGroup') || 'botik';

      this._initServices();

      this.messageService.getMessageList().then(function (res) {
        _this2.messages = res;
        _this2.render();
        if (!_this2.userName) {
          _this2._initLoginComponent();
        } else {
          _this2._initComponents();
          _this2._initEvents();
        }
        if (_this2.chatGroup !== 'botik') {
          _this2.startPolling();
        }
      });
    }
  }, {
    key: '_initServices',
    value: function _initServices() {
      this.messageService = new _messageService2.default({
        baseUrl: 'https://components-1601-1930.firebaseio.com/chat/messages.json',
        chatGroup: this.chatGroup
      });
      this.audioService = new _audioService2.default();
      this.botikService = new _botikService2.default();
    }
  }, {
    key: '_initToggleButton',
    value: function _initToggleButton() {
      this.chatButton = new _chatButton2.default({
        el: document.createElement('div'),
        parentEl: this.buttonEl,
        isOpenedOnStart: this.isOpenedOnStart,
        EventMixin: _customEvents2.default
      });

      this.chatButton.on('toggle', this._onToggle.bind(this));
    }
  }, {
    key: '_initLoginComponent',
    value: function _initLoginComponent() {
      this.loginForm = new _loginForm2.default({
        el: document.createElement('div'),
        EventMixin: _customEvents2.default
      });

      this.el.appendChild(this.loginForm.el);

      this.el.querySelector('.chat__login-button').addEventListener('click', this.loginForm.toggleModal);

      this.loginForm.on('login', this._onLogin.bind(this));
    }
  }, {
    key: '_initComponents',
    value: function _initComponents() {
      this.messageForm = new _messageForm2.default({
        el: this.el.querySelector('.chat__form'),
        EventMixin: _customEvents2.default
      });

      this.messageList = new _messageList2.default({
        el: this.el.querySelector('.chat__body'),
        username: this.userName,
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
      this.el.querySelector('.header__name').addEventListener('click', this._changeGroup.bind(this));

      this.messageForm.on('message', this._onMessage.bind(this));
    }
  }, {
    key: '_changeGroup',
    value: function _changeGroup(e) {
      e.preventDefault();
      var el = e.target.closest('[data-action]');
      if (el !== null && !el.classList.contains('active')) {
        [].concat(_toConsumableArray(el.parentNode.children)).forEach(function (child) {
          child.classList.toggle('active');
        });
        _storeService.storeService.setItem('chatWidgetGroup', el.dataset.action);
        this.chatGroup = el.dataset.action;
        if (this.chatGroup === 'botik') {
          this.stopPolling();
        }
        this._init();
      }
    }
  }, {
    key: '_onLogin',
    value: function _onLogin(e) {
      this.userName = e.detail.username;
      _storeService.storeService.setItem('chatWidgetName', this.userName);

      this.el.querySelector('.login-false').classList.toggle('hidden');
      this.el.querySelector('.login-true').classList.toggle('hidden');

      this._initComponents();
      this._initEvents();

      if (!this.messages.length && this.userName) {
        this.botik.answer('\u041F\u0440\u0438\u0432\u0435\u0442, ' + this.userName + '!');
      }
    }
  }, {
    key: '_onMessage',
    value: function _onMessage(e) {
      this.messageList.addMessage({
        text: e.detail.text,
        name: this.userName
      });
      this.messageList.render();
      if (this.chatGroup === 'botik') this.botik.answer();
      this.audioService.play('send_message');
    }
  }, {
    key: '_onToggle',
    value: function _onToggle() {
      this.el.classList.toggle('column-25');
      this.el.classList.toggle('column-0');
    }
  }, {
    key: 'startPolling',
    value: function startPolling() {
      var _this3 = this;

      this.__pollingID = setInterval(function () {
        console.log('polling...');
        _this3.messageService.getMessageList().then(function (res) {
          if (!(0, _util.deepEqual)(_this3.messageList.getLocalMessages(), res)) {
            console.log('ch-ch-changes!');
            _this3.messageList.setMessages(res);
            _this3.messageList.render();
            if (_this3.messageList.getLocalMessages()[0].name !== _this3.userName) {
              _this3.audioService.play('receive_message');
            }
          }
        });
      }, 4000);
    }
  }, {
    key: 'stopPolling',
    value: function stopPolling() {
      clearInterval(this.__pollingID);
    }
  }]);

  return Chat;
}();

exports.default = Chat;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(1);

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
          name: 'botik'
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chatMessageList = __webpack_require__(3);

var _chatMessageList2 = _interopRequireDefault(_chatMessageList);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageList = function () {
  function MessageList(_ref) {
    var el = _ref.el,
        username = _ref.username,
        messages = _ref.messages,
        messageService = _ref.messageService;

    _classCallCheck(this, MessageList);

    this.el = el;
    this.messageService = messageService;
    this.messages = messages;
    this.username = username;
  }

  _createClass(MessageList, [{
    key: 'render',
    value: function render() {
      this.el.innerHTML = (0, _chatMessageList2.default)({
        messages: this.messages,
        username: this.username,
        formatDate: _util.formatDate
      });
    }
  }, {
    key: 'getLocalMessages',
    value: function getLocalMessages() {
      return this.messages;
    }
  }, {
    key: 'setMessages',
    value: function setMessages(messages) {
      this.messages = messages;
    }
  }, {
    key: 'addMessage',
    value: function addMessage(data) {
      var message = { // unshift is no good
        text: data.text,
        name: data.name || this.username,
        date: Date.now()
      };
      this.messages.unshift(message);
      this.messageService.saveMessages(this.messages, message);
    }
  }]);

  return MessageList;
}();

exports.default = MessageList;

/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global fetch */


var _storeService = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageService = function () {
  function MessageService(_ref) {
    var baseUrl = _ref.baseUrl,
        chatGroup = _ref.chatGroup;

    _classCallCheck(this, MessageService);

    this.baseUrl = baseUrl;
    this.chatGroup = chatGroup;
  }

  _createClass(MessageService, [{
    key: '_request',
    value: function _request() {
      var _this = this;

      return fetch(this.baseUrl) // 'chat/services/mockMessages.json'
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        return Object.values(json).reverse();
      }).catch(function (err) {
        console.log(err);
        return _storeService.storeService.getJSON('chatHistory-' + _this.chatGroup);
      });
    }
  }, {
    key: 'getMessageList',
    value: function getMessageList() {
      var _this2 = this;

      if (this.chatGroup !== 'botik') {
        return this._request();
      } else {
        return new Promise(function (resolve) {
          resolve(_storeService.storeService.getJSON('chatHistory-' + _this2.chatGroup));
        });
      }
    }
  }, {
    key: 'saveMessages',
    value: function saveMessages(messages, message) {
      if (this.chatGroup !== 'botik') {
        fetch(this.baseUrl, {
          method: 'POST',
          body: JSON.stringify(message)
        }).then(function (response) {
          console.log(response);
        }).catch(function (err) {
          console.log(err);
        });
      }
      _storeService.storeService.setJSON('chatHistory-' + this.chatGroup, messages);
    }
  }]);

  return MessageService;
}();

exports.default = MessageService;

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

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (username) {pug_html = pug_html + "\u003Cdiv class=\"column-center chat__app\"\u003E\u003Cdiv" + (pug.attr("class", pug.classes(["login-false",username ? 'hidden' : ''], [false,true]), false, true)) + "\u003E\u003Cbutton class=\"button-primary chat__login-button\"\u003EJoin chat\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv" + (pug.attr("class", pug.classes(["login-true",!username ? 'hidden' : ''], [false,true]), false, true)) + "\u003E\u003Cdiv class=\"chat__header\"\u003E\u003Ci class=\"fa fa-user-circle-o header__avatar\"\u003E\u003C\u002Fi\u003E\u003Cp class=\"header__name\"\u003EChat with&nbsp;\u003Ca href=\"#\" data-action=\"botik\"\u003EBotik\u003C\u002Fa\u003E&nbsp; | &nbsp;\u003Ca href=\"#\" data-action=\"group\"\u003EGroup\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__body\"\u003E" + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__footer\"\u003E\u003Cform class=\"chat__form\" name=\"chat__form\"\u003E\u003Ctextarea id=\"message\" placeholder=\"Enter message...\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"username" in locals_for_with?locals_for_with.username:typeof username!=="undefined"?username:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(4);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjA4NzI2OGI3YjIxNzcxZjc1MjAiLCJ3ZWJwYWNrOi8vLy4vfi9wdWctcnVudGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L3V0aWxzL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9zZXJ2aWNlcy9zdG9yZVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9jaGF0LW1lc3NhZ2UtbGlzdC5wdWciLCJ3ZWJwYWNrOi8vLy4vY2hhdC9tYWluLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9ib3Rpay9jaGF0Qm90LmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9jaGF0LWJ1dHRvbi9jaGF0QnV0dG9uLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9jb21tb24vY3VzdG9tRXZlbnRzLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9sb2dpbi1mb3JtL2xvZ2luRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L2NvbXBvbmVudHMvbWVzc2FnZS1mb3JtL21lc3NhZ2VGb3JtLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9tZXNzYWdlLWxpc3QvbWVzc2FnZUxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9zZXJ2aWNlcy9hdWRpb1NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9zZXJ2aWNlcy9ib3Rpa1NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9zZXJ2aWNlcy9tZXNzYWdlU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L2NvbXBvbmVudHMvY2hhdC1idXR0b24vY2hhdC1idXR0b24ucHVnIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9sb2dpbi1mb3JtL21vZGFsLnB1ZyIsIndlYnBhY2s6Ly8vLi9jaGF0L21haW4ucHVnIiwid2VicGFjazovLy9mcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIl0sIm5hbWVzIjpbImdldFJhbmRvbU51bWJlciIsImZvcm1hdERhdGUiLCJkZWVwRXF1YWwiLCJtYXgiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJkYXRlU3RyaW5nIiwiZGF0ZU9iaiIsIkRhdGUiLCJmb3JtYXR0ZWREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwic3JjIiwiZGVzdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdG9yZVNlcnZpY2UiLCJnZXRJdGVtIiwia2V5IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInN0cmluZyIsInJlbW92ZSIsInJlbW92ZUl0ZW0iLCJnZXRKU09OIiwicGFyc2UiLCJzZXRKU09OIiwib2JqIiwiQ2hhdCIsImVsIiwiYnV0dG9uRWwiLCJpc09wZW5lZE9uU3RhcnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJfaW5pdFRvZ2dsZUJ1dHRvbiIsIl9pbml0IiwiaW5uZXJIVE1MIiwibWVzc2FnZXMiLCJ1c2VybmFtZSIsInVzZXJOYW1lIiwiX29uVG9nZ2xlIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJkYXRhc2V0IiwiYWN0aW9uIiwiY2hhdEdyb3VwIiwiY2xhc3NMaXN0IiwiYWRkIiwiX2luaXRTZXJ2aWNlcyIsIm1lc3NhZ2VTZXJ2aWNlIiwiZ2V0TWVzc2FnZUxpc3QiLCJ0aGVuIiwicmVzIiwicmVuZGVyIiwiX2luaXRMb2dpbkNvbXBvbmVudCIsIl9pbml0Q29tcG9uZW50cyIsIl9pbml0RXZlbnRzIiwic3RhcnRQb2xsaW5nIiwiYmFzZVVybCIsImF1ZGlvU2VydmljZSIsImJvdGlrU2VydmljZSIsImNoYXRCdXR0b24iLCJjcmVhdGVFbGVtZW50IiwicGFyZW50RWwiLCJFdmVudE1peGluIiwib24iLCJiaW5kIiwibG9naW5Gb3JtIiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwidG9nZ2xlTW9kYWwiLCJfb25Mb2dpbiIsIm1lc3NhZ2VGb3JtIiwibWVzc2FnZUxpc3QiLCJib3RpayIsIl9jaGFuZ2VHcm91cCIsIl9vbk1lc3NhZ2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiY29udGFpbnMiLCJwYXJlbnROb2RlIiwiY2hpbGRyZW4iLCJjaGlsZCIsInRvZ2dsZSIsInN0b3BQb2xsaW5nIiwiZGV0YWlsIiwibGVuZ3RoIiwiYW5zd2VyIiwiYWRkTWVzc2FnZSIsInRleHQiLCJuYW1lIiwicGxheSIsIl9fcG9sbGluZ0lEIiwic2V0SW50ZXJ2YWwiLCJjb25zb2xlIiwibG9nIiwiZ2V0TG9jYWxNZXNzYWdlcyIsInNldE1lc3NhZ2VzIiwiY2xlYXJJbnRlcnZhbCIsIkNoYXRCb3QiLCJhbnN3ZXJzIiwiZ2V0UmFuZG9tTWVzc2FnZXMiLCJtZXNzYWdlIiwic2V0VGltZW91dCIsIkNoYXRCdXR0b24iLCJhcHBseSIsIl90b2dnbGUiLCJmaXJzdENoaWxkIiwidHJpZ2dlciIsImNiIiwiZGF0YSIsImV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiTG9naW5Gb3JtIiwiY2hhdE1vZGFsIiwiY2hhdE1vZGFsQ2xvc2UiLCJjaGF0TW9kYWxTdWJtaXQiLCJ2YWx1ZSIsInN1Ym1pdExvZ2luRm9ybSIsIk1lc3NhZ2VGb3JtIiwibWVzc2FnZVRleHRhcmVhIiwicmVzZXQiLCJjaGFyQ29kZSIsInNoaWZ0S2V5IiwidHJpbSIsInN1Ym1pdE1lc3NhZ2VGb3JtIiwiTWVzc2FnZUxpc3QiLCJkYXRlIiwibm93IiwidW5zaGlmdCIsInNhdmVNZXNzYWdlcyIsIkF1ZGlvU2VydmljZSIsInNvdW5kcyIsIkF1ZGlvIiwic291bmQiLCJCb3Rpa1NlcnZpY2UiLCJNZXNzYWdlU2VydmljZSIsImZldGNoIiwicmVzcG9uc2UiLCJqc29uIiwiT2JqZWN0IiwidmFsdWVzIiwicmV2ZXJzZSIsImNhdGNoIiwiZXJyIiwiX3JlcXVlc3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm1ldGhvZCIsImJvZHki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Ozs7O0FDL0NmOztBQUVBLDJCQUEyQixrQ0FBa0MsYUFBYSx5TUFBeU07QUFDblIsMEI7Ozs7OztBQ0hBOztBQUVBLDJCQUEyQixrQ0FBa0MsYUFBYSxvdEJBQW90QjtBQUM5eEIsMEI7Ozs7OztBQ0hBOztBQUVBLDJCQUEyQixrQ0FBa0MsY0FBYyxtQ0FBbUMsRUFBRSxzQkFBc0IsMGxCQUEwbEIsNEVBQTRFLFNBQVMsd2hCQUE0akIsc0hBQXNIO0FBQ3YrQywwQjs7Ozs7O0FDSEEsZTs7Ozs7Ozs7O0FDQUE7Ozs7OztBQUVBO0FBQ0EsbUJBQVM7QUFDUDlHLE1BQUksT0FERztBQUVQQyxZQUFVLFVBRkgsRUFFZTtBQUN0QkMsbUJBQWlCLElBSFYsQ0FHZTtBQUhmLENBQVQsRSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGYwODcyNjhiN2IyMTc3MWY3NTIwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVnX2hhc19vd25fcHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBwdWdfbWVyZ2U7XG5mdW5jdGlvbiBwdWdfbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IHB1Z19tZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSA9PT0gJ2NsYXNzJykge1xuICAgICAgdmFyIHZhbEEgPSBhW2tleV0gfHwgW107XG4gICAgICBhW2tleV0gPSAoQXJyYXkuaXNBcnJheSh2YWxBKSA/IHZhbEEgOiBbdmFsQV0pLmNvbmNhdChiW2tleV0gfHwgW10pO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICB2YXIgdmFsQSA9IHB1Z19zdHlsZShhW2tleV0pO1xuICAgICAgdmFyIHZhbEIgPSBwdWdfc3R5bGUoYltrZXldKTtcbiAgICAgIGFba2V5XSA9IHZhbEEgKyB2YWxCO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYXJyYXksIG9iamVjdCwgb3Igc3RyaW5nIGFzIGEgc3RyaW5nIG9mIGNsYXNzZXMgZGVsaW1pdGVkIGJ5IGEgc3BhY2UuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gYXJyYXksIGFsbCBtZW1iZXJzIG9mIGl0IGFuZCBpdHMgc3ViYXJyYXlzIGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBJZiBgZXNjYXBpbmdgIGlzIGFuIGFycmF5LCB0aGVuIHdoZXRoZXIgb3Igbm90IHRoZSBpdGVtIGluIGB2YWxgIGlzXG4gKiBlc2NhcGVkIGRlcGVuZHMgb24gdGhlIGNvcnJlc3BvbmRpbmcgaXRlbSBpbiBgZXNjYXBpbmdgLiBJZiBgZXNjYXBpbmdgIGlzXG4gKiBub3QgYW4gYXJyYXksIG5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gb2JqZWN0LCBhbGwgdGhlIGtleXMgd2hvc2UgdmFsdWUgaXMgdHJ1dGh5IGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBObyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIElmIGB2YWxgIGlzIGEgc3RyaW5nLCBpdCBpcyBjb3VudGVkIGFzIGEgY2xhc3MuIE5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogQHBhcmFtIHsoQXJyYXkuPHN0cmluZz58T2JqZWN0LjxzdHJpbmcsIGJvb2xlYW4+fHN0cmluZyl9IHZhbFxuICogQHBhcmFtIHs/QXJyYXkuPHN0cmluZz59IGVzY2FwaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xhc3NlcyA9IHB1Z19jbGFzc2VzO1xuZnVuY3Rpb24gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZykge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgY2xhc3NOYW1lLCBwYWRkaW5nID0gJycsIGVzY2FwZUVuYWJsZWQgPSBBcnJheS5pc0FycmF5KGVzY2FwaW5nKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICBjbGFzc05hbWUgPSBwdWdfY2xhc3Nlcyh2YWxbaV0pO1xuICAgIGlmICghY2xhc3NOYW1lKSBjb250aW51ZTtcbiAgICBlc2NhcGVFbmFibGVkICYmIGVzY2FwaW5nW2ldICYmIChjbGFzc05hbWUgPSBwdWdfZXNjYXBlKGNsYXNzTmFtZSkpO1xuICAgIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgKyBwYWRkaW5nICsgY2xhc3NOYW1lO1xuICAgIHBhZGRpbmcgPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNsYXNzU3RyaW5nO1xufVxuZnVuY3Rpb24gcHVnX2NsYXNzZXNfb2JqZWN0KHZhbCkge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgcGFkZGluZyA9ICcnO1xuICBmb3IgKHZhciBrZXkgaW4gdmFsKSB7XG4gICAgaWYgKGtleSAmJiB2YWxba2V5XSAmJiBwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwga2V5KSkge1xuICAgICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHBhZGRpbmcgKyBrZXk7XG4gICAgICBwYWRkaW5nID0gJyAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2xhc3NTdHJpbmc7XG59XG5mdW5jdGlvbiBwdWdfY2xhc3Nlcyh2YWwsIGVzY2FwaW5nKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICByZXR1cm4gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZyk7XG4gIH0gZWxzZSBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHB1Z19jbGFzc2VzX29iamVjdCh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWwgfHwgJyc7XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IG9iamVjdCBvciBzdHJpbmcgdG8gYSBzdHJpbmcgb2YgQ1NTIHN0eWxlcyBkZWxpbWl0ZWQgYnkgYSBzZW1pY29sb24uXG4gKlxuICogQHBhcmFtIHsoT2JqZWN0LjxzdHJpbmcsIHN0cmluZz58c3RyaW5nKX0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZXhwb3J0cy5zdHlsZSA9IHB1Z19zdHlsZTtcbmZ1bmN0aW9uIHB1Z19zdHlsZSh2YWwpIHtcbiAgaWYgKCF2YWwpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIHN0eWxlIGluIHZhbCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwgc3R5bGUpKSB7XG4gICAgICAgIG91dCA9IG91dCArIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXSArICc7JztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfSBlbHNlIHtcbiAgICB2YWwgKz0gJyc7XG4gICAgaWYgKHZhbFt2YWwubGVuZ3RoIC0gMV0gIT09ICc7JykgXG4gICAgICByZXR1cm4gdmFsICsgJzsnO1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IHB1Z19hdHRyO1xuZnVuY3Rpb24gcHVnX2F0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmICh2YWwgPT09IGZhbHNlIHx8IHZhbCA9PSBudWxsIHx8ICF2YWwgJiYgKGtleSA9PT0gJ2NsYXNzJyB8fCBrZXkgPT09ICdzdHlsZScpKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbC50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YWwgPSB2YWwudG9KU09OKCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICBpZiAoIWVzY2FwZWQgJiYgdmFsLmluZGV4T2YoJ1wiJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cXCcnICsgdmFsLnJlcGxhY2UoLycvZywgJyYjMzk7JykgKyAnXFwnJztcbiAgICB9XG4gIH1cbiAgaWYgKGVzY2FwZWQpIHZhbCA9IHB1Z19lc2NhcGUodmFsKTtcbiAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gdGVyc2Ugd2hldGhlciB0byB1c2UgSFRNTDUgdGVyc2UgYm9vbGVhbiBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBwdWdfYXR0cnM7XG5mdW5jdGlvbiBwdWdfYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBhdHRycyA9ICcnO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAocHVnX2hhc19vd25fcHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfY2xhc3Nlcyh2YWwpO1xuICAgICAgICBhdHRycyA9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpICsgYXR0cnM7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKCdzdHlsZScgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfc3R5bGUodmFsKTtcbiAgICAgIH1cbiAgICAgIGF0dHJzICs9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdHRycztcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgcHVnX21hdGNoX2h0bWwgPSAvW1wiJjw+XS87XG5leHBvcnRzLmVzY2FwZSA9IHB1Z19lc2NhcGU7XG5mdW5jdGlvbiBwdWdfZXNjYXBlKF9odG1sKXtcbiAgdmFyIGh0bWwgPSAnJyArIF9odG1sO1xuICB2YXIgcmVnZXhSZXN1bHQgPSBwdWdfbWF0Y2hfaHRtbC5leGVjKGh0bWwpO1xuICBpZiAoIXJlZ2V4UmVzdWx0KSByZXR1cm4gX2h0bWw7XG5cbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgaSwgbGFzdEluZGV4LCBlc2NhcGU7XG4gIGZvciAoaSA9IHJlZ2V4UmVzdWx0LmluZGV4LCBsYXN0SW5kZXggPSAwOyBpIDwgaHRtbC5sZW5ndGg7IGkrKykge1xuICAgIHN3aXRjaCAoaHRtbC5jaGFyQ29kZUF0KGkpKSB7XG4gICAgICBjYXNlIDM0OiBlc2NhcGUgPSAnJnF1b3Q7JzsgYnJlYWs7XG4gICAgICBjYXNlIDM4OiBlc2NhcGUgPSAnJmFtcDsnOyBicmVhaztcbiAgICAgIGNhc2UgNjA6IGVzY2FwZSA9ICcmbHQ7JzsgYnJlYWs7XG4gICAgICBjYXNlIDYyOiBlc2NhcGUgPSAnJmd0Oyc7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogY29udGludWU7XG4gICAgfVxuICAgIGlmIChsYXN0SW5kZXggIT09IGkpIHJlc3VsdCArPSBodG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsIGkpO1xuICAgIGxhc3RJbmRleCA9IGkgKyAxO1xuICAgIHJlc3VsdCArPSBlc2NhcGU7XG4gIH1cbiAgaWYgKGxhc3RJbmRleCAhPT0gaSkgcmV0dXJuIHJlc3VsdCArIGh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCwgaSk7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgcHVnIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIG9yaWdpbmFsIHNvdXJjZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gcHVnX3JldGhyb3c7XG5mdW5jdGlvbiBwdWdfcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcHVnX3JldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdQdWcnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wdWctcnVudGltZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEdlbmVyYXRlIHJhbmRvbSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXhpbXVtIHZhbHVlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSByYW5kb20gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbU51bWJlciAobWF4KSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gMSkpXG59XG5cbi8qKlxuICogRGF0ZSBmb3JtYXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIGluIG1zXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBmb3JtYXR0ZWREYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlIChkYXRlU3RyaW5nKSB7XG4gIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZShkYXRlU3RyaW5nKVxuICBjb25zdCBmb3JtYXR0ZWREYXRlID0gZGF0ZU9iai5nZXRIb3VycygpICsgJzonICsgZGF0ZU9iai5nZXRNaW51dGVzKClcbiAgcmV0dXJuIGZvcm1hdHRlZERhdGVcbn1cblxuLyoqXG4gKiBEZWVwIGVxdWFsIGFycmF5c1xuICogQHBhcmFtIHthcnJheX0gc3JjIC0gZmlyc3QgYXJyYXlcbiAqIEBwYXJhbSB7YXJyYXl9IGRlc3QgLSBzZWNvbmQgYXJyYXlcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHF1YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBFcXVhbCAoc3JjLCBkZXN0KSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShzcmMpID09PSBKU09OLnN0cmluZ2lmeShkZXN0KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC91dGlscy91dGlsLmpzIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cblxuZXhwb3J0IGNvbnN0IHN0b3JlU2VydmljZSA9IHtcbiAgZ2V0SXRlbTogKGtleSkgPT4ge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpIHx8ICcnXG4gIH0sXG4gIHNldEl0ZW06IChrZXksIHN0cmluZykgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgc3RyaW5nKVxuICB9LFxuXG4gIHJlbW92ZTogKGtleSkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSlcbiAgfSxcblxuICBnZXRKU09OOiAoa2V5KSA9PiB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSB8fCAnW10nKVxuICB9LFxuICBzZXRKU09OOiAoa2V5LCBvYmopID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KG9iaikpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvc2VydmljZXMvc3RvcmVTZXJ2aWNlLmpzIiwidmFyIHB1ZyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3B1Zy1ydW50aW1lL2luZGV4LmpzXCIpO1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHt2YXIgcHVnX2h0bWwgPSBcIlwiLCBwdWdfbWl4aW5zID0ge30sIHB1Z19pbnRlcnA7O3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGZvcm1hdERhdGUsIG1lc3NhZ2VzLCB1c2VybmFtZSkgey8vIGl0ZXJhdGUgbWVzc2FnZXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbWVzc2FnZXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBwdWdfaW5kZXgwID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyBwdWdfaW5kZXgwIDwgJCRsOyBwdWdfaW5kZXgwKyspIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAkJG9ialtwdWdfaW5kZXgwXTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXZcIiArIChwdWcuYXR0cihcImNsYXNzXCIsIHB1Zy5jbGFzc2VzKFtcImNoYXRfX21lc3NhZ2VcIixtZXNzYWdlLm5hbWUgPT09IHVzZXJuYW1lID8gJ2NoYXRfX21lc3NhZ2UtbXknIDogJyddLCBbZmFsc2UsdHJ1ZV0pLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwibWVzc2FnZV9fdGltZVxcXCJcXHUwMDNFXCIgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gbWVzc2FnZS5uYW1lID09PSB1c2VybmFtZSA/ICcnIDogbWVzc2FnZS5uYW1lKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NkaXZcXHUwMDNFXCIgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gbWVzc2FnZS50ZXh0KSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcIm1lc3NhZ2VfX3RpbWUgZmxvYXQtcmlnaHRcXFwiXFx1MDAzRVwiICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IGZvcm1hdERhdGUobWVzc2FnZS5kYXRlKSkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcIjtcbiAgICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciBwdWdfaW5kZXgwIGluICQkb2JqKSB7XG4gICAgICAkJGwrKztcbiAgICAgIHZhciBtZXNzYWdlID0gJCRvYmpbcHVnX2luZGV4MF07XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZGl2XCIgKyAocHVnLmF0dHIoXCJjbGFzc1wiLCBwdWcuY2xhc3NlcyhbXCJjaGF0X19tZXNzYWdlXCIsbWVzc2FnZS5uYW1lID09PSB1c2VybmFtZSA/ICdjaGF0X19tZXNzYWdlLW15JyA6ICcnXSwgW2ZhbHNlLHRydWVdKSwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcIm1lc3NhZ2VfX3RpbWVcXFwiXFx1MDAzRVwiICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IG1lc3NhZ2UubmFtZSA9PT0gdXNlcm5hbWUgPyAnJyA6IG1lc3NhZ2UubmFtZSkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2XFx1MDAzRVwiICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IG1lc3NhZ2UudGV4dCkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJtZXNzYWdlX190aW1lIGZsb2F0LXJpZ2h0XFxcIlxcdTAwM0VcIiArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBmb3JtYXREYXRlKG1lc3NhZ2UuZGF0ZSkpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXCI7XG4gICAgfVxuICB9XG59KS5jYWxsKHRoaXMpO1xufS5jYWxsKHRoaXMsXCJmb3JtYXREYXRlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5mb3JtYXREYXRlOnR5cGVvZiBmb3JtYXREYXRlIT09XCJ1bmRlZmluZWRcIj9mb3JtYXREYXRlOnVuZGVmaW5lZCxcIm1lc3NhZ2VzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5tZXNzYWdlczp0eXBlb2YgbWVzc2FnZXMhPT1cInVuZGVmaW5lZFwiP21lc3NhZ2VzOnVuZGVmaW5lZCxcInVzZXJuYW1lXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51c2VybmFtZTp0eXBlb2YgdXNlcm5hbWUhPT1cInVuZGVmaW5lZFwiP3VzZXJuYW1lOnVuZGVmaW5lZCkpOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jaGF0L2NvbXBvbmVudHMvbWVzc2FnZS1saXN0L2NoYXQtbWVzc2FnZS1saXN0LnB1Z1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgY2hhdFRtcGwgZnJvbSAnLi9tYWluLnB1ZydcblxuaW1wb3J0IE1lc3NhZ2VTZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvbWVzc2FnZVNlcnZpY2UnXG5pbXBvcnQgQXVkaW9TZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvYXVkaW9TZXJ2aWNlJ1xuaW1wb3J0IEJvdGlrU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL2JvdGlrU2VydmljZSdcblxuaW1wb3J0IENoYXRCdXR0b24gZnJvbSAnLi9jb21wb25lbnRzL2NoYXQtYnV0dG9uL2NoYXRCdXR0b24nXG5pbXBvcnQgTG9naW5Gb3JtIGZyb20gJy4vY29tcG9uZW50cy9sb2dpbi1mb3JtL2xvZ2luRm9ybSdcbmltcG9ydCBNZXNzYWdlTGlzdCBmcm9tICcuL2NvbXBvbmVudHMvbWVzc2FnZS1saXN0L21lc3NhZ2VMaXN0J1xuaW1wb3J0IE1lc3NhZ2VGb3JtIGZyb20gJy4vY29tcG9uZW50cy9tZXNzYWdlLWZvcm0vbWVzc2FnZUZvcm0nXG5pbXBvcnQgQm90aWsgZnJvbSAnLi9jb21wb25lbnRzL2JvdGlrL2NoYXRCb3QnXG5cbmltcG9ydCB7IHN0b3JlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3RvcmVTZXJ2aWNlJ1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSwgZGVlcEVxdWFsIH0gZnJvbSAnLi91dGlscy91dGlsJ1xuaW1wb3J0IEV2ZW50TWl4aW4gZnJvbSAnLi9jb21wb25lbnRzL2NvbW1vbi9jdXN0b21FdmVudHMnXG5cbmNsYXNzIENoYXQge1xuICBjb25zdHJ1Y3RvciAoe1xuICAgIGVsLFxuICAgIGJ1dHRvbkVsLFxuICAgIGlzT3BlbmVkT25TdGFydFxuICB9KSB7XG4gICAgdGhpcy5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG4gICAgdGhpcy5idXR0b25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uRWwpXG4gICAgdGhpcy5pc09wZW5lZE9uU3RhcnQgPSBpc09wZW5lZE9uU3RhcnRcblxuICAgIHRoaXMuX2luaXRUb2dnbGVCdXR0b24oKVxuICAgIHRoaXMuX2luaXQoKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICB0aGlzLmVsLmlubmVySFRNTCA9IGNoYXRUbXBsKHtcbiAgICAgIG1lc3NhZ2VzOiB0aGlzLm1lc3NhZ2VzLFxuICAgICAgdXNlcm5hbWU6IHRoaXMudXNlck5hbWUsXG4gICAgICBmb3JtYXREYXRlOiBmb3JtYXREYXRlXG4gICAgfSlcblxuICAgIGlmICghdGhpcy5pc09wZW5lZE9uU3RhcnQpIHtcbiAgICAgIHRoaXMuX29uVG9nZ2xlKClcbiAgICB9XG5cbiAgICBbLi4udGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKCcuaGVhZGVyX19uYW1lIGEnKV0uZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGlmIChlbC5kYXRhc2V0LmFjdGlvbiA9PT0gdGhpcy5jaGF0R3JvdXApIGVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgfSlcbiAgfVxuXG4gIF9pbml0ICgpIHtcbiAgICB0aGlzLnVzZXJOYW1lID0gc3RvcmVTZXJ2aWNlLmdldEl0ZW0oJ2NoYXRXaWRnZXROYW1lJylcbiAgICB0aGlzLmNoYXRHcm91cCA9IHN0b3JlU2VydmljZS5nZXRJdGVtKCdjaGF0V2lkZ2V0R3JvdXAnKSB8fCAnYm90aWsnXG5cbiAgICB0aGlzLl9pbml0U2VydmljZXMoKVxuXG4gICAgdGhpcy5tZXNzYWdlU2VydmljZS5nZXRNZXNzYWdlTGlzdCgpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSByZXNcbiAgICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgICBpZiAoIXRoaXMudXNlck5hbWUpIHtcbiAgICAgICAgICB0aGlzLl9pbml0TG9naW5Db21wb25lbnQoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2luaXRDb21wb25lbnRzKClcbiAgICAgICAgICB0aGlzLl9pbml0RXZlbnRzKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jaGF0R3JvdXAgIT09ICdib3RpaycpIHtcbiAgICAgICAgICB0aGlzLnN0YXJ0UG9sbGluZygpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cblxuICBfaW5pdFNlcnZpY2VzICgpIHtcbiAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlID0gbmV3IE1lc3NhZ2VTZXJ2aWNlKHtcbiAgICAgIGJhc2VVcmw6ICdodHRwczovL2NvbXBvbmVudHMtMTYwMS0xOTMwLmZpcmViYXNlaW8uY29tL2NoYXQvbWVzc2FnZXMuanNvbicsXG4gICAgICBjaGF0R3JvdXA6IHRoaXMuY2hhdEdyb3VwXG4gICAgfSlcbiAgICB0aGlzLmF1ZGlvU2VydmljZSA9IG5ldyBBdWRpb1NlcnZpY2UoKVxuICAgIHRoaXMuYm90aWtTZXJ2aWNlID0gbmV3IEJvdGlrU2VydmljZSgpXG4gIH1cblxuICBfaW5pdFRvZ2dsZUJ1dHRvbiAoKSB7XG4gICAgdGhpcy5jaGF0QnV0dG9uID0gbmV3IENoYXRCdXR0b24oe1xuICAgICAgZWw6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgcGFyZW50RWw6IHRoaXMuYnV0dG9uRWwsXG4gICAgICBpc09wZW5lZE9uU3RhcnQ6IHRoaXMuaXNPcGVuZWRPblN0YXJ0LFxuICAgICAgRXZlbnRNaXhpblxuICAgIH0pXG5cbiAgICB0aGlzLmNoYXRCdXR0b24ub24oJ3RvZ2dsZScsIHRoaXMuX29uVG9nZ2xlLmJpbmQodGhpcykpXG4gIH1cblxuICBfaW5pdExvZ2luQ29tcG9uZW50ICgpIHtcbiAgICB0aGlzLmxvZ2luRm9ybSA9IG5ldyBMb2dpbkZvcm0oe1xuICAgICAgZWw6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgRXZlbnRNaXhpblxuICAgIH0pXG5cbiAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMubG9naW5Gb3JtLmVsKVxuXG4gICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcuY2hhdF9fbG9naW4tYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmxvZ2luRm9ybS50b2dnbGVNb2RhbClcblxuICAgIHRoaXMubG9naW5Gb3JtLm9uKCdsb2dpbicsIHRoaXMuX29uTG9naW4uYmluZCh0aGlzKSlcbiAgfVxuXG4gIF9pbml0Q29tcG9uZW50cyAoKSB7XG4gICAgdGhpcy5tZXNzYWdlRm9ybSA9IG5ldyBNZXNzYWdlRm9ybSh7XG4gICAgICBlbDogdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcuY2hhdF9fZm9ybScpLFxuICAgICAgRXZlbnRNaXhpblxuICAgIH0pXG5cbiAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gbmV3IE1lc3NhZ2VMaXN0KHtcbiAgICAgIGVsOiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGF0X19ib2R5JyksXG4gICAgICB1c2VybmFtZTogdGhpcy51c2VyTmFtZSxcbiAgICAgIG1lc3NhZ2VzOiB0aGlzLm1lc3NhZ2VzLFxuICAgICAgbWVzc2FnZVNlcnZpY2U6IHRoaXMubWVzc2FnZVNlcnZpY2VcbiAgICB9KVxuXG4gICAgdGhpcy5ib3RpayA9IG5ldyBCb3Rpayh7XG4gICAgICBhdWRpb1NlcnZpY2U6IHRoaXMuYXVkaW9TZXJ2aWNlLFxuICAgICAgbWVzc2FnZUxpc3Q6IHRoaXMubWVzc2FnZUxpc3QsXG4gICAgICBib3Rpa1NlcnZpY2U6IHRoaXMuYm90aWtTZXJ2aWNlXG4gICAgfSlcbiAgfVxuXG4gIF9pbml0RXZlbnRzICgpIHtcbiAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX25hbWUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NoYW5nZUdyb3VwLmJpbmQodGhpcykpXG5cbiAgICB0aGlzLm1lc3NhZ2VGb3JtLm9uKCdtZXNzYWdlJywgdGhpcy5fb25NZXNzYWdlLmJpbmQodGhpcykpXG4gIH1cblxuICBfY2hhbmdlR3JvdXAgKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCBlbCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWFjdGlvbl0nKVxuICAgIGlmIChlbCAhPT0gbnVsbCAmJiAhZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgWy4uLmVsLnBhcmVudE5vZGUuY2hpbGRyZW5dLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgIGNoaWxkLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICB9KVxuICAgICAgc3RvcmVTZXJ2aWNlLnNldEl0ZW0oJ2NoYXRXaWRnZXRHcm91cCcsIGVsLmRhdGFzZXQuYWN0aW9uKVxuICAgICAgdGhpcy5jaGF0R3JvdXAgPSBlbC5kYXRhc2V0LmFjdGlvblxuICAgICAgaWYgKHRoaXMuY2hhdEdyb3VwID09PSAnYm90aWsnKSB7XG4gICAgICAgIHRoaXMuc3RvcFBvbGxpbmcoKVxuICAgICAgfVxuICAgICAgdGhpcy5faW5pdCgpXG4gICAgfVxuICB9XG5cbiAgX29uTG9naW4gKGUpIHtcbiAgICB0aGlzLnVzZXJOYW1lID0gZS5kZXRhaWwudXNlcm5hbWVcbiAgICBzdG9yZVNlcnZpY2Uuc2V0SXRlbSgnY2hhdFdpZGdldE5hbWUnLCB0aGlzLnVzZXJOYW1lKVxuXG4gICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubG9naW4tZmFsc2UnKS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmxvZ2luLXRydWUnKS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuXG4gICAgdGhpcy5faW5pdENvbXBvbmVudHMoKVxuICAgIHRoaXMuX2luaXRFdmVudHMoKVxuXG4gICAgaWYgKCF0aGlzLm1lc3NhZ2VzLmxlbmd0aCAmJiB0aGlzLnVzZXJOYW1lKSB7XG4gICAgICB0aGlzLmJvdGlrLmFuc3dlcihg0J/RgNC40LLQtdGCLCAke3RoaXMudXNlck5hbWV9IWApXG4gICAgfVxuICB9XG5cbiAgX29uTWVzc2FnZSAoZSkge1xuICAgIHRoaXMubWVzc2FnZUxpc3QuYWRkTWVzc2FnZSh7XG4gICAgICB0ZXh0OiBlLmRldGFpbC50ZXh0LFxuICAgICAgbmFtZTogdGhpcy51c2VyTmFtZVxuICAgIH0pXG4gICAgdGhpcy5tZXNzYWdlTGlzdC5yZW5kZXIoKVxuICAgIGlmICh0aGlzLmNoYXRHcm91cCA9PT0gJ2JvdGlrJykgdGhpcy5ib3Rpay5hbnN3ZXIoKVxuICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnBsYXkoJ3NlbmRfbWVzc2FnZScpXG4gIH1cblxuICBfb25Ub2dnbGUgKCkge1xuICAgIHRoaXMuZWwuY2xhc3NMaXN0LnRvZ2dsZSgnY29sdW1uLTI1JylcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC50b2dnbGUoJ2NvbHVtbi0wJylcbiAgfVxuXG4gIHN0YXJ0UG9sbGluZyAoKSB7XG4gICAgdGhpcy5fX3BvbGxpbmdJRCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdwb2xsaW5nLi4uJylcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZ2V0TWVzc2FnZUxpc3QoKVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKCFkZWVwRXF1YWwodGhpcy5tZXNzYWdlTGlzdC5nZXRMb2NhbE1lc3NhZ2VzKCksIHJlcykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaC1jaC1jaGFuZ2VzIScpXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VMaXN0LnNldE1lc3NhZ2VzKHJlcylcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUxpc3QucmVuZGVyKClcbiAgICAgICAgICAgIGlmICh0aGlzLm1lc3NhZ2VMaXN0LmdldExvY2FsTWVzc2FnZXMoKVswXS5uYW1lICE9PSB0aGlzLnVzZXJOYW1lKSB7XG4gICAgICAgICAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnBsYXkoJ3JlY2VpdmVfbWVzc2FnZScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0sIDQwMDApXG4gIH1cblxuICBzdG9wUG9sbGluZyAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9fcG9sbGluZ0lEKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYXRcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvbWFpbi5qcyIsImltcG9ydCB7IGdldFJhbmRvbU51bWJlciB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnXG5cbmNsYXNzIENoYXRCb3Qge1xuICBjb25zdHJ1Y3RvciAoe1xuICAgIGF1ZGlvU2VydmljZSxcbiAgICBtZXNzYWdlTGlzdCxcbiAgICBib3Rpa1NlcnZpY2VcbiAgfSkge1xuICAgIHRoaXMuYW5zd2VycyA9IGJvdGlrU2VydmljZS5nZXRSYW5kb21NZXNzYWdlcygpXG4gICAgdGhpcy5tZXNzYWdlTGlzdCA9IG1lc3NhZ2VMaXN0XG4gICAgdGhpcy5hdWRpb1NlcnZpY2UgPSBhdWRpb1NlcnZpY2VcbiAgfVxuXG4gIGFuc3dlciAobWVzc2FnZSkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5tZXNzYWdlTGlzdC5hZGRNZXNzYWdlKHtcbiAgICAgICAgdGV4dDogbWVzc2FnZSB8fCB0aGlzLmFuc3dlcnNbZ2V0UmFuZG9tTnVtYmVyKHRoaXMuYW5zd2Vycy5sZW5ndGgpXSxcbiAgICAgICAgbmFtZTogJ2JvdGlrJ1xuICAgICAgfSlcbiAgICAgIHRoaXMubWVzc2FnZUxpc3QucmVuZGVyKClcbiAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnBsYXkoJ3JlY2VpdmVfbWVzc2FnZScpXG4gICAgfSwgMTUwMClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGF0Qm90XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L2NvbXBvbmVudHMvYm90aWsvY2hhdEJvdC5qcyIsImltcG9ydCBidXR0b25UZW1wbGF0ZSBmcm9tICcuL2NoYXQtYnV0dG9uLnB1ZydcblxuY2xhc3MgQ2hhdEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgZWwsXG4gICAgcGFyZW50RWwsXG4gICAgaXNPcGVuZWRPblN0YXJ0ID0gdHJ1ZSxcbiAgICBFdmVudE1peGluXG4gIH0pIHtcbiAgICAvLyBhZGRpbmcgb24oKSBhbmQgdHJpZ2dlcigpIG1ldGhvZHNcbiAgICBFdmVudE1peGluLmFwcGx5KHRoaXMpXG5cbiAgICB0aGlzLmVsID0gZWxcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3Nob3dfX2J1dHRvbicpXG4gICAgdGhpcy5wYXJlbnRFbCA9IHBhcmVudEVsXG4gICAgdGhpcy5pc09wZW5lZE9uU3RhcnQgPSBpc09wZW5lZE9uU3RhcnRcblxuICAgIHRoaXMucmVuZGVyKClcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUuYmluZCh0aGlzKSlcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgdGhpcy5lbC5pbm5lckhUTUwgPSBidXR0b25UZW1wbGF0ZSgpXG4gICAgdGhpcy5wYXJlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLmVsKVxuICAgIGlmICghdGhpcy5pc09wZW5lZE9uU3RhcnQpIHtcbiAgICAgIHRoaXMuX3RvZ2dsZSh0aGlzLmVsLmZpcnN0Q2hpbGQpXG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICB0aGlzLl90b2dnbGUoZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtYWN0aW9uXScpKVxuICAgIHRoaXMudHJpZ2dlcigndG9nZ2xlJylcbiAgfVxuXG4gIF90b2dnbGUgKGVsKSB7XG4gICAgZWwuZmlyc3RDaGlsZC5jbGFzc0xpc3QudG9nZ2xlKCdmYS1jaGV2cm9uLWxlZnQnKVxuICAgIGVsLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LnRvZ2dsZSgnZmEtY2hldnJvbi1yaWdodCcpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdEJ1dHRvblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9jb21wb25lbnRzL2NoYXQtYnV0dG9uL2NoYXRCdXR0b24uanMiLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZnVuY3Rpb24gRXZlbnRNaXhpbiAoKSB7XG4gIHRoaXMub24gPSBmdW5jdGlvbiAobmFtZSwgY2IpIHtcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgY2IpXG4gIH1cbiAgdGhpcy50cmlnZ2VyID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcbiAgICBsZXQgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSwgeyBkZXRhaWw6IGRhdGEgfSlcbiAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRNaXhpblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9jb21wb25lbnRzL2NvbW1vbi9jdXN0b21FdmVudHMuanMiLCJpbXBvcnQgbW9kYWxUbXBsIGZyb20gJy4vbW9kYWwucHVnJ1xuXG5jbGFzcyBMb2dpbkZvcm0ge1xuICBjb25zdHJ1Y3RvciAoe1xuICAgIGVsLFxuICAgIEV2ZW50TWl4aW5cbiAgfSkge1xuICAgIC8vIGFkZGluZyBvbigpIGFuZCB0cmlnZ2VyKCkgbWV0aG9kc1xuICAgIEV2ZW50TWl4aW4uYXBwbHkodGhpcylcblxuICAgIHRoaXMuZWwgPSBlbFxuXG4gICAgdGhpcy5yZW5kZXIoKVxuXG4gICAgdGhpcy50b2dnbGVNb2RhbCA9IHRoaXMudG9nZ2xlTW9kYWwuYmluZCh0aGlzKVxuXG4gICAgdGhpcy5faW5pdEV2ZW50cygpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gbW9kYWxUbXBsKClcblxuICAgIHRoaXMuY2hhdE1vZGFsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2NoYXQnKVxuICAgIHRoaXMuY2hhdE1vZGFsQ2xvc2UgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY2hhdC1jbG9zZScpXG4gICAgdGhpcy5jaGF0TW9kYWxTdWJtaXQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGF0LWxvZ2luJylcbiAgfVxuXG4gIHRvZ2dsZU1vZGFsIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICB0aGlzLmNoYXRNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdub3QtdmlzaWJsZScpXG4gIH1cblxuICBzdWJtaXRMb2dpbkZvcm0gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIHRoaXMudHJpZ2dlcignbG9naW4nLCB7IHVzZXJuYW1lOiBlLnRhcmdldC5uYW1lLnZhbHVlIH0pXG4gICAgdGhpcy50b2dnbGVNb2RhbChlKVxuICB9XG5cbiAgX2luaXRFdmVudHMgKCkge1xuICAgIHRoaXMuY2hhdE1vZGFsQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZU1vZGFsKVxuICAgIHRoaXMuY2hhdE1vZGFsU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0TG9naW5Gb3JtLmJpbmQodGhpcykpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9naW5Gb3JtXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L2NvbXBvbmVudHMvbG9naW4tZm9ybS9sb2dpbkZvcm0uanMiLCJjbGFzcyBNZXNzYWdlRm9ybSB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgZWwsXG4gICAgRXZlbnRNaXhpblxuICB9KSB7XG4gICAgLy8gYWRkaW5nIG9uKCkgYW5kIHRyaWdnZXIoKSBtZXRob2RzXG4gICAgRXZlbnRNaXhpbi5hcHBseSh0aGlzKVxuXG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5tZXNzYWdlVGV4dGFyZWEgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlJylcbiAgICB0aGlzLl9pbml0RXZlbnRzKClcbiAgfVxuXG4gIHJlc2V0IChlKSB7XG4gICAgdGhpcy5lbC5yZXNldCgpXG4gIH1cblxuICBzdWJtaXRNZXNzYWdlRm9ybSAoZSkge1xuICAgIGlmIChlLmNoYXJDb2RlID09PSAxMyAmJiBlLnNoaWZ0S2V5ID09PSBmYWxzZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBpZiAoZS50YXJnZXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcignbWVzc2FnZScsIHsgdGV4dDogZS50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgdGhpcy5yZXNldChlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9pbml0RXZlbnRzICgpIHtcbiAgICB0aGlzLm1lc3NhZ2VUZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuc3VibWl0TWVzc2FnZUZvcm0uYmluZCh0aGlzKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlRm9ybVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9jb21wb25lbnRzL21lc3NhZ2UtZm9ybS9tZXNzYWdlRm9ybS5qcyIsImltcG9ydCBjaGF0bWxUbXBsIGZyb20gJy4vY2hhdC1tZXNzYWdlLWxpc3QucHVnJ1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnXG5cbmNsYXNzIE1lc3NhZ2VMaXN0IHtcbiAgY29uc3RydWN0b3IgKHtcbiAgICBlbCxcbiAgICB1c2VybmFtZSxcbiAgICBtZXNzYWdlcyxcbiAgICBtZXNzYWdlU2VydmljZVxuICB9KSB7XG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5tZXNzYWdlU2VydmljZSA9IG1lc3NhZ2VTZXJ2aWNlXG4gICAgdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2VzXG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gY2hhdG1sVG1wbCh7XG4gICAgICBtZXNzYWdlczogdGhpcy5tZXNzYWdlcyxcbiAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLFxuICAgICAgZm9ybWF0RGF0ZTogZm9ybWF0RGF0ZVxuICAgIH0pXG4gIH1cblxuICBnZXRMb2NhbE1lc3NhZ2VzICgpIHtcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlc1xuICB9XG5cbiAgc2V0TWVzc2FnZXMgKG1lc3NhZ2VzKSB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2VzXG4gIH1cblxuICBhZGRNZXNzYWdlIChkYXRhKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHsgLy8gdW5zaGlmdCBpcyBubyBnb29kXG4gICAgICB0ZXh0OiBkYXRhLnRleHQsXG4gICAgICBuYW1lOiBkYXRhLm5hbWUgfHwgdGhpcy51c2VybmFtZSxcbiAgICAgIGRhdGU6IERhdGUubm93KClcbiAgICB9XG4gICAgdGhpcy5tZXNzYWdlcy51bnNoaWZ0KG1lc3NhZ2UpXG4gICAgdGhpcy5tZXNzYWdlU2VydmljZS5zYXZlTWVzc2FnZXModGhpcy5tZXNzYWdlcywgbWVzc2FnZSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlTGlzdFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9tZXNzYWdlTGlzdC5qcyIsIi8qIGdsb2JhbCBBdWRpbyAqL1xuY2xhc3MgQXVkaW9TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuc291bmRzID0ge1xuICAgICAgJ3JlY2VpdmVfbWVzc2FnZSc6IG5ldyBBdWRpbygnLi9jaGF0L2Fzc2V0cy9zb3VuZHMvbm90aWZpY2F0aW9uLm1wMycpLFxuICAgICAgJ3NlbmRfbWVzc2FnZSc6IG5ldyBBdWRpbygnLi9jaGF0L2Fzc2V0cy9zb3VuZHMvc2VuZGluZy5tcDMnKVxuICAgIH1cbiAgfVxuXG4gIHBsYXkgKHNvdW5kKSB7XG4gICAgdGhpcy5zb3VuZHNbc291bmRdLnBsYXkoKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGlvU2VydmljZVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9zZXJ2aWNlcy9hdWRpb1NlcnZpY2UuanMiLCJjbGFzcyBCb3Rpa1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5uYW1lID0gJ0JvdGlrU2VydmljZSdcbiAgfVxuXG4gIGdldFJhbmRvbU1lc3NhZ2VzICgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ9Cg0LDRgdGB0LrQsNC20Lgg0LzQvdC1INGH0YLQvi3QvdC40LHRg9C00YwnLFxuICAgICAgJ9Cc0L3QtSDRgdC60YPRh9C90L4nLFxuICAgICAgJ9CeINGH0LXQvCDRgtGLINC00YPQvNCw0LXRiNGMPycsXG4gICAgICAn0KXQvtGH0LXRiNGMINC/0L7Qs9C+0LLQvtGA0LjRgtGMINC+0LEg0Y3RgtC+0Lw/JyxcbiAgICAgICfQmtCw0Log0YLRiyDQv9GA0L7QstC10Lsg0YHQstC+0Lkg0LTQtdC90Yw/JyxcbiAgICAgICfQoyDRgtC10LHRjyDQtdGB0YLRjCDQv9C70LDQvdGLINC90LAg0LfQsNCy0YLRgNCw0YjQvdC40Lkg0LTQtdC90ZHQuj8nLFxuICAgICAgJ9Ci0LXQsdC1INC90YDQsNCy0LjRgtGB0Y8g0L/QvtCz0L7QtNCwINC30LAg0L7QutC+0YjQutC+0Lw/JyxcbiAgICAgICfQktC+INGB0LrQvtC70YzQutC+INGC0Ysg0L/RgNC+0YHQvdGD0LvRgdGPPycsXG4gICAgICAn0K8g0YLQvtC20LUnLFxuICAgICAgJ9CQ0LPQsCcsXG4gICAgICAn0Jgg0YLQtdCx0LUnLFxuICAgICAgJ9Cl0LzQvCwg0LjQvdGC0LXRgNC10YHQvdC10L3RjNC60L4uLi4nXG4gICAgXVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJvdGlrU2VydmljZVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9zZXJ2aWNlcy9ib3Rpa1NlcnZpY2UuanMiLCIvKiBnbG9iYWwgZmV0Y2ggKi9cbmltcG9ydCB7IHN0b3JlU2VydmljZSB9IGZyb20gJy4vc3RvcmVTZXJ2aWNlJ1xuXG5jbGFzcyBNZXNzYWdlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgYmFzZVVybCxcbiAgICBjaGF0R3JvdXBcbiAgfSkge1xuICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmxcbiAgICB0aGlzLmNoYXRHcm91cCA9IGNoYXRHcm91cFxuICB9XG5cbiAgX3JlcXVlc3QgKCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLmJhc2VVcmwpIC8vICdjaGF0L3NlcnZpY2VzL21vY2tNZXNzYWdlcy5qc29uJ1xuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbigoanNvbikgPT4gT2JqZWN0LnZhbHVlcyhqc29uKS5yZXZlcnNlKCkpXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgIHJldHVybiBzdG9yZVNlcnZpY2UuZ2V0SlNPTihgY2hhdEhpc3RvcnktJHt0aGlzLmNoYXRHcm91cH1gKVxuICAgICAgfSlcbiAgfVxuXG4gIGdldE1lc3NhZ2VMaXN0ICgpIHtcbiAgICBpZiAodGhpcy5jaGF0R3JvdXAgIT09ICdib3RpaycpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHJlc29sdmUoc3RvcmVTZXJ2aWNlLmdldEpTT04oYGNoYXRIaXN0b3J5LSR7dGhpcy5jaGF0R3JvdXB9YCkpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHNhdmVNZXNzYWdlcyAobWVzc2FnZXMsIG1lc3NhZ2UpIHtcbiAgICBpZiAodGhpcy5jaGF0R3JvdXAgIT09ICdib3RpaycpIHtcbiAgICAgIGZldGNoKHRoaXMuYmFzZVVybCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobWVzc2FnZSlcbiAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICB9KVxuICAgIH1cbiAgICBzdG9yZVNlcnZpY2Uuc2V0SlNPTihgY2hhdEhpc3RvcnktJHt0aGlzLmNoYXRHcm91cH1gLCBtZXNzYWdlcylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlU2VydmljZVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9zZXJ2aWNlcy9tZXNzYWdlU2VydmljZS5qcyIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwO3B1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NidXR0b24gY2xhc3M9XFxcImJ1dHRvbiBidXR0b24tYmxhY2sgYnV0dG9uX19zaG93LWNoYXRcXFwiIGRhdGEtYWN0aW9uPVxcXCJ0b2dnbGVcXFwiXFx1MDAzRVxcdTAwM0NpIGNsYXNzPVxcXCJmYSBmYS1jaGV2cm9uLXJpZ2h0XFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRmlcXHUwMDNFXFx1MDAzQ1xcdTAwMkZidXR0b25cXHUwMDNFXCI7O3JldHVybiBwdWdfaHRtbDt9O1xubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NoYXQvY29tcG9uZW50cy9jaGF0LWJ1dHRvbi9jaGF0LWJ1dHRvbi5wdWdcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwO3B1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXYgY2xhc3M9XFxcIm1vZGFsIG1vZGFsX19jaGF0IG5vdC12aXNpYmxlXFxcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJtb2RhbF9fYm9keVxcXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwibW9kYWxfX2NvbnRlbnRcXFwiXFx1MDAzRVxcdTAwM0Nmb3JtIGNsYXNzPVxcXCJjaGF0LWxvZ2luXFxcIiBuYW1lPVxcXCJjaGF0LWxvZ2luXFxcIlxcdTAwM0VcXHUwMDNDZmllbGRzZXRcXHUwMDNFXFx1MDAzQ2xhYmVsIGZvcj1cXFwibmFtZVxcXCJcXHUwMDNFRW50ZXIgeW8gbmFtZVxcdTAwM0NcXHUwMDJGbGFiZWxcXHUwMDNFXFx1MDAzQ2lucHV0IGlkPVxcXCJuYW1lXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwibmFtZVxcXCIgcmVxdWlyZWQgYXV0b2ZvY3VzXFx1MDAzRVxcdTAwM0NcXHUwMDJGZmllbGRzZXRcXHUwMDNFXFx1MDAzQ2J1dHRvbiBjbGFzcz1cXFwiYnV0dG9uLXByaW1hcnkgbS1sLTEgZmxvYXQtcmlnaHRcXFwiIHR5cGU9XFxcInN1Ym1pdFxcXCJcXHUwMDNFRW50ZXIgY2hhdFxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcImJ1dHRvbi1vdXRsaW5lIGZsb2F0LXJpZ2h0IG1vZGFsX19jaGF0LWNsb3NlXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiXFx1MDAzRUNsb3NlXFx1MDAzQ1xcdTAwMkZidXR0b25cXHUwMDNFXFx1MDAzQ1xcdTAwMkZmb3JtXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jaGF0L2NvbXBvbmVudHMvbG9naW4tZm9ybS9tb2RhbC5wdWdcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwOzt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uICh1c2VybmFtZSkge3B1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXYgY2xhc3M9XFxcImNvbHVtbi1jZW50ZXIgY2hhdF9fYXBwXFxcIlxcdTAwM0VcXHUwMDNDZGl2XCIgKyAocHVnLmF0dHIoXCJjbGFzc1wiLCBwdWcuY2xhc3NlcyhbXCJsb2dpbi1mYWxzZVwiLHVzZXJuYW1lID8gJ2hpZGRlbicgOiAnJ10sIFtmYWxzZSx0cnVlXSksIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcXHUwMDNDYnV0dG9uIGNsYXNzPVxcXCJidXR0b24tcHJpbWFyeSBjaGF0X19sb2dpbi1idXR0b25cXFwiXFx1MDAzRUpvaW4gY2hhdFxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NkaXZcIiArIChwdWcuYXR0cihcImNsYXNzXCIsIHB1Zy5jbGFzc2VzKFtcImxvZ2luLXRydWVcIiwhdXNlcm5hbWUgPyAnaGlkZGVuJyA6ICcnXSwgW2ZhbHNlLHRydWVdKSwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImNoYXRfX2hlYWRlclxcXCJcXHUwMDNFXFx1MDAzQ2kgY2xhc3M9XFxcImZhIGZhLXVzZXItY2lyY2xlLW8gaGVhZGVyX19hdmF0YXJcXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGaVxcdTAwM0VcXHUwMDNDcCBjbGFzcz1cXFwiaGVhZGVyX19uYW1lXFxcIlxcdTAwM0VDaGF0IHdpdGgmbmJzcDtcXHUwMDNDYSBocmVmPVxcXCIjXFxcIiBkYXRhLWFjdGlvbj1cXFwiYm90aWtcXFwiXFx1MDAzRUJvdGlrXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRSZuYnNwOyB8ICZuYnNwO1xcdTAwM0NhIGhyZWY9XFxcIiNcXFwiIGRhdGEtYWN0aW9uPVxcXCJncm91cFxcXCJcXHUwMDNFR3JvdXBcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXFx1MDAzQ1xcdTAwMkZwXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImNoYXRfX2JvZHlcXFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9jaGF0LW1lc3NhZ2UtbGlzdC5wdWdcIikuY2FsbCh0aGlzLCBsb2NhbHMpKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwiY2hhdF9fZm9vdGVyXFxcIlxcdTAwM0VcXHUwMDNDZm9ybSBjbGFzcz1cXFwiY2hhdF9fZm9ybVxcXCIgbmFtZT1cXFwiY2hhdF9fZm9ybVxcXCJcXHUwMDNFXFx1MDAzQ3RleHRhcmVhIGlkPVxcXCJtZXNzYWdlXFxcIiBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgbWVzc2FnZS4uLlxcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZ0ZXh0YXJlYVxcdTAwM0VcXHUwMDNDXFx1MDAyRmZvcm1cXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXCI7fS5jYWxsKHRoaXMsXCJ1c2VybmFtZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudXNlcm5hbWU6dHlwZW9mIHVzZXJuYW1lIT09XCJ1bmRlZmluZWRcIj91c2VybmFtZTp1bmRlZmluZWQpKTs7cmV0dXJuIHB1Z19odG1sO307XG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2hhdC9tYWluLnB1Z1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogKGlnbm9yZWQpICovXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZnMgKGlnbm9yZWQpXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgQ2hhdCBmcm9tICcuL2NoYXQvbWFpbidcblxuLyogZXNsaW50LWRpc2FibGUgbm8tbmV3ICovXG5uZXcgQ2hhdCh7XG4gIGVsOiAnLmNoYXQnLFxuICBidXR0b25FbDogJy53ZWJzaXRlJywgLy8gZWxlbWVudCB0byBhcHBlbmQgY2hhdCB0b29nbGUgYnV0dG9uLiBNdXN0IGJlIHJlbGF0aXZlLlxuICBpc09wZW5lZE9uU3RhcnQ6IHRydWUgLy8gZGVmYXVsdCB2YWx1ZTogdHJ1ZVxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=
