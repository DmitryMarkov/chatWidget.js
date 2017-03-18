/* global Audio */
class AudioService {
  constructor () {
    this.sounds = {
      'receive_message': new Audio('./chat/assets/sounds/notification.mp3'),
      'send_message': new Audio('./chat/assets/sounds/sending.mp3')
    }
  }

  play (sound) {
    this.sounds[sound].play()
  }
}

export default AudioService
