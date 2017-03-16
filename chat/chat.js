// jshint asi: true
;(function () {
  'use strict'

  const chat_tmpl = window.chat_tmpl
  const botik_answers = [
    'Расскажи мне что-нибудь',
    'Мне скучно',
    'О чем ты думаешь?',
    'Хочешь поговорить об этом?',
    'Как ты провел свой день?',
    'У тебя есть планы на завтрашний денёк?',
    'Тебе нравится погода за окошком?',
    'Во сколько ты проснулся?',
    'Я тоже',
    'Ага',
    'И тебе',
    'Хмм, интересненько...'
  ]

  const LoginForm = window.LoginForm
  const MessageList = window.MessageList
  const MessageForm = window.MessageForm

  class Chat {
    constructor (options) {
      this.el = options.el

      this.userName = window.sessionStorage.getItem('chatWidgetName') || null
      this.messages = JSON.parse(window.sessionStorage.getItem('chatHistory') || '[]')
      this.notification = new Audio('./chat/notification.mp3')
      this.sending = new Audio('./chat/sending.mp3')


      this.render()
      this._initComponents()
      this.el.appendChild(this.loginForm.el)

      this._initEvents()
    }

    render () {
      this.el.innerHTML = chat_tmpl({
        messages: this.messages,
        username: this.userName
      })
    }

    _initComponents () {
      this.loginForm = new LoginForm({
        el: document.createElement('div')
      })
      this.messageForm = new MessageForm({
        el: this.el.querySelector('.chat__form')
      })
      this.messageList = new MessageList({
        el: this.el.querySelector('.chat__body')
      })

    }

    _botikAnswer (message) {
      setTimeout(() => {
        this.messageList.addMessage({
          text: message ? message : botik_answers[Math.round(Math.random() * (botik_answers.length - 1))],
          my: false
        })
        this.messageList.render()
        this.notification.play()
      }, 1500)
    }

    _showHideChat (e) {
      e.preventDefault()

      /* Can we do better? */
      let applyEl = e.target
      if (e.target.tagName !== 'BUTTON') applyEl = e.target.parentNode
      applyEl.innerHTML = applyEl.innerHTML === '<i class="fa fa-chevron-left"></i>' ? '<i class="fa fa-chevron-right"></i>' : '<i class="fa fa-chevron-left"></i>'

      this.el.classList.toggle('column-25')
      this.el.classList.toggle('column-0')

    }

    _initEvents () {
      this.chatShowHideButton = document.querySelector('.button__show-chat')
      this.chatLoginButton = this.el.querySelector('.chat__login-button')

      this.chatShowHideButton.addEventListener('click', this._showHideChat.bind(this))

      this.chatLoginButton.addEventListener('click', this.loginForm.toggleModal)

      this.loginForm.on('login', (e) => {
        this.userName = e.detail.username
        window.sessionStorage.setItem('chatWidgetName', this.userName)

        this.el.querySelector('.login-false').classList.toggle('hidden')
        this.el.querySelector('.login-true').classList.toggle('hidden')

        if (!this.messageList.getMessageList().length && this.userName) {
          this._botikAnswer(`Привет, ${this.userName}!`)
        }
      })

      this.messageForm.on('message', (e) => {
        this.messageList.addMessage({
          text: e.detail.text,
          my: true
        })
        this.messageList.render()
        this._botikAnswer()
        this.sending.play()
      })
    }
  }

  window.Chat = Chat

})()
