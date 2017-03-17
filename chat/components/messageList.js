import chatmlTmpl from '../templates/chat-message-list.pug'

class MessageList {
  constructor (options) {
    this.el = options.el
    this.messages = JSON.parse(window.sessionStorage.getItem('chatHistory') || '[]')
  }

  render () {
    this.el.innerHTML = chatmlTmpl({
      messages: this.messages
    })
  }

  /* to service */
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

export default MessageList
