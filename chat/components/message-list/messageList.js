import chatmlTmpl from './chat-message-list.pug'

class MessageList {
  constructor ({
    el,
    messages,
    messageService
  }) {
    this.el = el
    this.messageService = messageService
    this.messages = messages
  }

  render () {
    this.el.innerHTML = chatmlTmpl({
      messages: this.messages
    })
  }

//  getMessageList () {
//    return this.messages
//  }

  addMessage (data) {
    this.messages.unshift({ // unshift is no good
      text: data.text,
      my: data.my || false,
      date: new Date().getHours() + ':' + new Date().getMinutes()
    })
    this.messageService.saveMessages(this.messages)
  }
}

export default MessageList
