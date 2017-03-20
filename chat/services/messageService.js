/* global fetch */
import { storeService } from './storeService'

class MessageService {
  constructor ({
    baseUrl
  }) {
    this.baseUrl = baseUrl
  }

  _request () {
    return fetch(this.baseUrl) // 'chat/services/mockMessages.json'
      .then((response) => response.json())
      .then((json) => Object.values(json).reverse())
      .catch((err) => {
        console.log(err)
        return storeService.getJSON('chatHistory')
      })
  }

  getMessageList () {
    return this._request()
  }

  saveMessages (messages) {
    storeService.setJSON('chatHistory', messages)
  }
}

export default MessageService
