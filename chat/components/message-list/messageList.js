import chatmlTmpl from './chat-message-list.pug'
import { formatDate } from '../../utils/util'

class MessageList {
  constructor ({
    el,
    username,
    messages,
    messageService
  }) {
    this.el = el
    this.messageService = messageService
    this.messages = messages
    this.username = username
  }

  render () {
    this.el.innerHTML = chatmlTmpl({
      messages: this.messages,
      username: this.username,
      formatDate: formatDate
    })
  }

  setMessages (messages) {
    this.messages = messages
  }

  addMessage (data) {
    const message = { // unshift is no good
      text: data.text,
      name: data.name || this.username,
      date: Date.now()
    }
    this.messages.unshift(message)
    this.messageService.saveMessages(this.messages, message)
  }
}

export default MessageList
