import chatTmpl from './main.pug'

import MessageService from './services/messageService'
import AudioService from './services/audioService'
import BotikService from './services/botikService'

import ChatButton from './components/chat-button/chatButton'
import LoginForm from './components/login-form/loginForm'
import MessageList from './components/message-list/messageList'
import MessageForm from './components/message-form/messageForm'
import Botik from './components/botik/chatBot'

import { storeService } from './services/storeService'
import { formatDate, deepEqual } from './utils/util'
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

    this._initToggleButton()
    this._init()
  }

  render () {
    this.el.innerHTML = chatTmpl({
      messages: this.messages,
      username: this.userName,
      formatDate: formatDate
    })

    if (!this.isOpenedOnStart) {
      this._onToggle()
    }

    [...this.el.querySelectorAll('.header__name a')].forEach((el) => {
      if (el.dataset.action === this.chatGroup) el.classList.add('active')
    })
  }

  _init () {
    this.userName = storeService.getItem('chatWidgetName')
    this.chatGroup = storeService.getItem('chatWidgetGroup') || 'botik'

    this._initServices()

    this.messageService.getMessageList()
      .then((res) => {
        this.messages = res
        this.render()
        if (!this.userName) {
          this._initLoginComponent()
        } else {
          this._initComponents()
          this._initEvents()
        }
        if (this.chatGroup !== 'botik') {
          this.startPolling()
        }
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

  _initToggleButton () {
    this.chatButton = new ChatButton({
      el: document.createElement('div'),
      parentEl: this.buttonEl,
      isOpenedOnStart: this.isOpenedOnStart,
      EventMixin
    })

    this.chatButton.on('toggle', this._onToggle.bind(this))
  }

  _initLoginComponent () {
    this.loginForm = new LoginForm({
      el: document.createElement('div'),
      EventMixin
    })

    this.el.appendChild(this.loginForm.el)

    this.el.querySelector('.chat__login-button').addEventListener('click', this.loginForm.toggleModal)

    this.loginForm.on('login', this._onLogin.bind(this))
  }

  _initComponents () {
    this.messageForm = new MessageForm({
      el: this.el.querySelector('.chat__form'),
      EventMixin
    })

    this.messageList = new MessageList({
      el: this.el.querySelector('.chat__body'),
      username: this.userName,
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
    this.el.querySelector('.header__name').addEventListener('click', this._changeGroup.bind(this))

    this.messageForm.on('message', this._onMessage.bind(this))
  }

  _changeGroup (e) {
    e.preventDefault()
    const el = e.target.closest('[data-action]')
    if (el !== null && !el.classList.contains('active')) {
      [...el.parentNode.children].forEach((child) => {
        child.classList.toggle('active')
      })
      storeService.setItem('chatWidgetGroup', el.dataset.action)
      this.chatGroup = el.dataset.action
      if (this.chatGroup === 'botik') {
        this.stopPolling()
      }
      this._init()
    }
  }

  _onLogin (e) {
    this.userName = e.detail.username
    storeService.setItem('chatWidgetName', this.userName)

    this.el.querySelector('.login-false').classList.toggle('hidden')
    this.el.querySelector('.login-true').classList.toggle('hidden')

    this._initComponents()
    this._initEvents()

    if (!this.messages.length && this.userName) {
      this.botik.answer(`Привет, ${this.userName}!`)
    }
  }

  _onMessage (e) {
    this.messageList.addMessage({
      text: e.detail.text,
      name: this.userName
    })
    this.messageList.render()
    if (this.chatGroup === 'botik') this.botik.answer()
    this.audioService.play('send_message')
  }

  _onToggle () {
    this.el.classList.toggle('column-25')
    this.el.classList.toggle('column-0')
  }

  startPolling () {
    this.__pollingID = setInterval(() => {
      console.log('polling...')
      this.messageService.getMessageList()
        .then((res) => {
          if (!deepEqual(this.messageList.getLocalMessages(), res)) {
            console.log('ch-ch-changes!')
            this.messageList.setMessages(res)
            this.messageList.render()
            if (this.messageList.getLocalMessages()[0].name !== this.userName) {
              this.audioService.play('receive_message')
            }
          }
        })
    }, 4000)
  }

  stopPolling () {
    clearInterval(this.__pollingID)
  }
}

export default Chat
