import chatTmpl from './main.pug'
import ChatButton from './components/chat-button/chatButton'
import LoginForm from './components/login-form/loginForm'
import MessageList from './components/message-list/messageList'
import MessageForm from './components/message-form/messageForm'
import MessageService from './services/messageService'
import AudioService from './services/audioService'
import Botik from './components/botik/chatBot'
import { getRandomNumber } from './utils/util'
import EventMixin from './components/common/customEvents'

const botikAnswers = new Botik().getRandomAnswersList()

class Chat {
  constructor ({
    el,
    buttonEl,
    isOpenedOnStart
  }) {
    this.el = document.querySelector(el)
    this.buttonEl = document.querySelector(buttonEl)
    this.isOpenedOnStart = isOpenedOnStart

    this.userName = window.sessionStorage.getItem('chatWidgetName') || null
    this.messages = JSON.parse(window.sessionStorage.getItem('chatHistory') || '[]')

    this.render()
    this._initComponents()
    this.el.appendChild(this.loginForm.el)

    this._initEvents()
  }

  render () {
    this.el.innerHTML = chatTmpl({
      messages: this.messages,
      username: this.userName
    })
  }

  _initComponents () {
    this.chatButton = new ChatButton({
      el: document.createElement('div'),
      parentEl: this.buttonEl,
      isOpenedOnStart: this.isOpenedOnStart,
      EventMixin
    })
    this.loginForm = new LoginForm({
      el: document.createElement('div'),
      EventMixin
    })
    this.messageForm = new MessageForm({
      el: this.el.querySelector('.chat__form'),
      EventMixin
    })
    this.messageList = new MessageList({
      el: this.el.querySelector('.chat__body')
    })
    this.messageService = new MessageService({})

    this.audioService = new AudioService()
  }

  // move to ChatBot class
  _botikAnswer (message) {
    setTimeout(() => {
      this.messageList.addMessage({
        text: message || botikAnswers[getRandomNumber(botikAnswers.length)],
        my: false
      })
      this.messageList.render()
      this.audioService.play('receive_message')
    }, 1500)
  }

  _onLogin (e) {
    this.userName = e.detail.username
    window.sessionStorage.setItem('chatWidgetName', this.userName)

    this.el.querySelector('.login-false').classList.toggle('hidden')
    this.el.querySelector('.login-true').classList.toggle('hidden')

    if (!this.messageList.getMessageList().length && this.userName) {
      this._botikAnswer(`Привет, ${this.userName}!`)
    }
  }

  _onMessage (e) {
    this.messageList.addMessage({
      text: e.detail.text,
      my: true
    })
    this.messageList.render()
    this._botikAnswer()
    this.audioService.play('send_message')
  }

  _initEvents () {
    // this.chatShowHideButton = document.querySelector('.button__show-chat')
    // toggleChat
    // this.chatShowHideButton.addEventListener('click', this._showHideChat.bind(this))

    this.el.querySelector('.chat__login-button').addEventListener('click', this.loginForm.toggleModal)

    this.loginForm.on('login', this._onLogin.bind(this))

    this.messageForm.on('message', this._onMessage.bind(this))
  }
}

export default Chat
