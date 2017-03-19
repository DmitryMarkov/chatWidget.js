import chatTmpl from './main.pug'
import ChatButton from './components/chat-button/chatButton'
import LoginForm from './components/login-form/loginForm'
import MessageList from './components/message-list/messageList'
import MessageForm from './components/message-form/messageForm'
import MessageService from './services/messageService'
import AudioService from './services/audioService'
import BotikService from './services/botikService'
import Botik from './components/botik/chatBot'
import { storeService } from './services/storeService'
import EventMixin from './components/common/customEvents'

class Chat {
  constructor ({
    el,
    buttonEl,
    isOpenedOnStart
  }) {
    this.el = document.querySelector(el)
    this.buttonEl = document.querySelector(buttonEl)
    this.isOpenedOnStart = isOpenedOnStart

    // TODO get from service
    this.userName = storeService.getItem('chatWidgetName')
    this.messages = storeService.getJSON('chatHistory')

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
    if (!this.isOpenedOnStart) {
      this._onToggle()
    }
  }

  _initComponents () {
    this.messageService = new MessageService({})
    this.audioService = new AudioService()
    this.botikService = new BotikService()

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
      el: this.el.querySelector('.chat__body'),
      messageService: this.messageService
    })

    this.botik = new Botik({
      audioService: this.audioService,
      messageList: this.messageList,
      botikService: this.botikService
    })
  }

  _initEvents () {
    // do we need to add listeners to hidden elements? maybe on state change?
    this.el.querySelector('.chat__login-button').addEventListener('click', this.loginForm.toggleModal)
    this.loginForm.on('login', this._onLogin.bind(this))

    this.messageForm.on('message', this._onMessage.bind(this))

    this.chatButton.on('toggle', this._onToggle.bind(this))
  }

  _onLogin (e) {
    this.userName = e.detail.username
    storeService.setItem('chatWidgetName', this.userName)

    this.el.querySelector('.login-false').classList.toggle('hidden')
    this.el.querySelector('.login-true').classList.toggle('hidden')

    if (!this.messageList.getMessageList().length && this.userName) {
      this.botik.answer(`Привет, ${this.userName}!`)
    }
  }

  _onMessage (e) {
    this.messageList.addMessage({
      text: e.detail.text,
      my: true
    })
    this.messageList.render()
    this.botik.answer()
    this.audioService.play('send_message')
  }

  _onToggle () {
    this.el.classList.toggle('column-25')
    this.el.classList.toggle('column-0')
  }
}

export default Chat
