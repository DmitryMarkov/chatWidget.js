import { getRandomNumber } from '../../utils/util'

class ChatBot {
  constructor () {
    this.answers = [
      'Расскажи мне что-нибудь',
      'Мне скучно',
      'О чем ты думаешь?',
      'Хочешь поговорить об этом?',
      'Как ты провел свой день?',
      'У тебя есть планы на завтрашний денёк?',
      'Тебе нравится погода за окошком?',
      'Во сколько ты проснулся?',
      'Я тоже',
      'Ага',
      'И тебе',
      'Хмм, интересненько...'
    ]
  }

  getRandomAnswersList () {
    return this.answers
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
