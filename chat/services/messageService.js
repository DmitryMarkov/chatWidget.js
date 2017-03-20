/* global fetch */
import { storeService } from './storeService'

class MessageService {
  constructor ({
    baseUrl,
    chatGroup
  }) {
    this.baseUrl = baseUrl
    this.chatGroup = chatGroup
  }

  _request () {
    return fetch(this.baseUrl) // 'chat/services/mockMessages.json'
      .then((response) => response.json())
      .then((json) => Object.values(json).reverse())
      .catch((err) => {
        console.log(err)
        return storeService.getJSON(`chatHistory-${this.chatGroup}`)
      })
  }

  getMessageList () {
    if (this.chatGroup !== 'botik') {
      return this._request()
    } else {
      return new Promise((resolve) => {
        resolve(storeService.getJSON(`chatHistory-${this.chatGroup}`))
      })
    }
  }

  saveMessages (messages) {
    storeService.setJSON(`chatHistory-${this.chatGroup}`, messages)
  }
}

export default MessageService
