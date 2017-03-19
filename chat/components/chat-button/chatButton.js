import buttonTemplate from './chat-button.pug'

class ChatButton {
  constructor ({
    el,
    parentEl,
    isOpenedOnStart = true,
    EventMixin
  }) {
    // adding on() and trigger() methods
    EventMixin.apply(this)

    this.el = el
    this.el.classList.add('show__button')
    this.parentEl = parentEl
    this.isOpenedOnStart = isOpenedOnStart

    this.render()
    this.el.addEventListener('click', this.toggle.bind(this))
  }

  render () {
    this.el.innerHTML = buttonTemplate()
    this.parentEl.appendChild(this.el)
  }

  toggle (e) {
    e.preventDefault()

    let el = e.target.closest('[data-action]')
    el.firstChild.classList.toggle('fa-chevron-left')
    el.firstChild.classList.toggle('fa-chevron-right')
    this.trigger('toggle')
  }
}

export default ChatButton
