/* global fetch */
import { storeService } from './storeService'

class MessageService {
  constructor ({
    baseUrl
  }) {
    this.baseUrl = baseUrl
  }

  _request () {
    return fetch('chat/services/mockMessages.json')
      .then((response) => response.json())
      .catch((err) => {
        console.log(err)
      })
  }

  getMessageList () {
    return this._request()
  }

  saveMessages (messages) {
    // this.messages = messages
    storeService.setJSON('chatHistory', messages)
  }
}

export default MessageService
