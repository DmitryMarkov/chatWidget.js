import chatmlTmpl from './chat-message-list.pug'

class MessageList {
  constructor ({
    el,
    messageService
  }) {
    this.el = el
    this.messageService = messageService
    this.messages = this.messageService.getMessageList()
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
    this.messageService.saveMessages(this.messages)
    // window.sessionStorage.setItem('chatHistory', JSON.stringify(this.messages))
  }
}

export default MessageList
