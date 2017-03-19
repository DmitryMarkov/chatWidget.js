import { storeService } from './storeService'

class MessageService {
  constructor (options) {
    this.messages = storeService.getJSON('chatHistory')
  }

  getMessageList () {
//    if (!this.messages.length) {
//      this.messages = [
//        {
//          "text": "Привет, как дела?",
//          "my": false,
//          "date": "12:59"
//        },
//        {
//          "text": "Нормально",
//          "my": true,
//          "date": "13:01"
//        }
//      ]
//    }
    return this.messages
  }

  saveMessages (messages) {
    this.messages = messages
    storeService.setJSON('chatHistory', messages)
  }
}

export default MessageService
