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

    this._initServices()
    this.userName = storeService.getItem('chatWidgetName')
    this.chatGroup = storeService.getItem('chatWidgetGroup') || 'botik'

    this._init()
  }

  render () {
    this.el.innerHTML = chatTmpl({
      messages: this.messages,
      username: this.userName
    })

    if (!this.isOpenedOnStart) {
      this._onToggle()
    }

    [...this.el.querySelectorAll('.header__name a')].forEach((el) => {
      if (el.dataset.action === this.chatGroup) el.classList.add('active')
    })
  }

  _init () {
    this.messageService.getMessageList()
      .then((res) => {
        this.messages = res
        // console.log(res)
        this.render()
        this._initComponents()
        if (!this.userName) {
          this.el.appendChild(this.loginForm.el)
        }

        this._initEvents()
      })
  }

  _initServices () {
    this.messageService = new MessageService({
      baseUrl: 'https://components-1601-1930.firebaseio.com/chat/messages.json',
      chatGroup: this.chatGroup
    })
    this.audioService = new AudioService()
    this.botikService = new BotikService()
  }

  _initComponents () {
    this.chatButton = new ChatButton({
      el: document.createElement('div'),
      parentEl: this.buttonEl,
      isOpenedOnStart: this.isOpenedOnStart,
      EventMixin
    })

    // maybe we should not create instance if already logged in
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
      messages: this.messages,
      messageService: this.messageService
    })

    this.botik = new Botik({
      audioService: this.audioService,
      messageList: this.messageList,
      botikService: this.botikService
    })
  }

  _initEvents () {
    if (!this.userName) {
      this.el.querySelector('.chat__login-button').addEventListener('click', this.loginForm.toggleModal)
    }

    this.el.querySelector('.header__name').addEventListener('click', this._changeGroup.bind(this))

    this.loginForm.on('login', this._onLogin.bind(this))

    this.messageForm.on('message', this._onMessage.bind(this))

    this.chatButton.on('toggle', this._onToggle.bind(this))
  }

  _changeGroup (e) {
    e.preventDefault()
    const el = e.target.closest('[data-action]')
    if (!el.classList.contains('active')) {
      [...el.parentNode.children].forEach((child) => {
        child.classList.toggle('active')
      })
      storeService.setItem('chatWidgetGroup', el.dataset.action)
      this.chatGroup = el.dataset.action
      this._init()
    }
  }

  _onLogin (e) {
    this.userName = e.detail.username
    storeService.setItem('chatWidgetName', this.userName)

    this.el.querySelector('.login-false').classList.toggle('hidden')
    this.el.querySelector('.login-true').classList.toggle('hidden')

    if (!this.messages.length && this.userName) {
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
