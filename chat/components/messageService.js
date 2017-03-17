;(function () {
  'use strict'

  class MessageService {
    constructor (options) {
      this.messages = JSON.parse(window.sessionStorage.getItem('chatHistory') || '[]')
    }

    getMessageList () {
      return this.messages
    }

    addMessage (data) {
      this.messages.unshift({ // unshift is no good
        text: data.text,
        my: data.my || false,
        date: new Date().getHours() + ':' + new Date().getMinutes()
      })
      window.sessionStorage.setItem('chatHistory', JSON.stringify(this.messages))
    }
  }

  window.MessageService = MessageService
})()
