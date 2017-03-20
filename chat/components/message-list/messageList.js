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

//  getMessageList () {
//    return this.messages
//  }

  addMessage (data) {
    this.messages.unshift({ // unshift is no good
      text: data.text,
      name: data.name || this.username,
      date: Date.now()
    })
    this.messageService.saveMessages(this.messages)
  }
}

export default MessageList
