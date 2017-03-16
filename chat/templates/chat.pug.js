function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)s=pug_classes(r[g]),s&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function chat_tmpl(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"chat\u002Ftemplates\u002Fchat.pug":"div.column-center.chat__app\n  div.login-false(class=username ? 'hidden' : '')\n    button.button-primary.chat__login-button Join chat\n  div.login-true(class=!username ? 'hidden' : '')\n    div.chat__header\n      i.fa.fa-user-circle-o.header__avatar\n      p.header__name Chat with Botik\n    div.chat__body\n      include chat-message-list.pug\n    div.chat__footer\n      form.chat__form(name='chat__form')\n        textarea#message(placeholder='Enter message...')\n","chat\u002Ftemplates\u002Fchat-message-list.pug":"each message in messages\n  div.chat__message(class=message.my ? 'chat__message-my' : '')\n    div=message.text\n    div.message__time.float-right=message.date"};
;var locals_for_with = (locals || {});(function (messages, username) {;pug_debug_line = 1;pug_debug_filename = "chat\u002Ftemplates\u002Fchat.pug";
pug_html = pug_html + "\u003Cdiv class=\"column-center chat__app\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "chat\u002Ftemplates\u002Fchat.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["login-false",username ? 'hidden' : ''], [false,true]), false, false)) + "\u003E";
;pug_debug_line = 3;pug_debug_filename = "chat\u002Ftemplates\u002Fchat.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-primary chat__login-button\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "chat\u002Ftemplates\u002Fchat.pug";
pug_html = pug_html + "Join chat\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "chat\u002Ftemplates\u002Fchat.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["login-true",!username ? 'hidden' : ''], [false,true]), false, false)) + "\u003E";
;pug_debug_line = 5;pug_debug_filename = "chat\u002Ftemplates\u002Fchat.pug";
pug_html = pug_html + "\u003Cdiv class=\"chat__header\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "chat\u002Ftemplates\u002Fchat.pug";
pug_html = pug_html + "\u003Ci class=\"fa fa-user-circle-o header__avatar\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 7;pug_debug_filename = "chat\u002Ftemplates\u002Fchat.pug";
pug_html = pug_html + "\u003Cp class=\"header__name\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "chat\u002Ftemplates\u002Fchat.pug";
pug_html = pug_html + "Chat with Botik\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "chat\u002Ftemplates\u002Fchat.pug";
pug_html = pug_html + "\u003Cdiv class=\"chat__body\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "chat\u002Ftemplates\u002Fchat-message-list.pug";
// iterate messages
;(function(){
  var $$obj = messages;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var message = $$obj[pug_index0];
;pug_debug_line = 2;pug_debug_filename = "chat\u002Ftemplates\u002Fchat-message-list.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["chat__message",message.my ? 'chat__message-my' : ''], [false,true]), false, false)) + "\u003E";
;pug_debug_line = 3;pug_debug_filename = "chat\u002Ftemplates\u002Fchat-message-list.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 3;pug_debug_filename = "chat\u002Ftemplates\u002Fchat-message-list.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = message.text) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "chat\u002Ftemplates\u002Fchat-message-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"message__time float-right\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "chat\u002Ftemplates\u002Fchat-message-list.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = message.date) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var message = $$obj[pug_index0];
;pug_debug_line = 2;pug_debug_filename = "chat\u002Ftemplates\u002Fchat-message-list.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["chat__message",message.my ? 'chat__message-my' : ''], [false,true]), false, false)) + "\u003E";
;pug_debug_line = 3;pug_debug_filename = "chat\u002Ftemplates\u002Fchat-message-list.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 3;pug_debug_filename = "chat\u002Ftemplates\u002Fchat-message-list.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = message.text) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "chat\u002Ftemplates\u002Fchat-message-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"message__time float-right\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "chat\u002Ftemplates\u002Fchat-message-list.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = message.date) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 10;pug_debug_filename = "chat\u002Ftemplates\u002Fchat.pug";
pug_html = pug_html + "\u003Cdiv class=\"chat__footer\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "chat\u002Ftemplates\u002Fchat.pug";
pug_html = pug_html + "\u003Cform class=\"chat__form\" name=\"chat__form\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "chat\u002Ftemplates\u002Fchat.pug";
pug_html = pug_html + "\u003Ctextarea id=\"message\" placeholder=\"Enter message...\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"messages" in locals_for_with?locals_for_with.messages:typeof messages!=="undefined"?messages:undefined,"username" in locals_for_with?locals_for_with.username:typeof username!=="undefined"?username:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}
