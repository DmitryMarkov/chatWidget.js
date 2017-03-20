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
      if (!el.classList.contains('active')) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2Y4YTkxNGVlZTc3NjFkNjdhODQiLCJ3ZWJwYWNrOi8vLy4vfi9wdWctcnVudGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L3V0aWxzL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9zZXJ2aWNlcy9zdG9yZVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9jaGF0LW1lc3NhZ2UtbGlzdC5wdWciLCJ3ZWJwYWNrOi8vLy4vY2hhdC9tYWluLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9ib3Rpay9jaGF0Qm90LmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9jaGF0LWJ1dHRvbi9jaGF0QnV0dG9uLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9jb21tb24vY3VzdG9tRXZlbnRzLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9sb2dpbi1mb3JtL2xvZ2luRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L2NvbXBvbmVudHMvbWVzc2FnZS1mb3JtL21lc3NhZ2VGb3JtLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9tZXNzYWdlLWxpc3QvbWVzc2FnZUxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9zZXJ2aWNlcy9hdWRpb1NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9zZXJ2aWNlcy9ib3Rpa1NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9zZXJ2aWNlcy9tZXNzYWdlU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L2NvbXBvbmVudHMvY2hhdC1idXR0b24vY2hhdC1idXR0b24ucHVnIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9sb2dpbi1mb3JtL21vZGFsLnB1ZyIsIndlYnBhY2s6Ly8vLi9jaGF0L21haW4ucHVnIiwid2VicGFjazovLy9mcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIl0sIm5hbWVzIjpbImdldFJhbmRvbU51bWJlciIsImZvcm1hdERhdGUiLCJkZWVwRXF1YWwiLCJtYXgiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJkYXRlU3RyaW5nIiwiZGF0ZU9iaiIsIkRhdGUiLCJmb3JtYXR0ZWREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwic3JjIiwiZGVzdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdG9yZVNlcnZpY2UiLCJnZXRJdGVtIiwia2V5IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInN0cmluZyIsInJlbW92ZSIsInJlbW92ZUl0ZW0iLCJnZXRKU09OIiwicGFyc2UiLCJzZXRKU09OIiwib2JqIiwiQ2hhdCIsImVsIiwiYnV0dG9uRWwiLCJpc09wZW5lZE9uU3RhcnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJfaW5pdFRvZ2dsZUJ1dHRvbiIsIl9pbml0IiwiaW5uZXJIVE1MIiwibWVzc2FnZXMiLCJ1c2VybmFtZSIsInVzZXJOYW1lIiwiX29uVG9nZ2xlIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJkYXRhc2V0IiwiYWN0aW9uIiwiY2hhdEdyb3VwIiwiY2xhc3NMaXN0IiwiYWRkIiwiX2luaXRTZXJ2aWNlcyIsIm1lc3NhZ2VTZXJ2aWNlIiwiZ2V0TWVzc2FnZUxpc3QiLCJ0aGVuIiwicmVzIiwicmVuZGVyIiwiX2luaXRMb2dpbkNvbXBvbmVudCIsIl9pbml0Q29tcG9uZW50cyIsIl9pbml0RXZlbnRzIiwic3RhcnRQb2xsaW5nIiwiYmFzZVVybCIsImF1ZGlvU2VydmljZSIsImJvdGlrU2VydmljZSIsImNoYXRCdXR0b24iLCJjcmVhdGVFbGVtZW50IiwicGFyZW50RWwiLCJFdmVudE1peGluIiwib24iLCJiaW5kIiwibG9naW5Gb3JtIiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwidG9nZ2xlTW9kYWwiLCJfb25Mb2dpbiIsIm1lc3NhZ2VGb3JtIiwibWVzc2FnZUxpc3QiLCJib3RpayIsIl9jaGFuZ2VHcm91cCIsIl9vbk1lc3NhZ2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiY29udGFpbnMiLCJwYXJlbnROb2RlIiwiY2hpbGRyZW4iLCJjaGlsZCIsInRvZ2dsZSIsInN0b3BQb2xsaW5nIiwiZGV0YWlsIiwibGVuZ3RoIiwiYW5zd2VyIiwiYWRkTWVzc2FnZSIsInRleHQiLCJuYW1lIiwicGxheSIsIl9fcG9sbGluZ0lEIiwic2V0SW50ZXJ2YWwiLCJjb25zb2xlIiwibG9nIiwiZ2V0TG9jYWxNZXNzYWdlcyIsInNldE1lc3NhZ2VzIiwiY2xlYXJJbnRlcnZhbCIsIkNoYXRCb3QiLCJhbnN3ZXJzIiwiZ2V0UmFuZG9tTWVzc2FnZXMiLCJtZXNzYWdlIiwic2V0VGltZW91dCIsIkNoYXRCdXR0b24iLCJhcHBseSIsIl90b2dnbGUiLCJmaXJzdENoaWxkIiwidHJpZ2dlciIsImNiIiwiZGF0YSIsImV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiTG9naW5Gb3JtIiwiY2hhdE1vZGFsIiwiY2hhdE1vZGFsQ2xvc2UiLCJjaGF0TW9kYWxTdWJtaXQiLCJ2YWx1ZSIsInN1Ym1pdExvZ2luRm9ybSIsIk1lc3NhZ2VGb3JtIiwibWVzc2FnZVRleHRhcmVhIiwicmVzZXQiLCJjaGFyQ29kZSIsInNoaWZ0S2V5IiwidHJpbSIsInN1Ym1pdE1lc3NhZ2VGb3JtIiwiTWVzc2FnZUxpc3QiLCJkYXRlIiwibm93IiwidW5zaGlmdCIsInNhdmVNZXNzYWdlcyIsIkF1ZGlvU2VydmljZSIsInNvdW5kcyIsIkF1ZGlvIiwic291bmQiLCJCb3Rpa1NlcnZpY2UiLCJNZXNzYWdlU2VydmljZSIsImZldGNoIiwicmVzcG9uc2UiLCJqc29uIiwiT2JqZWN0IiwidmFsdWVzIiwicmV2ZXJzZSIsImNhdGNoIiwiZXJyIiwiX3JlcXVlc3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm1ldGhvZCIsImJvZHki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QkFBMkIsa0NBQWtDLGFBQWEseU1BQXlNO0FBQ25SLDBCOzs7Ozs7QUNIQTs7QUFFQSwyQkFBMkIsa0NBQWtDLGFBQWEsb3RCQUFvdEI7QUFDOXhCLDBCOzs7Ozs7QUNIQTs7QUFFQSwyQkFBMkIsa0NBQWtDLGNBQWMsbUNBQW1DLEVBQUUsc0JBQXNCLDBsQkFBMGxCLDRFQUE0RSxTQUFTLHdoQkFBNGpCLHNIQUFzSDtBQUN2K0MsMEI7Ozs7OztBQ0hBLGU7Ozs7Ozs7OztBQ0FBOzs7Ozs7QUFFQTtBQUNBLG1CQUFTO0FBQ1A5RyxNQUFJLE9BREc7QUFFUEMsWUFBVSxVQUZILEVBRWU7QUFDdEJDLG1CQUFpQixJQUhWLENBR2U7QUFIZixDQUFULEUiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3ZjhhOTE0ZWVlNzc2MWQ2N2E4NCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHB1Z19oYXNfb3duX3Byb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gcHVnX21lcmdlO1xuZnVuY3Rpb24gcHVnX21lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBwdWdfbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgPT09ICdjbGFzcycpIHtcbiAgICAgIHZhciB2YWxBID0gYVtrZXldIHx8IFtdO1xuICAgICAgYVtrZXldID0gKEFycmF5LmlzQXJyYXkodmFsQSkgPyB2YWxBIDogW3ZhbEFdKS5jb25jYXQoYltrZXldIHx8IFtdKTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgdmFyIHZhbEEgPSBwdWdfc3R5bGUoYVtrZXldKTtcbiAgICAgIHZhciB2YWxCID0gcHVnX3N0eWxlKGJba2V5XSk7XG4gICAgICBhW2tleV0gPSB2YWxBICsgdmFsQjtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFycmF5LCBvYmplY3QsIG9yIHN0cmluZyBhcyBhIHN0cmluZyBvZiBjbGFzc2VzIGRlbGltaXRlZCBieSBhIHNwYWNlLlxuICpcbiAqIElmIGB2YWxgIGlzIGFuIGFycmF5LCBhbGwgbWVtYmVycyBvZiBpdCBhbmQgaXRzIHN1YmFycmF5cyBhcmUgY291bnRlZCBhc1xuICogY2xhc3Nlcy4gSWYgYGVzY2FwaW5nYCBpcyBhbiBhcnJheSwgdGhlbiB3aGV0aGVyIG9yIG5vdCB0aGUgaXRlbSBpbiBgdmFsYCBpc1xuICogZXNjYXBlZCBkZXBlbmRzIG9uIHRoZSBjb3JyZXNwb25kaW5nIGl0ZW0gaW4gYGVzY2FwaW5nYC4gSWYgYGVzY2FwaW5nYCBpc1xuICogbm90IGFuIGFycmF5LCBubyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIElmIGB2YWxgIGlzIGFuIG9iamVjdCwgYWxsIHRoZSBrZXlzIHdob3NlIHZhbHVlIGlzIHRydXRoeSBhcmUgY291bnRlZCBhc1xuICogY2xhc3Nlcy4gTm8gZXNjYXBpbmcgaXMgZG9uZS5cbiAqXG4gKiBJZiBgdmFsYCBpcyBhIHN0cmluZywgaXQgaXMgY291bnRlZCBhcyBhIGNsYXNzLiBObyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIEBwYXJhbSB7KEFycmF5LjxzdHJpbmc+fE9iamVjdC48c3RyaW5nLCBib29sZWFuPnxzdHJpbmcpfSB2YWxcbiAqIEBwYXJhbSB7P0FycmF5LjxzdHJpbmc+fSBlc2NhcGluZ1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNsYXNzZXMgPSBwdWdfY2xhc3NlcztcbmZ1bmN0aW9uIHB1Z19jbGFzc2VzX2FycmF5KHZhbCwgZXNjYXBpbmcpIHtcbiAgdmFyIGNsYXNzU3RyaW5nID0gJycsIGNsYXNzTmFtZSwgcGFkZGluZyA9ICcnLCBlc2NhcGVFbmFibGVkID0gQXJyYXkuaXNBcnJheShlc2NhcGluZyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgY2xhc3NOYW1lID0gcHVnX2NsYXNzZXModmFsW2ldKTtcbiAgICBpZiAoIWNsYXNzTmFtZSkgY29udGludWU7XG4gICAgZXNjYXBlRW5hYmxlZCAmJiBlc2NhcGluZ1tpXSAmJiAoY2xhc3NOYW1lID0gcHVnX2VzY2FwZShjbGFzc05hbWUpKTtcbiAgICBjbGFzc1N0cmluZyA9IGNsYXNzU3RyaW5nICsgcGFkZGluZyArIGNsYXNzTmFtZTtcbiAgICBwYWRkaW5nID0gJyAnO1xuICB9XG4gIHJldHVybiBjbGFzc1N0cmluZztcbn1cbmZ1bmN0aW9uIHB1Z19jbGFzc2VzX29iamVjdCh2YWwpIHtcbiAgdmFyIGNsYXNzU3RyaW5nID0gJycsIHBhZGRpbmcgPSAnJztcbiAgZm9yICh2YXIga2V5IGluIHZhbCkge1xuICAgIGlmIChrZXkgJiYgdmFsW2tleV0gJiYgcHVnX2hhc19vd25fcHJvcGVydHkuY2FsbCh2YWwsIGtleSkpIHtcbiAgICAgIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgKyBwYWRkaW5nICsga2V5O1xuICAgICAgcGFkZGluZyA9ICcgJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNsYXNzU3RyaW5nO1xufVxuZnVuY3Rpb24gcHVnX2NsYXNzZXModmFsLCBlc2NhcGluZykge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgcmV0dXJuIHB1Z19jbGFzc2VzX2FycmF5KHZhbCwgZXNjYXBpbmcpO1xuICB9IGVsc2UgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBwdWdfY2xhc3Nlc19vYmplY3QodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsIHx8ICcnO1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBvYmplY3Qgb3Igc3RyaW5nIHRvIGEgc3RyaW5nIG9mIENTUyBzdHlsZXMgZGVsaW1pdGVkIGJ5IGEgc2VtaWNvbG9uLlxuICpcbiAqIEBwYXJhbSB7KE9iamVjdC48c3RyaW5nLCBzdHJpbmc+fHN0cmluZyl9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbmV4cG9ydHMuc3R5bGUgPSBwdWdfc3R5bGU7XG5mdW5jdGlvbiBwdWdfc3R5bGUodmFsKSB7XG4gIGlmICghdmFsKSByZXR1cm4gJyc7XG4gIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHZhciBvdXQgPSAnJztcbiAgICBmb3IgKHZhciBzdHlsZSBpbiB2YWwpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAocHVnX2hhc19vd25fcHJvcGVydHkuY2FsbCh2YWwsIHN0eWxlKSkge1xuICAgICAgICBvdXQgPSBvdXQgKyBzdHlsZSArICc6JyArIHZhbFtzdHlsZV0gKyAnOyc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH0gZWxzZSB7XG4gICAgdmFsICs9ICcnO1xuICAgIGlmICh2YWxbdmFsLmxlbmd0aCAtIDFdICE9PSAnOycpIFxuICAgICAgcmV0dXJuIHZhbCArICc7JztcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBwdWdfYXR0cjtcbmZ1bmN0aW9uIHB1Z19hdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAodmFsID09PSBmYWxzZSB8fCB2YWwgPT0gbnVsbCB8fCAhdmFsICYmIChrZXkgPT09ICdjbGFzcycgfHwga2V5ID09PSAnc3R5bGUnKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWwudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFsID0gdmFsLnRvSlNPTigpO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsICE9PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgaWYgKCFlc2NhcGVkICYmIHZhbC5pbmRleE9mKCdcIicpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICcgJyArIGtleSArICc9XFwnJyArIHZhbC5yZXBsYWNlKC8nL2csICcmIzM5OycpICsgJ1xcJyc7XG4gICAgfVxuICB9XG4gIGlmIChlc2NhcGVkKSB2YWwgPSBwdWdfZXNjYXBlKHZhbCk7XG4gIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IHRlcnNlIHdoZXRoZXIgdG8gdXNlIEhUTUw1IHRlcnNlIGJvb2xlYW4gYXR0cmlidXRlc1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gcHVnX2F0dHJzO1xuZnVuY3Rpb24gcHVnX2F0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYXR0cnMgPSAnJztcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKHB1Z19oYXNfb3duX3Byb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICB2YXIgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09PSBrZXkpIHtcbiAgICAgICAgdmFsID0gcHVnX2NsYXNzZXModmFsKTtcbiAgICAgICAgYXR0cnMgPSBwdWdfYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSArIGF0dHJzO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICgnc3R5bGUnID09PSBrZXkpIHtcbiAgICAgICAgdmFsID0gcHVnX3N0eWxlKHZhbCk7XG4gICAgICB9XG4gICAgICBhdHRycyArPSBwdWdfYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXR0cnM7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIHB1Z19tYXRjaF9odG1sID0gL1tcIiY8Pl0vO1xuZXhwb3J0cy5lc2NhcGUgPSBwdWdfZXNjYXBlO1xuZnVuY3Rpb24gcHVnX2VzY2FwZShfaHRtbCl7XG4gIHZhciBodG1sID0gJycgKyBfaHRtbDtcbiAgdmFyIHJlZ2V4UmVzdWx0ID0gcHVnX21hdGNoX2h0bWwuZXhlYyhodG1sKTtcbiAgaWYgKCFyZWdleFJlc3VsdCkgcmV0dXJuIF9odG1sO1xuXG4gIHZhciByZXN1bHQgPSAnJztcbiAgdmFyIGksIGxhc3RJbmRleCwgZXNjYXBlO1xuICBmb3IgKGkgPSByZWdleFJlc3VsdC5pbmRleCwgbGFzdEluZGV4ID0gMDsgaSA8IGh0bWwubGVuZ3RoOyBpKyspIHtcbiAgICBzd2l0Y2ggKGh0bWwuY2hhckNvZGVBdChpKSkge1xuICAgICAgY2FzZSAzNDogZXNjYXBlID0gJyZxdW90Oyc7IGJyZWFrO1xuICAgICAgY2FzZSAzODogZXNjYXBlID0gJyZhbXA7JzsgYnJlYWs7XG4gICAgICBjYXNlIDYwOiBlc2NhcGUgPSAnJmx0Oyc7IGJyZWFrO1xuICAgICAgY2FzZSA2MjogZXNjYXBlID0gJyZndDsnOyBicmVhaztcbiAgICAgIGRlZmF1bHQ6IGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAobGFzdEluZGV4ICE9PSBpKSByZXN1bHQgKz0gaHRtbC5zdWJzdHJpbmcobGFzdEluZGV4LCBpKTtcbiAgICBsYXN0SW5kZXggPSBpICsgMTtcbiAgICByZXN1bHQgKz0gZXNjYXBlO1xuICB9XG4gIGlmIChsYXN0SW5kZXggIT09IGkpIHJldHVybiByZXN1bHQgKyBodG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsIGkpO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIHB1ZyBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBvcmlnaW5hbCBzb3VyY2VcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IHB1Z19yZXRocm93O1xuZnVuY3Rpb24gcHVnX3JldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHB1Z19yZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnUHVnJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcHVnLXJ1bnRpbWUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBHZW5lcmF0ZSByYW5kb20gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4aW11bSB2YWx1ZVxuICogQHJldHVybnMge251bWJlcn0gcmFuZG9tIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21OdW1iZXIgKG1heCkge1xuICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKG1heCAtIDEpKVxufVxuXG4vKipcbiAqIERhdGUgZm9ybWF0XG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSBpbiBtc1xuICogQHJldHVybnMge3N0cmluZ30gZm9ybWF0dGVkRGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZSAoZGF0ZVN0cmluZykge1xuICBjb25zdCBkYXRlT2JqID0gbmV3IERhdGUoZGF0ZVN0cmluZylcbiAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGRhdGVPYmouZ2V0SG91cnMoKSArICc6JyArIGRhdGVPYmouZ2V0TWludXRlcygpXG4gIHJldHVybiBmb3JtYXR0ZWREYXRlXG59XG5cbi8qKlxuICogRGVlcCBlcXVhbCBhcnJheXNcbiAqIEBwYXJhbSB7YXJyYXl9IHNyYyAtIGZpcnN0IGFycmF5XG4gKiBAcGFyYW0ge2FycmF5fSBkZXN0IC0gc2Vjb25kIGFycmF5XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiBxdWFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwRXF1YWwgKHNyYywgZGVzdCkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoc3JjKSA9PT0gSlNPTi5zdHJpbmdpZnkoZGVzdClcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvdXRpbHMvdXRpbC5qcyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5cbmV4cG9ydCBjb25zdCBzdG9yZVNlcnZpY2UgPSB7XG4gIGdldEl0ZW06IChrZXkpID0+IHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSB8fCAnJ1xuICB9LFxuICBzZXRJdGVtOiAoa2V5LCBzdHJpbmcpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHN0cmluZylcbiAgfSxcblxuICByZW1vdmU6IChrZXkpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXG4gIH0sXG5cbiAgZ2V0SlNPTjogKGtleSkgPT4ge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkgfHwgJ1tdJylcbiAgfSxcbiAgc2V0SlNPTjogKGtleSwgb2JqKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShvYmopKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L3NlcnZpY2VzL3N0b3JlU2VydmljZS5qcyIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwOzt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChmb3JtYXREYXRlLCBtZXNzYWdlcywgdXNlcm5hbWUpIHsvLyBpdGVyYXRlIG1lc3NhZ2VzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IG1lc3NhZ2VzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgcHVnX2luZGV4MCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgcHVnX2luZGV4MCA8ICQkbDsgcHVnX2luZGV4MCsrKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gJCRvYmpbcHVnX2luZGV4MF07XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZGl2XCIgKyAocHVnLmF0dHIoXCJjbGFzc1wiLCBwdWcuY2xhc3NlcyhbXCJjaGF0X19tZXNzYWdlXCIsbWVzc2FnZS5uYW1lID09PSB1c2VybmFtZSA/ICdjaGF0X19tZXNzYWdlLW15JyA6ICcnXSwgW2ZhbHNlLHRydWVdKSwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcIm1lc3NhZ2VfX3RpbWVcXFwiXFx1MDAzRVwiICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IG1lc3NhZ2UubmFtZSA9PT0gdXNlcm5hbWUgPyAnJyA6IG1lc3NhZ2UubmFtZSkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2XFx1MDAzRVwiICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IG1lc3NhZ2UudGV4dCkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJtZXNzYWdlX190aW1lIGZsb2F0LXJpZ2h0XFxcIlxcdTAwM0VcIiArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBmb3JtYXREYXRlKG1lc3NhZ2UuZGF0ZSkpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXCI7XG4gICAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgcHVnX2luZGV4MCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7XG4gICAgICB2YXIgbWVzc2FnZSA9ICQkb2JqW3B1Z19pbmRleDBdO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2RpdlwiICsgKHB1Zy5hdHRyKFwiY2xhc3NcIiwgcHVnLmNsYXNzZXMoW1wiY2hhdF9fbWVzc2FnZVwiLG1lc3NhZ2UubmFtZSA9PT0gdXNlcm5hbWUgPyAnY2hhdF9fbWVzc2FnZS1teScgOiAnJ10sIFtmYWxzZSx0cnVlXSksIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJtZXNzYWdlX190aW1lXFxcIlxcdTAwM0VcIiArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBtZXNzYWdlLm5hbWUgPT09IHVzZXJuYW1lID8gJycgOiBtZXNzYWdlLm5hbWUpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdlxcdTAwM0VcIiArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBtZXNzYWdlLnRleHQpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwibWVzc2FnZV9fdGltZSBmbG9hdC1yaWdodFxcXCJcXHUwMDNFXCIgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gZm9ybWF0RGF0ZShtZXNzYWdlLmRhdGUpKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiO1xuICAgIH1cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwiZm9ybWF0RGF0ZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZm9ybWF0RGF0ZTp0eXBlb2YgZm9ybWF0RGF0ZSE9PVwidW5kZWZpbmVkXCI/Zm9ybWF0RGF0ZTp1bmRlZmluZWQsXCJtZXNzYWdlc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubWVzc2FnZXM6dHlwZW9mIG1lc3NhZ2VzIT09XCJ1bmRlZmluZWRcIj9tZXNzYWdlczp1bmRlZmluZWQsXCJ1c2VybmFtZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudXNlcm5hbWU6dHlwZW9mIHVzZXJuYW1lIT09XCJ1bmRlZmluZWRcIj91c2VybmFtZTp1bmRlZmluZWQpKTs7cmV0dXJuIHB1Z19odG1sO307XG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2hhdC9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9jaGF0LW1lc3NhZ2UtbGlzdC5wdWdcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGNoYXRUbXBsIGZyb20gJy4vbWFpbi5wdWcnXG5cbmltcG9ydCBNZXNzYWdlU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL21lc3NhZ2VTZXJ2aWNlJ1xuaW1wb3J0IEF1ZGlvU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL2F1ZGlvU2VydmljZSdcbmltcG9ydCBCb3Rpa1NlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9ib3Rpa1NlcnZpY2UnXG5cbmltcG9ydCBDaGF0QnV0dG9uIGZyb20gJy4vY29tcG9uZW50cy9jaGF0LWJ1dHRvbi9jaGF0QnV0dG9uJ1xuaW1wb3J0IExvZ2luRm9ybSBmcm9tICcuL2NvbXBvbmVudHMvbG9naW4tZm9ybS9sb2dpbkZvcm0nXG5pbXBvcnQgTWVzc2FnZUxpc3QgZnJvbSAnLi9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9tZXNzYWdlTGlzdCdcbmltcG9ydCBNZXNzYWdlRm9ybSBmcm9tICcuL2NvbXBvbmVudHMvbWVzc2FnZS1mb3JtL21lc3NhZ2VGb3JtJ1xuaW1wb3J0IEJvdGlrIGZyb20gJy4vY29tcG9uZW50cy9ib3Rpay9jaGF0Qm90J1xuXG5pbXBvcnQgeyBzdG9yZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0b3JlU2VydmljZSdcbmltcG9ydCB7IGZvcm1hdERhdGUsIGRlZXBFcXVhbCB9IGZyb20gJy4vdXRpbHMvdXRpbCdcbmltcG9ydCBFdmVudE1peGluIGZyb20gJy4vY29tcG9uZW50cy9jb21tb24vY3VzdG9tRXZlbnRzJ1xuXG5jbGFzcyBDaGF0IHtcbiAgY29uc3RydWN0b3IgKHtcbiAgICBlbCxcbiAgICBidXR0b25FbCxcbiAgICBpc09wZW5lZE9uU3RhcnRcbiAgfSkge1xuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuICAgIHRoaXMuYnV0dG9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbkVsKVxuICAgIHRoaXMuaXNPcGVuZWRPblN0YXJ0ID0gaXNPcGVuZWRPblN0YXJ0XG5cbiAgICB0aGlzLl9pbml0VG9nZ2xlQnV0dG9uKClcbiAgICB0aGlzLl9pbml0KClcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgdGhpcy5lbC5pbm5lckhUTUwgPSBjaGF0VG1wbCh7XG4gICAgICBtZXNzYWdlczogdGhpcy5tZXNzYWdlcyxcbiAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJOYW1lLFxuICAgICAgZm9ybWF0RGF0ZTogZm9ybWF0RGF0ZVxuICAgIH0pXG5cbiAgICBpZiAoIXRoaXMuaXNPcGVuZWRPblN0YXJ0KSB7XG4gICAgICB0aGlzLl9vblRvZ2dsZSgpXG4gICAgfVxuXG4gICAgWy4uLnRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9fbmFtZSBhJyldLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBpZiAoZWwuZGF0YXNldC5hY3Rpb24gPT09IHRoaXMuY2hhdEdyb3VwKSBlbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgIH0pXG4gIH1cblxuICBfaW5pdCAoKSB7XG4gICAgdGhpcy51c2VyTmFtZSA9IHN0b3JlU2VydmljZS5nZXRJdGVtKCdjaGF0V2lkZ2V0TmFtZScpXG4gICAgdGhpcy5jaGF0R3JvdXAgPSBzdG9yZVNlcnZpY2UuZ2V0SXRlbSgnY2hhdFdpZGdldEdyb3VwJykgfHwgJ2JvdGlrJ1xuXG4gICAgdGhpcy5faW5pdFNlcnZpY2VzKClcblxuICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZ2V0TWVzc2FnZUxpc3QoKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gcmVzXG4gICAgICAgIHRoaXMucmVuZGVyKClcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJOYW1lKSB7XG4gICAgICAgICAgdGhpcy5faW5pdExvZ2luQ29tcG9uZW50KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9pbml0Q29tcG9uZW50cygpXG4gICAgICAgICAgdGhpcy5faW5pdEV2ZW50cygpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hhdEdyb3VwICE9PSAnYm90aWsnKSB7XG4gICAgICAgICAgdGhpcy5zdGFydFBvbGxpbmcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICB9XG5cbiAgX2luaXRTZXJ2aWNlcyAoKSB7XG4gICAgdGhpcy5tZXNzYWdlU2VydmljZSA9IG5ldyBNZXNzYWdlU2VydmljZSh7XG4gICAgICBiYXNlVXJsOiAnaHR0cHM6Ly9jb21wb25lbnRzLTE2MDEtMTkzMC5maXJlYmFzZWlvLmNvbS9jaGF0L21lc3NhZ2VzLmpzb24nLFxuICAgICAgY2hhdEdyb3VwOiB0aGlzLmNoYXRHcm91cFxuICAgIH0pXG4gICAgdGhpcy5hdWRpb1NlcnZpY2UgPSBuZXcgQXVkaW9TZXJ2aWNlKClcbiAgICB0aGlzLmJvdGlrU2VydmljZSA9IG5ldyBCb3Rpa1NlcnZpY2UoKVxuICB9XG5cbiAgX2luaXRUb2dnbGVCdXR0b24gKCkge1xuICAgIHRoaXMuY2hhdEJ1dHRvbiA9IG5ldyBDaGF0QnV0dG9uKHtcbiAgICAgIGVsOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgIHBhcmVudEVsOiB0aGlzLmJ1dHRvbkVsLFxuICAgICAgaXNPcGVuZWRPblN0YXJ0OiB0aGlzLmlzT3BlbmVkT25TdGFydCxcbiAgICAgIEV2ZW50TWl4aW5cbiAgICB9KVxuXG4gICAgdGhpcy5jaGF0QnV0dG9uLm9uKCd0b2dnbGUnLCB0aGlzLl9vblRvZ2dsZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgX2luaXRMb2dpbkNvbXBvbmVudCAoKSB7XG4gICAgdGhpcy5sb2dpbkZvcm0gPSBuZXcgTG9naW5Gb3JtKHtcbiAgICAgIGVsOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgIEV2ZW50TWl4aW5cbiAgICB9KVxuXG4gICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLmxvZ2luRm9ybS5lbClcblxuICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmNoYXRfX2xvZ2luLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5sb2dpbkZvcm0udG9nZ2xlTW9kYWwpXG5cbiAgICB0aGlzLmxvZ2luRm9ybS5vbignbG9naW4nLCB0aGlzLl9vbkxvZ2luLmJpbmQodGhpcykpXG4gIH1cblxuICBfaW5pdENvbXBvbmVudHMgKCkge1xuICAgIHRoaXMubWVzc2FnZUZvcm0gPSBuZXcgTWVzc2FnZUZvcm0oe1xuICAgICAgZWw6IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmNoYXRfX2Zvcm0nKSxcbiAgICAgIEV2ZW50TWl4aW5cbiAgICB9KVxuXG4gICAgdGhpcy5tZXNzYWdlTGlzdCA9IG5ldyBNZXNzYWdlTGlzdCh7XG4gICAgICBlbDogdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcuY2hhdF9fYm9keScpLFxuICAgICAgdXNlcm5hbWU6IHRoaXMudXNlck5hbWUsXG4gICAgICBtZXNzYWdlczogdGhpcy5tZXNzYWdlcyxcbiAgICAgIG1lc3NhZ2VTZXJ2aWNlOiB0aGlzLm1lc3NhZ2VTZXJ2aWNlXG4gICAgfSlcblxuICAgIHRoaXMuYm90aWsgPSBuZXcgQm90aWsoe1xuICAgICAgYXVkaW9TZXJ2aWNlOiB0aGlzLmF1ZGlvU2VydmljZSxcbiAgICAgIG1lc3NhZ2VMaXN0OiB0aGlzLm1lc3NhZ2VMaXN0LFxuICAgICAgYm90aWtTZXJ2aWNlOiB0aGlzLmJvdGlrU2VydmljZVxuICAgIH0pXG4gIH1cblxuICBfaW5pdEV2ZW50cyAoKSB7XG4gICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19uYW1lJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jaGFuZ2VHcm91cC5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5tZXNzYWdlRm9ybS5vbignbWVzc2FnZScsIHRoaXMuX29uTWVzc2FnZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgX2NoYW5nZUdyb3VwIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgZWwgPSBlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1hY3Rpb25dJylcbiAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgIFsuLi5lbC5wYXJlbnROb2RlLmNoaWxkcmVuXS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICBjaGlsZC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuICAgICAgfSlcbiAgICAgIHN0b3JlU2VydmljZS5zZXRJdGVtKCdjaGF0V2lkZ2V0R3JvdXAnLCBlbC5kYXRhc2V0LmFjdGlvbilcbiAgICAgIHRoaXMuY2hhdEdyb3VwID0gZWwuZGF0YXNldC5hY3Rpb25cbiAgICAgIGlmICh0aGlzLmNoYXRHcm91cCA9PT0gJ2JvdGlrJykge1xuICAgICAgICB0aGlzLnN0b3BQb2xsaW5nKClcbiAgICAgIH1cbiAgICAgIHRoaXMuX2luaXQoKVxuICAgIH1cbiAgfVxuXG4gIF9vbkxvZ2luIChlKSB7XG4gICAgdGhpcy51c2VyTmFtZSA9IGUuZGV0YWlsLnVzZXJuYW1lXG4gICAgc3RvcmVTZXJ2aWNlLnNldEl0ZW0oJ2NoYXRXaWRnZXROYW1lJywgdGhpcy51c2VyTmFtZSlcblxuICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmxvZ2luLWZhbHNlJykuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbi10cnVlJykuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcblxuICAgIHRoaXMuX2luaXRDb21wb25lbnRzKClcbiAgICB0aGlzLl9pbml0RXZlbnRzKClcblxuICAgIGlmICghdGhpcy5tZXNzYWdlcy5sZW5ndGggJiYgdGhpcy51c2VyTmFtZSkge1xuICAgICAgdGhpcy5ib3Rpay5hbnN3ZXIoYNCf0YDQuNCy0LXRgiwgJHt0aGlzLnVzZXJOYW1lfSFgKVxuICAgIH1cbiAgfVxuXG4gIF9vbk1lc3NhZ2UgKGUpIHtcbiAgICB0aGlzLm1lc3NhZ2VMaXN0LmFkZE1lc3NhZ2Uoe1xuICAgICAgdGV4dDogZS5kZXRhaWwudGV4dCxcbiAgICAgIG5hbWU6IHRoaXMudXNlck5hbWVcbiAgICB9KVxuICAgIHRoaXMubWVzc2FnZUxpc3QucmVuZGVyKClcbiAgICBpZiAodGhpcy5jaGF0R3JvdXAgPT09ICdib3RpaycpIHRoaXMuYm90aWsuYW5zd2VyKClcbiAgICB0aGlzLmF1ZGlvU2VydmljZS5wbGF5KCdzZW5kX21lc3NhZ2UnKVxuICB9XG5cbiAgX29uVG9nZ2xlICgpIHtcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC50b2dnbGUoJ2NvbHVtbi0yNScpXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QudG9nZ2xlKCdjb2x1bW4tMCcpXG4gIH1cblxuICBzdGFydFBvbGxpbmcgKCkge1xuICAgIHRoaXMuX19wb2xsaW5nSUQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygncG9sbGluZy4uLicpXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmdldE1lc3NhZ2VMaXN0KClcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGlmICghZGVlcEVxdWFsKHRoaXMubWVzc2FnZUxpc3QuZ2V0TG9jYWxNZXNzYWdlcygpLCByZXMpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2gtY2gtY2hhbmdlcyEnKVxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlTGlzdC5zZXRNZXNzYWdlcyhyZXMpXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VMaXN0LnJlbmRlcigpXG4gICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlTGlzdC5nZXRMb2NhbE1lc3NhZ2VzKClbMF0ubmFtZSAhPT0gdGhpcy51c2VyTmFtZSkge1xuICAgICAgICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5wbGF5KCdyZWNlaXZlX21lc3NhZ2UnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9LCA0MDAwKVxuICB9XG5cbiAgc3RvcFBvbGxpbmcgKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fX3BvbGxpbmdJRClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGF0XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L21haW4uanMiLCJpbXBvcnQgeyBnZXRSYW5kb21OdW1iZXIgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJ1xuXG5jbGFzcyBDaGF0Qm90IHtcbiAgY29uc3RydWN0b3IgKHtcbiAgICBhdWRpb1NlcnZpY2UsXG4gICAgbWVzc2FnZUxpc3QsXG4gICAgYm90aWtTZXJ2aWNlXG4gIH0pIHtcbiAgICB0aGlzLmFuc3dlcnMgPSBib3Rpa1NlcnZpY2UuZ2V0UmFuZG9tTWVzc2FnZXMoKVxuICAgIHRoaXMubWVzc2FnZUxpc3QgPSBtZXNzYWdlTGlzdFxuICAgIHRoaXMuYXVkaW9TZXJ2aWNlID0gYXVkaW9TZXJ2aWNlXG4gIH1cblxuICBhbnN3ZXIgKG1lc3NhZ2UpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubWVzc2FnZUxpc3QuYWRkTWVzc2FnZSh7XG4gICAgICAgIHRleHQ6IG1lc3NhZ2UgfHwgdGhpcy5hbnN3ZXJzW2dldFJhbmRvbU51bWJlcih0aGlzLmFuc3dlcnMubGVuZ3RoKV0sXG4gICAgICAgIG5hbWU6ICdib3RpaydcbiAgICAgIH0pXG4gICAgICB0aGlzLm1lc3NhZ2VMaXN0LnJlbmRlcigpXG4gICAgICB0aGlzLmF1ZGlvU2VydmljZS5wbGF5KCdyZWNlaXZlX21lc3NhZ2UnKVxuICAgIH0sIDE1MDApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdEJvdFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9jb21wb25lbnRzL2JvdGlrL2NoYXRCb3QuanMiLCJpbXBvcnQgYnV0dG9uVGVtcGxhdGUgZnJvbSAnLi9jaGF0LWJ1dHRvbi5wdWcnXG5cbmNsYXNzIENoYXRCdXR0b24ge1xuICBjb25zdHJ1Y3RvciAoe1xuICAgIGVsLFxuICAgIHBhcmVudEVsLFxuICAgIGlzT3BlbmVkT25TdGFydCA9IHRydWUsXG4gICAgRXZlbnRNaXhpblxuICB9KSB7XG4gICAgLy8gYWRkaW5nIG9uKCkgYW5kIHRyaWdnZXIoKSBtZXRob2RzXG4gICAgRXZlbnRNaXhpbi5hcHBseSh0aGlzKVxuXG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdzaG93X19idXR0b24nKVxuICAgIHRoaXMucGFyZW50RWwgPSBwYXJlbnRFbFxuICAgIHRoaXMuaXNPcGVuZWRPblN0YXJ0ID0gaXNPcGVuZWRPblN0YXJ0XG5cbiAgICB0aGlzLnJlbmRlcigpXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlLmJpbmQodGhpcykpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gYnV0dG9uVGVtcGxhdGUoKVxuICAgIHRoaXMucGFyZW50RWwuYXBwZW5kQ2hpbGQodGhpcy5lbClcbiAgICBpZiAoIXRoaXMuaXNPcGVuZWRPblN0YXJ0KSB7XG4gICAgICB0aGlzLl90b2dnbGUodGhpcy5lbC5maXJzdENoaWxkKVxuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZSAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgdGhpcy5fdG9nZ2xlKGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWFjdGlvbl0nKSlcbiAgICB0aGlzLnRyaWdnZXIoJ3RvZ2dsZScpXG4gIH1cblxuICBfdG9nZ2xlIChlbCkge1xuICAgIGVsLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LnRvZ2dsZSgnZmEtY2hldnJvbi1sZWZ0JylcbiAgICBlbC5maXJzdENoaWxkLmNsYXNzTGlzdC50b2dnbGUoJ2ZhLWNoZXZyb24tcmlnaHQnKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYXRCdXR0b25cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvY29tcG9uZW50cy9jaGF0LWJ1dHRvbi9jaGF0QnV0dG9uLmpzIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmZ1bmN0aW9uIEV2ZW50TWl4aW4gKCkge1xuICB0aGlzLm9uID0gZnVuY3Rpb24gKG5hbWUsIGNiKSB7XG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGNiKVxuICB9XG4gIHRoaXMudHJpZ2dlciA9IGZ1bmN0aW9uIChuYW1lLCBkYXRhKSB7XG4gICAgbGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUsIHsgZGV0YWlsOiBkYXRhIH0pXG4gICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50TWl4aW5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvY29tcG9uZW50cy9jb21tb24vY3VzdG9tRXZlbnRzLmpzIiwiaW1wb3J0IG1vZGFsVG1wbCBmcm9tICcuL21vZGFsLnB1ZydcblxuY2xhc3MgTG9naW5Gb3JtIHtcbiAgY29uc3RydWN0b3IgKHtcbiAgICBlbCxcbiAgICBFdmVudE1peGluXG4gIH0pIHtcbiAgICAvLyBhZGRpbmcgb24oKSBhbmQgdHJpZ2dlcigpIG1ldGhvZHNcbiAgICBFdmVudE1peGluLmFwcGx5KHRoaXMpXG5cbiAgICB0aGlzLmVsID0gZWxcblxuICAgIHRoaXMucmVuZGVyKClcblxuICAgIHRoaXMudG9nZ2xlTW9kYWwgPSB0aGlzLnRvZ2dsZU1vZGFsLmJpbmQodGhpcylcblxuICAgIHRoaXMuX2luaXRFdmVudHMoKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICB0aGlzLmVsLmlubmVySFRNTCA9IG1vZGFsVG1wbCgpXG5cbiAgICB0aGlzLmNoYXRNb2RhbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsX19jaGF0JylcbiAgICB0aGlzLmNoYXRNb2RhbENsb3NlID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2NoYXQtY2xvc2UnKVxuICAgIHRoaXMuY2hhdE1vZGFsU3VibWl0ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcuY2hhdC1sb2dpbicpXG4gIH1cblxuICB0b2dnbGVNb2RhbCAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgdGhpcy5jaGF0TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnbm90LXZpc2libGUnKVxuICB9XG5cbiAgc3VibWl0TG9naW5Gb3JtIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICB0aGlzLnRyaWdnZXIoJ2xvZ2luJywgeyB1c2VybmFtZTogZS50YXJnZXQubmFtZS52YWx1ZSB9KVxuICAgIHRoaXMudG9nZ2xlTW9kYWwoZSlcbiAgfVxuXG4gIF9pbml0RXZlbnRzICgpIHtcbiAgICB0aGlzLmNoYXRNb2RhbENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGVNb2RhbClcbiAgICB0aGlzLmNoYXRNb2RhbFN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdExvZ2luRm9ybS5iaW5kKHRoaXMpKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2luRm9ybVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9jb21wb25lbnRzL2xvZ2luLWZvcm0vbG9naW5Gb3JtLmpzIiwiY2xhc3MgTWVzc2FnZUZvcm0ge1xuICBjb25zdHJ1Y3RvciAoe1xuICAgIGVsLFxuICAgIEV2ZW50TWl4aW5cbiAgfSkge1xuICAgIC8vIGFkZGluZyBvbigpIGFuZCB0cmlnZ2VyKCkgbWV0aG9kc1xuICAgIEV2ZW50TWl4aW4uYXBwbHkodGhpcylcblxuICAgIHRoaXMuZWwgPSBlbFxuICAgIHRoaXMubWVzc2FnZVRleHRhcmVhID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcjbWVzc2FnZScpXG4gICAgdGhpcy5faW5pdEV2ZW50cygpXG4gIH1cblxuICByZXNldCAoZSkge1xuICAgIHRoaXMuZWwucmVzZXQoKVxuICB9XG5cbiAgc3VibWl0TWVzc2FnZUZvcm0gKGUpIHtcbiAgICBpZiAoZS5jaGFyQ29kZSA9PT0gMTMgJiYgZS5zaGlmdEtleSA9PT0gZmFsc2UpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlLnRyaW0oKSkge1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ21lc3NhZ2UnLCB7IHRleHQ6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgICAgIHRoaXMucmVzZXQoZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfaW5pdEV2ZW50cyAoKSB7XG4gICAgdGhpcy5tZXNzYWdlVGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLnN1Ym1pdE1lc3NhZ2VGb3JtLmJpbmQodGhpcykpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZUZvcm1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvY29tcG9uZW50cy9tZXNzYWdlLWZvcm0vbWVzc2FnZUZvcm0uanMiLCJpbXBvcnQgY2hhdG1sVG1wbCBmcm9tICcuL2NoYXQtbWVzc2FnZS1saXN0LnB1ZydcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJ1xuXG5jbGFzcyBNZXNzYWdlTGlzdCB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgZWwsXG4gICAgdXNlcm5hbWUsXG4gICAgbWVzc2FnZXMsXG4gICAgbWVzc2FnZVNlcnZpY2VcbiAgfSkge1xuICAgIHRoaXMuZWwgPSBlbFxuICAgIHRoaXMubWVzc2FnZVNlcnZpY2UgPSBtZXNzYWdlU2VydmljZVxuICAgIHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlc1xuICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICB0aGlzLmVsLmlubmVySFRNTCA9IGNoYXRtbFRtcGwoe1xuICAgICAgbWVzc2FnZXM6IHRoaXMubWVzc2FnZXMsXG4gICAgICB1c2VybmFtZTogdGhpcy51c2VybmFtZSxcbiAgICAgIGZvcm1hdERhdGU6IGZvcm1hdERhdGVcbiAgICB9KVxuICB9XG5cbiAgZ2V0TG9jYWxNZXNzYWdlcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWVzc2FnZXNcbiAgfVxuXG4gIHNldE1lc3NhZ2VzIChtZXNzYWdlcykge1xuICAgIHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlc1xuICB9XG5cbiAgYWRkTWVzc2FnZSAoZGF0YSkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB7IC8vIHVuc2hpZnQgaXMgbm8gZ29vZFxuICAgICAgdGV4dDogZGF0YS50ZXh0LFxuICAgICAgbmFtZTogZGF0YS5uYW1lIHx8IHRoaXMudXNlcm5hbWUsXG4gICAgICBkYXRlOiBEYXRlLm5vdygpXG4gICAgfVxuICAgIHRoaXMubWVzc2FnZXMudW5zaGlmdChtZXNzYWdlKVxuICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc2F2ZU1lc3NhZ2VzKHRoaXMubWVzc2FnZXMsIG1lc3NhZ2UpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZUxpc3RcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvY29tcG9uZW50cy9tZXNzYWdlLWxpc3QvbWVzc2FnZUxpc3QuanMiLCIvKiBnbG9iYWwgQXVkaW8gKi9cbmNsYXNzIEF1ZGlvU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnNvdW5kcyA9IHtcbiAgICAgICdyZWNlaXZlX21lc3NhZ2UnOiBuZXcgQXVkaW8oJy4vY2hhdC9hc3NldHMvc291bmRzL25vdGlmaWNhdGlvbi5tcDMnKSxcbiAgICAgICdzZW5kX21lc3NhZ2UnOiBuZXcgQXVkaW8oJy4vY2hhdC9hc3NldHMvc291bmRzL3NlbmRpbmcubXAzJylcbiAgICB9XG4gIH1cblxuICBwbGF5IChzb3VuZCkge1xuICAgIHRoaXMuc291bmRzW3NvdW5kXS5wbGF5KClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdWRpb1NlcnZpY2VcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvc2VydmljZXMvYXVkaW9TZXJ2aWNlLmpzIiwiY2xhc3MgQm90aWtTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubmFtZSA9ICdCb3Rpa1NlcnZpY2UnXG4gIH1cblxuICBnZXRSYW5kb21NZXNzYWdlcyAoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICfQoNCw0YHRgdC60LDQttC4INC80L3QtSDRh9GC0L4t0L3QuNCx0YPQtNGMJyxcbiAgICAgICfQnNC90LUg0YHQutGD0YfQvdC+JyxcbiAgICAgICfQniDRh9C10Lwg0YLRiyDQtNGD0LzQsNC10YjRjD8nLFxuICAgICAgJ9Cl0L7Rh9C10YjRjCDQv9C+0LPQvtCy0L7RgNC40YLRjCDQvtCxINGN0YLQvtC8PycsXG4gICAgICAn0JrQsNC6INGC0Ysg0L/RgNC+0LLQtdC7INGB0LLQvtC5INC00LXQvdGMPycsXG4gICAgICAn0KMg0YLQtdCx0Y8g0LXRgdGC0Ywg0L/Qu9Cw0L3RiyDQvdCwINC30LDQstGC0YDQsNGI0L3QuNC5INC00LXQvdGR0Lo/JyxcbiAgICAgICfQotC10LHQtSDQvdGA0LDQstC40YLRgdGPINC/0L7Qs9C+0LTQsCDQt9CwINC+0LrQvtGI0LrQvtC8PycsXG4gICAgICAn0JLQviDRgdC60L7Qu9GM0LrQviDRgtGLINC/0YDQvtGB0L3Rg9C70YHRjz8nLFxuICAgICAgJ9CvINGC0L7QttC1JyxcbiAgICAgICfQkNCz0LAnLFxuICAgICAgJ9CYINGC0LXQsdC1JyxcbiAgICAgICfQpdC80LwsINC40L3RgtC10YDQtdGB0L3QtdC90YzQutC+Li4uJ1xuICAgIF1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCb3Rpa1NlcnZpY2VcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvc2VydmljZXMvYm90aWtTZXJ2aWNlLmpzIiwiLyogZ2xvYmFsIGZldGNoICovXG5pbXBvcnQgeyBzdG9yZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JlU2VydmljZSdcblxuY2xhc3MgTWVzc2FnZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciAoe1xuICAgIGJhc2VVcmwsXG4gICAgY2hhdEdyb3VwXG4gIH0pIHtcbiAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsXG4gICAgdGhpcy5jaGF0R3JvdXAgPSBjaGF0R3JvdXBcbiAgfVxuXG4gIF9yZXF1ZXN0ICgpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5iYXNlVXJsKSAvLyAnY2hhdC9zZXJ2aWNlcy9tb2NrTWVzc2FnZXMuanNvbidcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oKGpzb24pID0+IE9iamVjdC52YWx1ZXMoanNvbikucmV2ZXJzZSgpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICByZXR1cm4gc3RvcmVTZXJ2aWNlLmdldEpTT04oYGNoYXRIaXN0b3J5LSR7dGhpcy5jaGF0R3JvdXB9YClcbiAgICAgIH0pXG4gIH1cblxuICBnZXRNZXNzYWdlTGlzdCAoKSB7XG4gICAgaWYgKHRoaXMuY2hhdEdyb3VwICE9PSAnYm90aWsnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICByZXNvbHZlKHN0b3JlU2VydmljZS5nZXRKU09OKGBjaGF0SGlzdG9yeS0ke3RoaXMuY2hhdEdyb3VwfWApKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBzYXZlTWVzc2FnZXMgKG1lc3NhZ2VzLCBtZXNzYWdlKSB7XG4gICAgaWYgKHRoaXMuY2hhdEdyb3VwICE9PSAnYm90aWsnKSB7XG4gICAgICBmZXRjaCh0aGlzLmJhc2VVcmwsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpXG4gICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgfSlcbiAgICB9XG4gICAgc3RvcmVTZXJ2aWNlLnNldEpTT04oYGNoYXRIaXN0b3J5LSR7dGhpcy5jaGF0R3JvdXB9YCwgbWVzc2FnZXMpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZVNlcnZpY2VcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvc2VydmljZXMvbWVzc2FnZVNlcnZpY2UuanMiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDtwdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDYnV0dG9uIGNsYXNzPVxcXCJidXR0b24gYnV0dG9uLWJsYWNrIGJ1dHRvbl9fc2hvdy1jaGF0XFxcIiBkYXRhLWFjdGlvbj1cXFwidG9nZ2xlXFxcIlxcdTAwM0VcXHUwMDNDaSBjbGFzcz1cXFwiZmEgZmEtY2hldnJvbi1yaWdodFxcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZpXFx1MDAzRVxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVwiOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jaGF0L2NvbXBvbmVudHMvY2hhdC1idXR0b24vY2hhdC1idXR0b24ucHVnXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDtwdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZGl2IGNsYXNzPVxcXCJtb2RhbCBtb2RhbF9fY2hhdCBub3QtdmlzaWJsZVxcXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwibW9kYWxfX2JvZHlcXFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcIm1vZGFsX19jb250ZW50XFxcIlxcdTAwM0VcXHUwMDNDZm9ybSBjbGFzcz1cXFwiY2hhdC1sb2dpblxcXCIgbmFtZT1cXFwiY2hhdC1sb2dpblxcXCJcXHUwMDNFXFx1MDAzQ2ZpZWxkc2V0XFx1MDAzRVxcdTAwM0NsYWJlbCBmb3I9XFxcIm5hbWVcXFwiXFx1MDAzRUVudGVyIHlvIG5hbWVcXHUwMDNDXFx1MDAyRmxhYmVsXFx1MDAzRVxcdTAwM0NpbnB1dCBpZD1cXFwibmFtZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIm5hbWVcXFwiIHJlcXVpcmVkIGF1dG9mb2N1c1xcdTAwM0VcXHUwMDNDXFx1MDAyRmZpZWxkc2V0XFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcImJ1dHRvbi1wcmltYXJ5IG0tbC0xIGZsb2F0LXJpZ2h0XFxcIiB0eXBlPVxcXCJzdWJtaXRcXFwiXFx1MDAzRUVudGVyIGNoYXRcXHUwMDNDXFx1MDAyRmJ1dHRvblxcdTAwM0VcXHUwMDNDYnV0dG9uIGNsYXNzPVxcXCJidXR0b24tb3V0bGluZSBmbG9hdC1yaWdodCBtb2RhbF9fY2hhdC1jbG9zZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIlxcdTAwM0VDbG9zZVxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NcXHUwMDJGZm9ybVxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcIjs7cmV0dXJuIHB1Z19odG1sO307XG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2hhdC9jb21wb25lbnRzL2xvZ2luLWZvcm0vbW9kYWwucHVnXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDs7dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAodXNlcm5hbWUpIHtwdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZGl2IGNsYXNzPVxcXCJjb2x1bW4tY2VudGVyIGNoYXRfX2FwcFxcXCJcXHUwMDNFXFx1MDAzQ2RpdlwiICsgKHB1Zy5hdHRyKFwiY2xhc3NcIiwgcHVnLmNsYXNzZXMoW1wibG9naW4tZmFsc2VcIix1c2VybmFtZSA/ICdoaWRkZW4nIDogJyddLCBbZmFsc2UsdHJ1ZV0pLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXFx1MDAzQ2J1dHRvbiBjbGFzcz1cXFwiYnV0dG9uLXByaW1hcnkgY2hhdF9fbG9naW4tYnV0dG9uXFxcIlxcdTAwM0VKb2luIGNoYXRcXHUwMDNDXFx1MDAyRmJ1dHRvblxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2XCIgKyAocHVnLmF0dHIoXCJjbGFzc1wiLCBwdWcuY2xhc3NlcyhbXCJsb2dpbi10cnVlXCIsIXVzZXJuYW1lID8gJ2hpZGRlbicgOiAnJ10sIFtmYWxzZSx0cnVlXSksIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJjaGF0X19oZWFkZXJcXFwiXFx1MDAzRVxcdTAwM0NpIGNsYXNzPVxcXCJmYSBmYS11c2VyLWNpcmNsZS1vIGhlYWRlcl9fYXZhdGFyXFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRmlcXHUwMDNFXFx1MDAzQ3AgY2xhc3M9XFxcImhlYWRlcl9fbmFtZVxcXCJcXHUwMDNFQ2hhdCB3aXRoJm5ic3A7XFx1MDAzQ2EgaHJlZj1cXFwiI1xcXCIgZGF0YS1hY3Rpb249XFxcImJvdGlrXFxcIlxcdTAwM0VCb3Rpa1xcdTAwM0NcXHUwMDJGYVxcdTAwM0UmbmJzcDsgfCAmbmJzcDtcXHUwMDNDYSBocmVmPVxcXCIjXFxcIiBkYXRhLWFjdGlvbj1cXFwiZ3JvdXBcXFwiXFx1MDAzRUdyb3VwXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVxcdTAwM0NcXHUwMDJGcFxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJjaGF0X19ib2R5XFxcIlxcdTAwM0VcIiArIChudWxsID09IChwdWdfaW50ZXJwID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9tZXNzYWdlLWxpc3QvY2hhdC1tZXNzYWdlLWxpc3QucHVnXCIpLmNhbGwodGhpcywgbG9jYWxzKSkgPyBcIlwiIDogcHVnX2ludGVycCkgKyBcIlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImNoYXRfX2Zvb3RlclxcXCJcXHUwMDNFXFx1MDAzQ2Zvcm0gY2xhc3M9XFxcImNoYXRfX2Zvcm1cXFwiIG5hbWU9XFxcImNoYXRfX2Zvcm1cXFwiXFx1MDAzRVxcdTAwM0N0ZXh0YXJlYSBpZD1cXFwibWVzc2FnZVxcXCIgcGxhY2Vob2xkZXI9XFxcIkVudGVyIG1lc3NhZ2UuLi5cXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGdGV4dGFyZWFcXHUwMDNFXFx1MDAzQ1xcdTAwMkZmb3JtXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiO30uY2FsbCh0aGlzLFwidXNlcm5hbWVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVzZXJuYW1lOnR5cGVvZiB1c2VybmFtZSE9PVwidW5kZWZpbmVkXCI/dXNlcm5hbWU6dW5kZWZpbmVkKSk7O3JldHVybiBwdWdfaHRtbDt9O1xubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NoYXQvbWFpbi5wdWdcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGZzIChpZ25vcmVkKVxuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IENoYXQgZnJvbSAnLi9jaGF0L21haW4nXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldyAqL1xubmV3IENoYXQoe1xuICBlbDogJy5jaGF0JyxcbiAgYnV0dG9uRWw6ICcud2Vic2l0ZScsIC8vIGVsZW1lbnQgdG8gYXBwZW5kIGNoYXQgdG9vZ2xlIGJ1dHRvbi4gTXVzdCBiZSByZWxhdGl2ZS5cbiAgaXNPcGVuZWRPblN0YXJ0OiB0cnVlIC8vIGRlZmF1bHQgdmFsdWU6IHRydWVcbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9
