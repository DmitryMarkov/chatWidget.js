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
        // console.log(res)
        _this2.render();
        _this2._initComponents();
        if (!_this2.userName) {
          _this2.el.appendChild(_this2.loginForm.el);
        }
        if (_this2.chatGroup !== 'botik') {
          _this2.startPolling();
        }

        _this2._initEvents();
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
      if (!this.userName) {
        this.el.querySelector('.chat__login-button').addEventListener('click', this.loginForm.toggleModal);
      }

      this.el.querySelector('.header__name').addEventListener('click', this._changeGroup.bind(this));

      this.loginForm.on('login', this._onLogin.bind(this));

      this.messageForm.on('message', this._onMessage.bind(this));

      this.chatButton.on('toggle', this._onToggle.bind(this));
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
        _this3.messageService.getMessageList().then(function (res) {
          console.log(res);
          // TODO: implement messageList update
          // this.messageList.setMessages(res)
          // this.messageList.render()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjZkZjNkZTEwNTNjYjc5ODcxNDkiLCJ3ZWJwYWNrOi8vLy4vfi9wdWctcnVudGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L3V0aWxzL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9zZXJ2aWNlcy9zdG9yZVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9jaGF0LW1lc3NhZ2UtbGlzdC5wdWciLCJ3ZWJwYWNrOi8vLy4vY2hhdC9tYWluLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9ib3Rpay9jaGF0Qm90LmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9jaGF0LWJ1dHRvbi9jaGF0QnV0dG9uLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9jb21tb24vY3VzdG9tRXZlbnRzLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9sb2dpbi1mb3JtL2xvZ2luRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L2NvbXBvbmVudHMvbWVzc2FnZS1mb3JtL21lc3NhZ2VGb3JtLmpzIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9tZXNzYWdlLWxpc3QvbWVzc2FnZUxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9zZXJ2aWNlcy9hdWRpb1NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9zZXJ2aWNlcy9ib3Rpa1NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdC9zZXJ2aWNlcy9tZXNzYWdlU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9jaGF0L2NvbXBvbmVudHMvY2hhdC1idXR0b24vY2hhdC1idXR0b24ucHVnIiwid2VicGFjazovLy8uL2NoYXQvY29tcG9uZW50cy9sb2dpbi1mb3JtL21vZGFsLnB1ZyIsIndlYnBhY2s6Ly8vLi9jaGF0L21haW4ucHVnIiwid2VicGFjazovLy9mcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIl0sIm5hbWVzIjpbImdldFJhbmRvbU51bWJlciIsImZvcm1hdERhdGUiLCJtYXgiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJkYXRlU3RyaW5nIiwiZGF0ZU9iaiIsIkRhdGUiLCJmb3JtYXR0ZWREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwic3RvcmVTZXJ2aWNlIiwiZ2V0SXRlbSIsImtleSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJzdHJpbmciLCJyZW1vdmUiLCJyZW1vdmVJdGVtIiwiZ2V0SlNPTiIsIkpTT04iLCJwYXJzZSIsInNldEpTT04iLCJvYmoiLCJzdHJpbmdpZnkiLCJDaGF0IiwiZWwiLCJidXR0b25FbCIsImlzT3BlbmVkT25TdGFydCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIl9pbml0IiwiaW5uZXJIVE1MIiwibWVzc2FnZXMiLCJ1c2VybmFtZSIsInVzZXJOYW1lIiwiX29uVG9nZ2xlIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJkYXRhc2V0IiwiYWN0aW9uIiwiY2hhdEdyb3VwIiwiY2xhc3NMaXN0IiwiYWRkIiwiX2luaXRTZXJ2aWNlcyIsIm1lc3NhZ2VTZXJ2aWNlIiwiZ2V0TWVzc2FnZUxpc3QiLCJ0aGVuIiwicmVzIiwicmVuZGVyIiwiX2luaXRDb21wb25lbnRzIiwiYXBwZW5kQ2hpbGQiLCJsb2dpbkZvcm0iLCJzdGFydFBvbGxpbmciLCJfaW5pdEV2ZW50cyIsImJhc2VVcmwiLCJhdWRpb1NlcnZpY2UiLCJib3Rpa1NlcnZpY2UiLCJjaGF0QnV0dG9uIiwiY3JlYXRlRWxlbWVudCIsInBhcmVudEVsIiwiRXZlbnRNaXhpbiIsIm1lc3NhZ2VGb3JtIiwibWVzc2FnZUxpc3QiLCJib3RpayIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b2dnbGVNb2RhbCIsIl9jaGFuZ2VHcm91cCIsImJpbmQiLCJvbiIsIl9vbkxvZ2luIiwiX29uTWVzc2FnZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImNsb3Nlc3QiLCJjb250YWlucyIsInBhcmVudE5vZGUiLCJjaGlsZHJlbiIsImNoaWxkIiwidG9nZ2xlIiwic3RvcFBvbGxpbmciLCJkZXRhaWwiLCJsZW5ndGgiLCJhbnN3ZXIiLCJhZGRNZXNzYWdlIiwidGV4dCIsIm5hbWUiLCJwbGF5IiwiX19wb2xsaW5nSUQiLCJzZXRJbnRlcnZhbCIsImNvbnNvbGUiLCJsb2ciLCJjbGVhckludGVydmFsIiwiQ2hhdEJvdCIsImFuc3dlcnMiLCJnZXRSYW5kb21NZXNzYWdlcyIsIm1lc3NhZ2UiLCJzZXRUaW1lb3V0IiwiQ2hhdEJ1dHRvbiIsImFwcGx5IiwiX3RvZ2dsZSIsImZpcnN0Q2hpbGQiLCJ0cmlnZ2VyIiwiY2IiLCJkYXRhIiwiZXZlbnQiLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJMb2dpbkZvcm0iLCJjaGF0TW9kYWwiLCJjaGF0TW9kYWxDbG9zZSIsImNoYXRNb2RhbFN1Ym1pdCIsInZhbHVlIiwic3VibWl0TG9naW5Gb3JtIiwiTWVzc2FnZUZvcm0iLCJtZXNzYWdlVGV4dGFyZWEiLCJyZXNldCIsImNoYXJDb2RlIiwic2hpZnRLZXkiLCJ0cmltIiwic3VibWl0TWVzc2FnZUZvcm0iLCJNZXNzYWdlTGlzdCIsImRhdGUiLCJub3ciLCJ1bnNoaWZ0Iiwic2F2ZU1lc3NhZ2VzIiwiQXVkaW9TZXJ2aWNlIiwic291bmRzIiwiQXVkaW8iLCJzb3VuZCIsIkJvdGlrU2VydmljZSIsIk1lc3NhZ2VTZXJ2aWNlIiwiZmV0Y2giLCJyZXNwb25zZSIsImpzb24iLCJPYmplY3QiLCJ2YWx1ZXMiLCJyZXZlcnNlIiwiY2F0Y2giLCJlcnIiLCJfcmVxdWVzdCIsIlByb21pc2UiLCJyZXNvbHZlIiwibWV0aG9kIiwiYm9keSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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LENBR1EsVUFBQ3VGLFFBQUQsRUFBYztBQUNwQjNDLGtCQUFRQyxHQUFSLENBQVkwQyxRQUFaO0FBQ0QsU0FMRCxFQUtHSyxLQUxILENBS1MsVUFBQ0MsR0FBRCxFQUFTO0FBQ2hCakQsa0JBQVFDLEdBQVIsQ0FBWWdELEdBQVo7QUFDRCxTQVBEO0FBUUQ7QUFDRCxpQ0FBYXRILE9BQWIsa0JBQW9DLEtBQUttQixTQUF6QyxFQUFzRFIsUUFBdEQ7QUFDRDs7Ozs7O2tCQUdZbUcsYzs7Ozs7O0FDL0NmOztBQUVBLDJCQUEyQixrQ0FBa0MsYUFBYSx5TUFBeU07QUFDblIsMEI7Ozs7OztBQ0hBOztBQUVBLDJCQUEyQixrQ0FBa0MsYUFBYSxvdEJBQW90QjtBQUM5eEIsMEI7Ozs7OztBQ0hBOztBQUVBLDJCQUEyQixrQ0FBa0MsY0FBYyxtQ0FBbUMsRUFBRSxzQkFBc0IsMGxCQUEwbEIsNEVBQTRFLFNBQVMsd2hCQUE0akIsc0hBQXNIO0FBQ3YrQywwQjs7Ozs7O0FDSEEsZTs7Ozs7Ozs7O0FDQUE7Ozs7OztBQUVBO0FBQ0EsbUJBQVM7QUFDUDFHLE1BQUksT0FERztBQUVQQyxZQUFVLFVBRkgsRUFFZTtBQUN0QkMsbUJBQWlCLElBSFYsQ0FHZTtBQUhmLENBQVQsRSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI2ZGYzZGUxMDUzY2I3OTg3MTQ5IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVnX2hhc19vd25fcHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBwdWdfbWVyZ2U7XG5mdW5jdGlvbiBwdWdfbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IHB1Z19tZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSA9PT0gJ2NsYXNzJykge1xuICAgICAgdmFyIHZhbEEgPSBhW2tleV0gfHwgW107XG4gICAgICBhW2tleV0gPSAoQXJyYXkuaXNBcnJheSh2YWxBKSA/IHZhbEEgOiBbdmFsQV0pLmNvbmNhdChiW2tleV0gfHwgW10pO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICB2YXIgdmFsQSA9IHB1Z19zdHlsZShhW2tleV0pO1xuICAgICAgdmFyIHZhbEIgPSBwdWdfc3R5bGUoYltrZXldKTtcbiAgICAgIGFba2V5XSA9IHZhbEEgKyB2YWxCO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYXJyYXksIG9iamVjdCwgb3Igc3RyaW5nIGFzIGEgc3RyaW5nIG9mIGNsYXNzZXMgZGVsaW1pdGVkIGJ5IGEgc3BhY2UuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gYXJyYXksIGFsbCBtZW1iZXJzIG9mIGl0IGFuZCBpdHMgc3ViYXJyYXlzIGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBJZiBgZXNjYXBpbmdgIGlzIGFuIGFycmF5LCB0aGVuIHdoZXRoZXIgb3Igbm90IHRoZSBpdGVtIGluIGB2YWxgIGlzXG4gKiBlc2NhcGVkIGRlcGVuZHMgb24gdGhlIGNvcnJlc3BvbmRpbmcgaXRlbSBpbiBgZXNjYXBpbmdgLiBJZiBgZXNjYXBpbmdgIGlzXG4gKiBub3QgYW4gYXJyYXksIG5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gb2JqZWN0LCBhbGwgdGhlIGtleXMgd2hvc2UgdmFsdWUgaXMgdHJ1dGh5IGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBObyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIElmIGB2YWxgIGlzIGEgc3RyaW5nLCBpdCBpcyBjb3VudGVkIGFzIGEgY2xhc3MuIE5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogQHBhcmFtIHsoQXJyYXkuPHN0cmluZz58T2JqZWN0LjxzdHJpbmcsIGJvb2xlYW4+fHN0cmluZyl9IHZhbFxuICogQHBhcmFtIHs/QXJyYXkuPHN0cmluZz59IGVzY2FwaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xhc3NlcyA9IHB1Z19jbGFzc2VzO1xuZnVuY3Rpb24gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZykge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgY2xhc3NOYW1lLCBwYWRkaW5nID0gJycsIGVzY2FwZUVuYWJsZWQgPSBBcnJheS5pc0FycmF5KGVzY2FwaW5nKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICBjbGFzc05hbWUgPSBwdWdfY2xhc3Nlcyh2YWxbaV0pO1xuICAgIGlmICghY2xhc3NOYW1lKSBjb250aW51ZTtcbiAgICBlc2NhcGVFbmFibGVkICYmIGVzY2FwaW5nW2ldICYmIChjbGFzc05hbWUgPSBwdWdfZXNjYXBlKGNsYXNzTmFtZSkpO1xuICAgIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgKyBwYWRkaW5nICsgY2xhc3NOYW1lO1xuICAgIHBhZGRpbmcgPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNsYXNzU3RyaW5nO1xufVxuZnVuY3Rpb24gcHVnX2NsYXNzZXNfb2JqZWN0KHZhbCkge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgcGFkZGluZyA9ICcnO1xuICBmb3IgKHZhciBrZXkgaW4gdmFsKSB7XG4gICAgaWYgKGtleSAmJiB2YWxba2V5XSAmJiBwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwga2V5KSkge1xuICAgICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHBhZGRpbmcgKyBrZXk7XG4gICAgICBwYWRkaW5nID0gJyAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2xhc3NTdHJpbmc7XG59XG5mdW5jdGlvbiBwdWdfY2xhc3Nlcyh2YWwsIGVzY2FwaW5nKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICByZXR1cm4gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZyk7XG4gIH0gZWxzZSBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHB1Z19jbGFzc2VzX29iamVjdCh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWwgfHwgJyc7XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IG9iamVjdCBvciBzdHJpbmcgdG8gYSBzdHJpbmcgb2YgQ1NTIHN0eWxlcyBkZWxpbWl0ZWQgYnkgYSBzZW1pY29sb24uXG4gKlxuICogQHBhcmFtIHsoT2JqZWN0LjxzdHJpbmcsIHN0cmluZz58c3RyaW5nKX0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZXhwb3J0cy5zdHlsZSA9IHB1Z19zdHlsZTtcbmZ1bmN0aW9uIHB1Z19zdHlsZSh2YWwpIHtcbiAgaWYgKCF2YWwpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIHN0eWxlIGluIHZhbCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwgc3R5bGUpKSB7XG4gICAgICAgIG91dCA9IG91dCArIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXSArICc7JztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfSBlbHNlIHtcbiAgICB2YWwgKz0gJyc7XG4gICAgaWYgKHZhbFt2YWwubGVuZ3RoIC0gMV0gIT09ICc7JykgXG4gICAgICByZXR1cm4gdmFsICsgJzsnO1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IHB1Z19hdHRyO1xuZnVuY3Rpb24gcHVnX2F0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmICh2YWwgPT09IGZhbHNlIHx8IHZhbCA9PSBudWxsIHx8ICF2YWwgJiYgKGtleSA9PT0gJ2NsYXNzJyB8fCBrZXkgPT09ICdzdHlsZScpKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbC50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YWwgPSB2YWwudG9KU09OKCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICBpZiAoIWVzY2FwZWQgJiYgdmFsLmluZGV4T2YoJ1wiJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cXCcnICsgdmFsLnJlcGxhY2UoLycvZywgJyYjMzk7JykgKyAnXFwnJztcbiAgICB9XG4gIH1cbiAgaWYgKGVzY2FwZWQpIHZhbCA9IHB1Z19lc2NhcGUodmFsKTtcbiAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gdGVyc2Ugd2hldGhlciB0byB1c2UgSFRNTDUgdGVyc2UgYm9vbGVhbiBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBwdWdfYXR0cnM7XG5mdW5jdGlvbiBwdWdfYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBhdHRycyA9ICcnO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAocHVnX2hhc19vd25fcHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfY2xhc3Nlcyh2YWwpO1xuICAgICAgICBhdHRycyA9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpICsgYXR0cnM7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKCdzdHlsZScgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfc3R5bGUodmFsKTtcbiAgICAgIH1cbiAgICAgIGF0dHJzICs9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdHRycztcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgcHVnX21hdGNoX2h0bWwgPSAvW1wiJjw+XS87XG5leHBvcnRzLmVzY2FwZSA9IHB1Z19lc2NhcGU7XG5mdW5jdGlvbiBwdWdfZXNjYXBlKF9odG1sKXtcbiAgdmFyIGh0bWwgPSAnJyArIF9odG1sO1xuICB2YXIgcmVnZXhSZXN1bHQgPSBwdWdfbWF0Y2hfaHRtbC5leGVjKGh0bWwpO1xuICBpZiAoIXJlZ2V4UmVzdWx0KSByZXR1cm4gX2h0bWw7XG5cbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgaSwgbGFzdEluZGV4LCBlc2NhcGU7XG4gIGZvciAoaSA9IHJlZ2V4UmVzdWx0LmluZGV4LCBsYXN0SW5kZXggPSAwOyBpIDwgaHRtbC5sZW5ndGg7IGkrKykge1xuICAgIHN3aXRjaCAoaHRtbC5jaGFyQ29kZUF0KGkpKSB7XG4gICAgICBjYXNlIDM0OiBlc2NhcGUgPSAnJnF1b3Q7JzsgYnJlYWs7XG4gICAgICBjYXNlIDM4OiBlc2NhcGUgPSAnJmFtcDsnOyBicmVhaztcbiAgICAgIGNhc2UgNjA6IGVzY2FwZSA9ICcmbHQ7JzsgYnJlYWs7XG4gICAgICBjYXNlIDYyOiBlc2NhcGUgPSAnJmd0Oyc7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogY29udGludWU7XG4gICAgfVxuICAgIGlmIChsYXN0SW5kZXggIT09IGkpIHJlc3VsdCArPSBodG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsIGkpO1xuICAgIGxhc3RJbmRleCA9IGkgKyAxO1xuICAgIHJlc3VsdCArPSBlc2NhcGU7XG4gIH1cbiAgaWYgKGxhc3RJbmRleCAhPT0gaSkgcmV0dXJuIHJlc3VsdCArIGh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCwgaSk7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgcHVnIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIG9yaWdpbmFsIHNvdXJjZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gcHVnX3JldGhyb3c7XG5mdW5jdGlvbiBwdWdfcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcHVnX3JldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdQdWcnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wdWctcnVudGltZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEdlbmVyYXRlIHJhbmRvbSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXhpbXVtIHZhbHVlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSByYW5kb20gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbU51bWJlciAobWF4KSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gMSkpXG59XG5cbi8qKlxuICogRGF0ZSBmb3JtYXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIGluIG1zXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBmb3JtYXR0ZWREYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlIChkYXRlU3RyaW5nKSB7XG4gIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZShkYXRlU3RyaW5nKVxuICBjb25zdCBmb3JtYXR0ZWREYXRlID0gZGF0ZU9iai5nZXRIb3VycygpICsgJzonICsgZGF0ZU9iai5nZXRNaW51dGVzKClcbiAgcmV0dXJuIGZvcm1hdHRlZERhdGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvdXRpbHMvdXRpbC5qcyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5cbmV4cG9ydCBjb25zdCBzdG9yZVNlcnZpY2UgPSB7XG4gIGdldEl0ZW06IChrZXkpID0+IHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSB8fCAnJ1xuICB9LFxuICBzZXRJdGVtOiAoa2V5LCBzdHJpbmcpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHN0cmluZylcbiAgfSxcblxuICByZW1vdmU6IChrZXkpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXG4gIH0sXG5cbiAgZ2V0SlNPTjogKGtleSkgPT4ge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkgfHwgJ1tdJylcbiAgfSxcbiAgc2V0SlNPTjogKGtleSwgb2JqKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShvYmopKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L3NlcnZpY2VzL3N0b3JlU2VydmljZS5qcyIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwOzt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChmb3JtYXREYXRlLCBtZXNzYWdlcywgdXNlcm5hbWUpIHsvLyBpdGVyYXRlIG1lc3NhZ2VzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IG1lc3NhZ2VzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgcHVnX2luZGV4MCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgcHVnX2luZGV4MCA8ICQkbDsgcHVnX2luZGV4MCsrKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gJCRvYmpbcHVnX2luZGV4MF07XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZGl2XCIgKyAocHVnLmF0dHIoXCJjbGFzc1wiLCBwdWcuY2xhc3NlcyhbXCJjaGF0X19tZXNzYWdlXCIsbWVzc2FnZS5uYW1lID09PSB1c2VybmFtZSA/ICdjaGF0X19tZXNzYWdlLW15JyA6ICcnXSwgW2ZhbHNlLHRydWVdKSwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcIm1lc3NhZ2VfX3RpbWVcXFwiXFx1MDAzRVwiICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IG1lc3NhZ2UubmFtZSA9PT0gdXNlcm5hbWUgPyAnJyA6IG1lc3NhZ2UubmFtZSkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2XFx1MDAzRVwiICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IG1lc3NhZ2UudGV4dCkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJtZXNzYWdlX190aW1lIGZsb2F0LXJpZ2h0XFxcIlxcdTAwM0VcIiArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBmb3JtYXREYXRlKG1lc3NhZ2UuZGF0ZSkpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXCI7XG4gICAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgcHVnX2luZGV4MCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7XG4gICAgICB2YXIgbWVzc2FnZSA9ICQkb2JqW3B1Z19pbmRleDBdO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2RpdlwiICsgKHB1Zy5hdHRyKFwiY2xhc3NcIiwgcHVnLmNsYXNzZXMoW1wiY2hhdF9fbWVzc2FnZVwiLG1lc3NhZ2UubmFtZSA9PT0gdXNlcm5hbWUgPyAnY2hhdF9fbWVzc2FnZS1teScgOiAnJ10sIFtmYWxzZSx0cnVlXSksIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJtZXNzYWdlX190aW1lXFxcIlxcdTAwM0VcIiArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBtZXNzYWdlLm5hbWUgPT09IHVzZXJuYW1lID8gJycgOiBtZXNzYWdlLm5hbWUpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdlxcdTAwM0VcIiArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBtZXNzYWdlLnRleHQpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwibWVzc2FnZV9fdGltZSBmbG9hdC1yaWdodFxcXCJcXHUwMDNFXCIgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gZm9ybWF0RGF0ZShtZXNzYWdlLmRhdGUpKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiO1xuICAgIH1cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwiZm9ybWF0RGF0ZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZm9ybWF0RGF0ZTp0eXBlb2YgZm9ybWF0RGF0ZSE9PVwidW5kZWZpbmVkXCI/Zm9ybWF0RGF0ZTp1bmRlZmluZWQsXCJtZXNzYWdlc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubWVzc2FnZXM6dHlwZW9mIG1lc3NhZ2VzIT09XCJ1bmRlZmluZWRcIj9tZXNzYWdlczp1bmRlZmluZWQsXCJ1c2VybmFtZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudXNlcm5hbWU6dHlwZW9mIHVzZXJuYW1lIT09XCJ1bmRlZmluZWRcIj91c2VybmFtZTp1bmRlZmluZWQpKTs7cmV0dXJuIHB1Z19odG1sO307XG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2hhdC9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9jaGF0LW1lc3NhZ2UtbGlzdC5wdWdcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGNoYXRUbXBsIGZyb20gJy4vbWFpbi5wdWcnXG5cbmltcG9ydCBNZXNzYWdlU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL21lc3NhZ2VTZXJ2aWNlJ1xuaW1wb3J0IEF1ZGlvU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL2F1ZGlvU2VydmljZSdcbmltcG9ydCBCb3Rpa1NlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9ib3Rpa1NlcnZpY2UnXG5cbmltcG9ydCBDaGF0QnV0dG9uIGZyb20gJy4vY29tcG9uZW50cy9jaGF0LWJ1dHRvbi9jaGF0QnV0dG9uJ1xuaW1wb3J0IExvZ2luRm9ybSBmcm9tICcuL2NvbXBvbmVudHMvbG9naW4tZm9ybS9sb2dpbkZvcm0nXG5pbXBvcnQgTWVzc2FnZUxpc3QgZnJvbSAnLi9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9tZXNzYWdlTGlzdCdcbmltcG9ydCBNZXNzYWdlRm9ybSBmcm9tICcuL2NvbXBvbmVudHMvbWVzc2FnZS1mb3JtL21lc3NhZ2VGb3JtJ1xuaW1wb3J0IEJvdGlrIGZyb20gJy4vY29tcG9uZW50cy9ib3Rpay9jaGF0Qm90J1xuXG5pbXBvcnQgeyBzdG9yZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0b3JlU2VydmljZSdcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICcuL3V0aWxzL3V0aWwnXG5pbXBvcnQgRXZlbnRNaXhpbiBmcm9tICcuL2NvbXBvbmVudHMvY29tbW9uL2N1c3RvbUV2ZW50cydcblxuY2xhc3MgQ2hhdCB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgZWwsXG4gICAgYnV0dG9uRWwsXG4gICAgaXNPcGVuZWRPblN0YXJ0XG4gIH0pIHtcbiAgICB0aGlzLmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcbiAgICB0aGlzLmJ1dHRvbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b25FbClcbiAgICB0aGlzLmlzT3BlbmVkT25TdGFydCA9IGlzT3BlbmVkT25TdGFydFxuXG4gICAgdGhpcy5faW5pdCgpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gY2hhdFRtcGwoe1xuICAgICAgbWVzc2FnZXM6IHRoaXMubWVzc2FnZXMsXG4gICAgICB1c2VybmFtZTogdGhpcy51c2VyTmFtZSxcbiAgICAgIGZvcm1hdERhdGU6IGZvcm1hdERhdGVcbiAgICB9KVxuXG4gICAgaWYgKCF0aGlzLmlzT3BlbmVkT25TdGFydCkge1xuICAgICAgdGhpcy5fb25Ub2dnbGUoKVxuICAgIH1cblxuICAgIFsuLi50aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfX25hbWUgYScpXS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgaWYgKGVsLmRhdGFzZXQuYWN0aW9uID09PSB0aGlzLmNoYXRHcm91cCkgZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICB9KVxuICB9XG5cbiAgX2luaXQgKCkge1xuICAgIHRoaXMudXNlck5hbWUgPSBzdG9yZVNlcnZpY2UuZ2V0SXRlbSgnY2hhdFdpZGdldE5hbWUnKVxuICAgIHRoaXMuY2hhdEdyb3VwID0gc3RvcmVTZXJ2aWNlLmdldEl0ZW0oJ2NoYXRXaWRnZXRHcm91cCcpIHx8ICdib3RpaydcblxuICAgIHRoaXMuX2luaXRTZXJ2aWNlcygpXG5cbiAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmdldE1lc3NhZ2VMaXN0KClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHJlc1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIHRoaXMucmVuZGVyKClcbiAgICAgICAgdGhpcy5faW5pdENvbXBvbmVudHMoKVxuICAgICAgICBpZiAoIXRoaXMudXNlck5hbWUpIHtcbiAgICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMubG9naW5Gb3JtLmVsKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNoYXRHcm91cCAhPT0gJ2JvdGlrJykge1xuICAgICAgICAgIHRoaXMuc3RhcnRQb2xsaW5nKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2luaXRFdmVudHMoKVxuICAgICAgfSlcbiAgfVxuXG4gIF9pbml0U2VydmljZXMgKCkge1xuICAgIHRoaXMubWVzc2FnZVNlcnZpY2UgPSBuZXcgTWVzc2FnZVNlcnZpY2Uoe1xuICAgICAgYmFzZVVybDogJ2h0dHBzOi8vY29tcG9uZW50cy0xNjAxLTE5MzAuZmlyZWJhc2Vpby5jb20vY2hhdC9tZXNzYWdlcy5qc29uJyxcbiAgICAgIGNoYXRHcm91cDogdGhpcy5jaGF0R3JvdXBcbiAgICB9KVxuICAgIHRoaXMuYXVkaW9TZXJ2aWNlID0gbmV3IEF1ZGlvU2VydmljZSgpXG4gICAgdGhpcy5ib3Rpa1NlcnZpY2UgPSBuZXcgQm90aWtTZXJ2aWNlKClcbiAgfVxuXG4gIF9pbml0Q29tcG9uZW50cyAoKSB7XG4gICAgdGhpcy5jaGF0QnV0dG9uID0gbmV3IENoYXRCdXR0b24oe1xuICAgICAgZWw6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgcGFyZW50RWw6IHRoaXMuYnV0dG9uRWwsXG4gICAgICBpc09wZW5lZE9uU3RhcnQ6IHRoaXMuaXNPcGVuZWRPblN0YXJ0LFxuICAgICAgRXZlbnRNaXhpblxuICAgIH0pXG5cbiAgICAvLyBtYXliZSB3ZSBzaG91bGQgbm90IGNyZWF0ZSBpbnN0YW5jZSBpZiBhbHJlYWR5IGxvZ2dlZCBpblxuICAgIHRoaXMubG9naW5Gb3JtID0gbmV3IExvZ2luRm9ybSh7XG4gICAgICBlbDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICBFdmVudE1peGluXG4gICAgfSlcbiAgICB0aGlzLm1lc3NhZ2VGb3JtID0gbmV3IE1lc3NhZ2VGb3JtKHtcbiAgICAgIGVsOiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGF0X19mb3JtJyksXG4gICAgICBFdmVudE1peGluXG4gICAgfSlcbiAgICB0aGlzLm1lc3NhZ2VMaXN0ID0gbmV3IE1lc3NhZ2VMaXN0KHtcbiAgICAgIGVsOiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGF0X19ib2R5JyksXG4gICAgICB1c2VybmFtZTogdGhpcy51c2VyTmFtZSxcbiAgICAgIG1lc3NhZ2VzOiB0aGlzLm1lc3NhZ2VzLFxuICAgICAgbWVzc2FnZVNlcnZpY2U6IHRoaXMubWVzc2FnZVNlcnZpY2VcbiAgICB9KVxuXG4gICAgdGhpcy5ib3RpayA9IG5ldyBCb3Rpayh7XG4gICAgICBhdWRpb1NlcnZpY2U6IHRoaXMuYXVkaW9TZXJ2aWNlLFxuICAgICAgbWVzc2FnZUxpc3Q6IHRoaXMubWVzc2FnZUxpc3QsXG4gICAgICBib3Rpa1NlcnZpY2U6IHRoaXMuYm90aWtTZXJ2aWNlXG4gICAgfSlcbiAgfVxuXG4gIF9pbml0RXZlbnRzICgpIHtcbiAgICBpZiAoIXRoaXMudXNlck5hbWUpIHtcbiAgICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmNoYXRfX2xvZ2luLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5sb2dpbkZvcm0udG9nZ2xlTW9kYWwpXG4gICAgfVxuXG4gICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19uYW1lJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jaGFuZ2VHcm91cC5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5sb2dpbkZvcm0ub24oJ2xvZ2luJywgdGhpcy5fb25Mb2dpbi5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5tZXNzYWdlRm9ybS5vbignbWVzc2FnZScsIHRoaXMuX29uTWVzc2FnZS5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5jaGF0QnV0dG9uLm9uKCd0b2dnbGUnLCB0aGlzLl9vblRvZ2dsZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgX2NoYW5nZUdyb3VwIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgZWwgPSBlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1hY3Rpb25dJylcbiAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgIFsuLi5lbC5wYXJlbnROb2RlLmNoaWxkcmVuXS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICBjaGlsZC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuICAgICAgfSlcbiAgICAgIHN0b3JlU2VydmljZS5zZXRJdGVtKCdjaGF0V2lkZ2V0R3JvdXAnLCBlbC5kYXRhc2V0LmFjdGlvbilcbiAgICAgIHRoaXMuY2hhdEdyb3VwID0gZWwuZGF0YXNldC5hY3Rpb25cbiAgICAgIGlmICh0aGlzLmNoYXRHcm91cCA9PT0gJ2JvdGlrJykge1xuICAgICAgICB0aGlzLnN0b3BQb2xsaW5nKClcbiAgICAgIH1cbiAgICAgIHRoaXMuX2luaXQoKVxuICAgIH1cbiAgfVxuXG4gIF9vbkxvZ2luIChlKSB7XG4gICAgdGhpcy51c2VyTmFtZSA9IGUuZGV0YWlsLnVzZXJuYW1lXG4gICAgc3RvcmVTZXJ2aWNlLnNldEl0ZW0oJ2NoYXRXaWRnZXROYW1lJywgdGhpcy51c2VyTmFtZSlcblxuICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcignLmxvZ2luLWZhbHNlJykuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbi10cnVlJykuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcblxuICAgIGlmICghdGhpcy5tZXNzYWdlcy5sZW5ndGggJiYgdGhpcy51c2VyTmFtZSkge1xuICAgICAgdGhpcy5ib3Rpay5hbnN3ZXIoYNCf0YDQuNCy0LXRgiwgJHt0aGlzLnVzZXJOYW1lfSFgKVxuICAgIH1cbiAgfVxuXG4gIF9vbk1lc3NhZ2UgKGUpIHtcbiAgICB0aGlzLm1lc3NhZ2VMaXN0LmFkZE1lc3NhZ2Uoe1xuICAgICAgdGV4dDogZS5kZXRhaWwudGV4dCxcbiAgICAgIG5hbWU6IHRoaXMudXNlck5hbWVcbiAgICB9KVxuICAgIHRoaXMubWVzc2FnZUxpc3QucmVuZGVyKClcbiAgICBpZiAodGhpcy5jaGF0R3JvdXAgPT09ICdib3RpaycpIHRoaXMuYm90aWsuYW5zd2VyKClcbiAgICB0aGlzLmF1ZGlvU2VydmljZS5wbGF5KCdzZW5kX21lc3NhZ2UnKVxuICB9XG5cbiAgX29uVG9nZ2xlICgpIHtcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC50b2dnbGUoJ2NvbHVtbi0yNScpXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QudG9nZ2xlKCdjb2x1bW4tMCcpXG4gIH1cblxuICBzdGFydFBvbGxpbmcgKCkge1xuICAgIHRoaXMuX19wb2xsaW5nSUQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmdldE1lc3NhZ2VMaXN0KClcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAvLyBUT0RPOiBpbXBsZW1lbnQgbWVzc2FnZUxpc3QgdXBkYXRlXG4gICAgICAgICAgLy8gdGhpcy5tZXNzYWdlTGlzdC5zZXRNZXNzYWdlcyhyZXMpXG4gICAgICAgICAgLy8gdGhpcy5tZXNzYWdlTGlzdC5yZW5kZXIoKVxuICAgICAgICB9KVxuICAgIH0sIDQwMDApXG4gIH1cblxuICBzdG9wUG9sbGluZyAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9fcG9sbGluZ0lEKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYXRcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvbWFpbi5qcyIsImltcG9ydCB7IGdldFJhbmRvbU51bWJlciB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnXG5cbmNsYXNzIENoYXRCb3Qge1xuICBjb25zdHJ1Y3RvciAoe1xuICAgIGF1ZGlvU2VydmljZSxcbiAgICBtZXNzYWdlTGlzdCxcbiAgICBib3Rpa1NlcnZpY2VcbiAgfSkge1xuICAgIHRoaXMuYW5zd2VycyA9IGJvdGlrU2VydmljZS5nZXRSYW5kb21NZXNzYWdlcygpXG4gICAgdGhpcy5tZXNzYWdlTGlzdCA9IG1lc3NhZ2VMaXN0XG4gICAgdGhpcy5hdWRpb1NlcnZpY2UgPSBhdWRpb1NlcnZpY2VcbiAgfVxuXG4gIGFuc3dlciAobWVzc2FnZSkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5tZXNzYWdlTGlzdC5hZGRNZXNzYWdlKHtcbiAgICAgICAgdGV4dDogbWVzc2FnZSB8fCB0aGlzLmFuc3dlcnNbZ2V0UmFuZG9tTnVtYmVyKHRoaXMuYW5zd2Vycy5sZW5ndGgpXSxcbiAgICAgICAgbmFtZTogJ2JvdGlrJ1xuICAgICAgfSlcbiAgICAgIHRoaXMubWVzc2FnZUxpc3QucmVuZGVyKClcbiAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnBsYXkoJ3JlY2VpdmVfbWVzc2FnZScpXG4gICAgfSwgMTUwMClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGF0Qm90XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L2NvbXBvbmVudHMvYm90aWsvY2hhdEJvdC5qcyIsImltcG9ydCBidXR0b25UZW1wbGF0ZSBmcm9tICcuL2NoYXQtYnV0dG9uLnB1ZydcblxuY2xhc3MgQ2hhdEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgZWwsXG4gICAgcGFyZW50RWwsXG4gICAgaXNPcGVuZWRPblN0YXJ0ID0gdHJ1ZSxcbiAgICBFdmVudE1peGluXG4gIH0pIHtcbiAgICAvLyBhZGRpbmcgb24oKSBhbmQgdHJpZ2dlcigpIG1ldGhvZHNcbiAgICBFdmVudE1peGluLmFwcGx5KHRoaXMpXG5cbiAgICB0aGlzLmVsID0gZWxcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3Nob3dfX2J1dHRvbicpXG4gICAgdGhpcy5wYXJlbnRFbCA9IHBhcmVudEVsXG4gICAgdGhpcy5pc09wZW5lZE9uU3RhcnQgPSBpc09wZW5lZE9uU3RhcnRcblxuICAgIHRoaXMucmVuZGVyKClcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUuYmluZCh0aGlzKSlcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgdGhpcy5lbC5pbm5lckhUTUwgPSBidXR0b25UZW1wbGF0ZSgpXG4gICAgdGhpcy5wYXJlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLmVsKVxuICAgIGlmICghdGhpcy5pc09wZW5lZE9uU3RhcnQpIHtcbiAgICAgIHRoaXMuX3RvZ2dsZSh0aGlzLmVsLmZpcnN0Q2hpbGQpXG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICB0aGlzLl90b2dnbGUoZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtYWN0aW9uXScpKVxuICAgIHRoaXMudHJpZ2dlcigndG9nZ2xlJylcbiAgfVxuXG4gIF90b2dnbGUgKGVsKSB7XG4gICAgZWwuZmlyc3RDaGlsZC5jbGFzc0xpc3QudG9nZ2xlKCdmYS1jaGV2cm9uLWxlZnQnKVxuICAgIGVsLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LnRvZ2dsZSgnZmEtY2hldnJvbi1yaWdodCcpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdEJ1dHRvblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9jb21wb25lbnRzL2NoYXQtYnV0dG9uL2NoYXRCdXR0b24uanMiLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZnVuY3Rpb24gRXZlbnRNaXhpbiAoKSB7XG4gIHRoaXMub24gPSBmdW5jdGlvbiAobmFtZSwgY2IpIHtcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgY2IpXG4gIH1cbiAgdGhpcy50cmlnZ2VyID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcbiAgICBsZXQgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSwgeyBkZXRhaWw6IGRhdGEgfSlcbiAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRNaXhpblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9jb21wb25lbnRzL2NvbW1vbi9jdXN0b21FdmVudHMuanMiLCJpbXBvcnQgbW9kYWxUbXBsIGZyb20gJy4vbW9kYWwucHVnJ1xuXG5jbGFzcyBMb2dpbkZvcm0ge1xuICBjb25zdHJ1Y3RvciAoe1xuICAgIGVsLFxuICAgIEV2ZW50TWl4aW5cbiAgfSkge1xuICAgIC8vIGFkZGluZyBvbigpIGFuZCB0cmlnZ2VyKCkgbWV0aG9kc1xuICAgIEV2ZW50TWl4aW4uYXBwbHkodGhpcylcblxuICAgIHRoaXMuZWwgPSBlbFxuXG4gICAgdGhpcy5yZW5kZXIoKVxuXG4gICAgdGhpcy50b2dnbGVNb2RhbCA9IHRoaXMudG9nZ2xlTW9kYWwuYmluZCh0aGlzKVxuXG4gICAgdGhpcy5faW5pdEV2ZW50cygpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gbW9kYWxUbXBsKClcblxuICAgIHRoaXMuY2hhdE1vZGFsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2NoYXQnKVxuICAgIHRoaXMuY2hhdE1vZGFsQ2xvc2UgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY2hhdC1jbG9zZScpXG4gICAgdGhpcy5jaGF0TW9kYWxTdWJtaXQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGF0LWxvZ2luJylcbiAgfVxuXG4gIHRvZ2dsZU1vZGFsIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICB0aGlzLmNoYXRNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdub3QtdmlzaWJsZScpXG4gIH1cblxuICBzdWJtaXRMb2dpbkZvcm0gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIHRoaXMudHJpZ2dlcignbG9naW4nLCB7IHVzZXJuYW1lOiBlLnRhcmdldC5uYW1lLnZhbHVlIH0pXG4gICAgdGhpcy50b2dnbGVNb2RhbChlKVxuICB9XG5cbiAgX2luaXRFdmVudHMgKCkge1xuICAgIHRoaXMuY2hhdE1vZGFsQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZU1vZGFsKVxuICAgIHRoaXMuY2hhdE1vZGFsU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0TG9naW5Gb3JtLmJpbmQodGhpcykpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9naW5Gb3JtXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jaGF0L2NvbXBvbmVudHMvbG9naW4tZm9ybS9sb2dpbkZvcm0uanMiLCJjbGFzcyBNZXNzYWdlRm9ybSB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgZWwsXG4gICAgRXZlbnRNaXhpblxuICB9KSB7XG4gICAgLy8gYWRkaW5nIG9uKCkgYW5kIHRyaWdnZXIoKSBtZXRob2RzXG4gICAgRXZlbnRNaXhpbi5hcHBseSh0aGlzKVxuXG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5tZXNzYWdlVGV4dGFyZWEgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlJylcbiAgICB0aGlzLl9pbml0RXZlbnRzKClcbiAgfVxuXG4gIHJlc2V0IChlKSB7XG4gICAgdGhpcy5lbC5yZXNldCgpXG4gIH1cblxuICBzdWJtaXRNZXNzYWdlRm9ybSAoZSkge1xuICAgIGlmIChlLmNoYXJDb2RlID09PSAxMyAmJiBlLnNoaWZ0S2V5ID09PSBmYWxzZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBpZiAoZS50YXJnZXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcignbWVzc2FnZScsIHsgdGV4dDogZS50YXJnZXQudmFsdWUgfSlcbiAgICAgICAgdGhpcy5yZXNldChlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9pbml0RXZlbnRzICgpIHtcbiAgICB0aGlzLm1lc3NhZ2VUZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuc3VibWl0TWVzc2FnZUZvcm0uYmluZCh0aGlzKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlRm9ybVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2hhdC9jb21wb25lbnRzL21lc3NhZ2UtZm9ybS9tZXNzYWdlRm9ybS5qcyIsImltcG9ydCBjaGF0bWxUbXBsIGZyb20gJy4vY2hhdC1tZXNzYWdlLWxpc3QucHVnJ1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnXG5cbmNsYXNzIE1lc3NhZ2VMaXN0IHtcbiAgY29uc3RydWN0b3IgKHtcbiAgICBlbCxcbiAgICB1c2VybmFtZSxcbiAgICBtZXNzYWdlcyxcbiAgICBtZXNzYWdlU2VydmljZVxuICB9KSB7XG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5tZXNzYWdlU2VydmljZSA9IG1lc3NhZ2VTZXJ2aWNlXG4gICAgdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2VzXG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gY2hhdG1sVG1wbCh7XG4gICAgICBtZXNzYWdlczogdGhpcy5tZXNzYWdlcyxcbiAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLFxuICAgICAgZm9ybWF0RGF0ZTogZm9ybWF0RGF0ZVxuICAgIH0pXG4gIH1cbiAgXG4gIHNldE1lc3NhZ2VzIChtZXNzYWdlcykge1xuICAgIHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlc1xuICB9XG5cbiAgYWRkTWVzc2FnZSAoZGF0YSkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB7IC8vIHVuc2hpZnQgaXMgbm8gZ29vZFxuICAgICAgdGV4dDogZGF0YS50ZXh0LFxuICAgICAgbmFtZTogZGF0YS5uYW1lIHx8IHRoaXMudXNlcm5hbWUsXG4gICAgICBkYXRlOiBEYXRlLm5vdygpXG4gICAgfVxuICAgIHRoaXMubWVzc2FnZXMudW5zaGlmdChtZXNzYWdlKVxuICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc2F2ZU1lc3NhZ2VzKHRoaXMubWVzc2FnZXMsIG1lc3NhZ2UpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZUxpc3RcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvY29tcG9uZW50cy9tZXNzYWdlLWxpc3QvbWVzc2FnZUxpc3QuanMiLCIvKiBnbG9iYWwgQXVkaW8gKi9cbmNsYXNzIEF1ZGlvU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnNvdW5kcyA9IHtcbiAgICAgICdyZWNlaXZlX21lc3NhZ2UnOiBuZXcgQXVkaW8oJy4vY2hhdC9hc3NldHMvc291bmRzL25vdGlmaWNhdGlvbi5tcDMnKSxcbiAgICAgICdzZW5kX21lc3NhZ2UnOiBuZXcgQXVkaW8oJy4vY2hhdC9hc3NldHMvc291bmRzL3NlbmRpbmcubXAzJylcbiAgICB9XG4gIH1cblxuICBwbGF5IChzb3VuZCkge1xuICAgIHRoaXMuc291bmRzW3NvdW5kXS5wbGF5KClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdWRpb1NlcnZpY2VcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvc2VydmljZXMvYXVkaW9TZXJ2aWNlLmpzIiwiY2xhc3MgQm90aWtTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubmFtZSA9ICdCb3Rpa1NlcnZpY2UnXG4gIH1cblxuICBnZXRSYW5kb21NZXNzYWdlcyAoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICfQoNCw0YHRgdC60LDQttC4INC80L3QtSDRh9GC0L4t0L3QuNCx0YPQtNGMJyxcbiAgICAgICfQnNC90LUg0YHQutGD0YfQvdC+JyxcbiAgICAgICfQniDRh9C10Lwg0YLRiyDQtNGD0LzQsNC10YjRjD8nLFxuICAgICAgJ9Cl0L7Rh9C10YjRjCDQv9C+0LPQvtCy0L7RgNC40YLRjCDQvtCxINGN0YLQvtC8PycsXG4gICAgICAn0JrQsNC6INGC0Ysg0L/RgNC+0LLQtdC7INGB0LLQvtC5INC00LXQvdGMPycsXG4gICAgICAn0KMg0YLQtdCx0Y8g0LXRgdGC0Ywg0L/Qu9Cw0L3RiyDQvdCwINC30LDQstGC0YDQsNGI0L3QuNC5INC00LXQvdGR0Lo/JyxcbiAgICAgICfQotC10LHQtSDQvdGA0LDQstC40YLRgdGPINC/0L7Qs9C+0LTQsCDQt9CwINC+0LrQvtGI0LrQvtC8PycsXG4gICAgICAn0JLQviDRgdC60L7Qu9GM0LrQviDRgtGLINC/0YDQvtGB0L3Rg9C70YHRjz8nLFxuICAgICAgJ9CvINGC0L7QttC1JyxcbiAgICAgICfQkNCz0LAnLFxuICAgICAgJ9CYINGC0LXQsdC1JyxcbiAgICAgICfQpdC80LwsINC40L3RgtC10YDQtdGB0L3QtdC90YzQutC+Li4uJ1xuICAgIF1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCb3Rpa1NlcnZpY2VcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvc2VydmljZXMvYm90aWtTZXJ2aWNlLmpzIiwiLyogZ2xvYmFsIGZldGNoICovXG5pbXBvcnQgeyBzdG9yZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JlU2VydmljZSdcblxuY2xhc3MgTWVzc2FnZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvciAoe1xuICAgIGJhc2VVcmwsXG4gICAgY2hhdEdyb3VwXG4gIH0pIHtcbiAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsXG4gICAgdGhpcy5jaGF0R3JvdXAgPSBjaGF0R3JvdXBcbiAgfVxuXG4gIF9yZXF1ZXN0ICgpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5iYXNlVXJsKSAvLyAnY2hhdC9zZXJ2aWNlcy9tb2NrTWVzc2FnZXMuanNvbidcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oKGpzb24pID0+IE9iamVjdC52YWx1ZXMoanNvbikucmV2ZXJzZSgpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICByZXR1cm4gc3RvcmVTZXJ2aWNlLmdldEpTT04oYGNoYXRIaXN0b3J5LSR7dGhpcy5jaGF0R3JvdXB9YClcbiAgICAgIH0pXG4gIH1cblxuICBnZXRNZXNzYWdlTGlzdCAoKSB7XG4gICAgaWYgKHRoaXMuY2hhdEdyb3VwICE9PSAnYm90aWsnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICByZXNvbHZlKHN0b3JlU2VydmljZS5nZXRKU09OKGBjaGF0SGlzdG9yeS0ke3RoaXMuY2hhdEdyb3VwfWApKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBzYXZlTWVzc2FnZXMgKG1lc3NhZ2VzLCBtZXNzYWdlKSB7XG4gICAgaWYgKHRoaXMuY2hhdEdyb3VwICE9PSAnYm90aWsnKSB7XG4gICAgICBmZXRjaCh0aGlzLmJhc2VVcmwsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpXG4gICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgfSlcbiAgICB9XG4gICAgc3RvcmVTZXJ2aWNlLnNldEpTT04oYGNoYXRIaXN0b3J5LSR7dGhpcy5jaGF0R3JvdXB9YCwgbWVzc2FnZXMpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZVNlcnZpY2VcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NoYXQvc2VydmljZXMvbWVzc2FnZVNlcnZpY2UuanMiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDtwdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDYnV0dG9uIGNsYXNzPVxcXCJidXR0b24gYnV0dG9uLWJsYWNrIGJ1dHRvbl9fc2hvdy1jaGF0XFxcIiBkYXRhLWFjdGlvbj1cXFwidG9nZ2xlXFxcIlxcdTAwM0VcXHUwMDNDaSBjbGFzcz1cXFwiZmEgZmEtY2hldnJvbi1yaWdodFxcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZpXFx1MDAzRVxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVwiOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jaGF0L2NvbXBvbmVudHMvY2hhdC1idXR0b24vY2hhdC1idXR0b24ucHVnXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDtwdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZGl2IGNsYXNzPVxcXCJtb2RhbCBtb2RhbF9fY2hhdCBub3QtdmlzaWJsZVxcXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwibW9kYWxfX2JvZHlcXFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcIm1vZGFsX19jb250ZW50XFxcIlxcdTAwM0VcXHUwMDNDZm9ybSBjbGFzcz1cXFwiY2hhdC1sb2dpblxcXCIgbmFtZT1cXFwiY2hhdC1sb2dpblxcXCJcXHUwMDNFXFx1MDAzQ2ZpZWxkc2V0XFx1MDAzRVxcdTAwM0NsYWJlbCBmb3I9XFxcIm5hbWVcXFwiXFx1MDAzRUVudGVyIHlvIG5hbWVcXHUwMDNDXFx1MDAyRmxhYmVsXFx1MDAzRVxcdTAwM0NpbnB1dCBpZD1cXFwibmFtZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIm5hbWVcXFwiIHJlcXVpcmVkIGF1dG9mb2N1c1xcdTAwM0VcXHUwMDNDXFx1MDAyRmZpZWxkc2V0XFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcImJ1dHRvbi1wcmltYXJ5IG0tbC0xIGZsb2F0LXJpZ2h0XFxcIiB0eXBlPVxcXCJzdWJtaXRcXFwiXFx1MDAzRUVudGVyIGNoYXRcXHUwMDNDXFx1MDAyRmJ1dHRvblxcdTAwM0VcXHUwMDNDYnV0dG9uIGNsYXNzPVxcXCJidXR0b24tb3V0bGluZSBmbG9hdC1yaWdodCBtb2RhbF9fY2hhdC1jbG9zZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIlxcdTAwM0VDbG9zZVxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0NcXHUwMDJGZm9ybVxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcIjs7cmV0dXJuIHB1Z19odG1sO307XG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2hhdC9jb21wb25lbnRzL2xvZ2luLWZvcm0vbW9kYWwucHVnXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDs7dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAodXNlcm5hbWUpIHtwdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZGl2IGNsYXNzPVxcXCJjb2x1bW4tY2VudGVyIGNoYXRfX2FwcFxcXCJcXHUwMDNFXFx1MDAzQ2RpdlwiICsgKHB1Zy5hdHRyKFwiY2xhc3NcIiwgcHVnLmNsYXNzZXMoW1wibG9naW4tZmFsc2VcIix1c2VybmFtZSA/ICdoaWRkZW4nIDogJyddLCBbZmFsc2UsdHJ1ZV0pLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXFx1MDAzQ2J1dHRvbiBjbGFzcz1cXFwiYnV0dG9uLXByaW1hcnkgY2hhdF9fbG9naW4tYnV0dG9uXFxcIlxcdTAwM0VKb2luIGNoYXRcXHUwMDNDXFx1MDAyRmJ1dHRvblxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2XCIgKyAocHVnLmF0dHIoXCJjbGFzc1wiLCBwdWcuY2xhc3NlcyhbXCJsb2dpbi10cnVlXCIsIXVzZXJuYW1lID8gJ2hpZGRlbicgOiAnJ10sIFtmYWxzZSx0cnVlXSksIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJjaGF0X19oZWFkZXJcXFwiXFx1MDAzRVxcdTAwM0NpIGNsYXNzPVxcXCJmYSBmYS11c2VyLWNpcmNsZS1vIGhlYWRlcl9fYXZhdGFyXFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRmlcXHUwMDNFXFx1MDAzQ3AgY2xhc3M9XFxcImhlYWRlcl9fbmFtZVxcXCJcXHUwMDNFQ2hhdCB3aXRoJm5ic3A7XFx1MDAzQ2EgaHJlZj1cXFwiI1xcXCIgZGF0YS1hY3Rpb249XFxcImJvdGlrXFxcIlxcdTAwM0VCb3Rpa1xcdTAwM0NcXHUwMDJGYVxcdTAwM0UmbmJzcDsgfCAmbmJzcDtcXHUwMDNDYSBocmVmPVxcXCIjXFxcIiBkYXRhLWFjdGlvbj1cXFwiZ3JvdXBcXFwiXFx1MDAzRUdyb3VwXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVxcdTAwM0NcXHUwMDJGcFxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJjaGF0X19ib2R5XFxcIlxcdTAwM0VcIiArIChudWxsID09IChwdWdfaW50ZXJwID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9tZXNzYWdlLWxpc3QvY2hhdC1tZXNzYWdlLWxpc3QucHVnXCIpLmNhbGwodGhpcywgbG9jYWxzKSkgPyBcIlwiIDogcHVnX2ludGVycCkgKyBcIlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImNoYXRfX2Zvb3RlclxcXCJcXHUwMDNFXFx1MDAzQ2Zvcm0gY2xhc3M9XFxcImNoYXRfX2Zvcm1cXFwiIG5hbWU9XFxcImNoYXRfX2Zvcm1cXFwiXFx1MDAzRVxcdTAwM0N0ZXh0YXJlYSBpZD1cXFwibWVzc2FnZVxcXCIgcGxhY2Vob2xkZXI9XFxcIkVudGVyIG1lc3NhZ2UuLi5cXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGdGV4dGFyZWFcXHUwMDNFXFx1MDAzQ1xcdTAwMkZmb3JtXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiO30uY2FsbCh0aGlzLFwidXNlcm5hbWVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVzZXJuYW1lOnR5cGVvZiB1c2VybmFtZSE9PVwidW5kZWZpbmVkXCI/dXNlcm5hbWU6dW5kZWZpbmVkKSk7O3JldHVybiBwdWdfaHRtbDt9O1xubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NoYXQvbWFpbi5wdWdcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGZzIChpZ25vcmVkKVxuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IENoYXQgZnJvbSAnLi9jaGF0L21haW4nXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldyAqL1xubmV3IENoYXQoe1xuICBlbDogJy5jaGF0JyxcbiAgYnV0dG9uRWw6ICcud2Vic2l0ZScsIC8vIGVsZW1lbnQgdG8gYXBwZW5kIGNoYXQgdG9vZ2xlIGJ1dHRvbi4gTXVzdCBiZSByZWxhdGl2ZS5cbiAgaXNPcGVuZWRPblN0YXJ0OiB0cnVlIC8vIGRlZmF1bHQgdmFsdWU6IHRydWVcbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9
