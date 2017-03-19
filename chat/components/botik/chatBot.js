import { getRandomNumber } from '../../utils/util'

class ChatBot {
  constructor ({
    audioService,
    messageList,
    botikService
  }) {
    this.answers = botikService.getRandomMessages()
    this.messageList = messageList
    this.audioService = audioService
  }

  answer (message) {
    setTimeout(() => {
      this.messageList.addMessage({
        text: message || this.answers[getRandomNumber(this.answers.length)],
        my: false
      })
      this.messageList.render()
      this.audioService.play('receive_message')
    }, 1500)
  }
}

export default ChatBot
