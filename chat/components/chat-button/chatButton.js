import buttonTemplate from './chat-button.pug'

class ChatButton {
  constructor ({
    el,
    parentEl,
    isOpenedOnStart = true,
    EventMixin
  }) {
    this.el = el
    this.parentEl = parentEl
    this.isOpenedOnStart = isOpenedOnStart
    this.el.classList.add('show__button')

    this.render()
    this.el.addEventListener('click', this.toggle.bind(this))
  }

  render () {
    this.el.innerHTML = buttonTemplate()
    this.parentEl.appendChild(this.el)
  }

  toggle (e) {
    console.log(this)
  }

  showHide (e) {
    e.preventDefault()

    /* Can we do better? */
    let applyEl = e.target
    if (e.target.tagName !== 'BUTTON') applyEl = e.target.parentNode
    applyEl.innerHTML = applyEl.innerHTML === '<i class="fa fa-chevron-left"></i>' ? '<i class="fa fa-chevron-right"></i>' : '<i class="fa fa-chevron-left"></i>'

    // made to parent
    // this.el.classList.toggle('column-25')
    // this.el.classList.toggle('column-0')
  }
}

export default ChatButton
