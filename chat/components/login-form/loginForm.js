import modalTmpl from './modal.pug'

class LoginForm {
  constructor ({
    el,
    EventMixin
  }) {
    // adding on() and trigger() methods
    EventMixin.apply(this)

    this.el = el

    this.render()

    this.toggleModal = this.toggleModal.bind(this)

    this._initEvents()
  }

  render () {
    this.el.innerHTML = modalTmpl()

    this.chatModal = this.el.querySelector('.modal__chat')
    this.chatModalClose = this.el.querySelector('.modal__chat-close')
    this.chatModalSubmit = this.el.querySelector('.chat-login')
  }

  toggleModal (e) {
    e.preventDefault()

    this.chatModal.classList.toggle('not-visible')
  }

  submitLoginForm (e) {
    e.preventDefault()

    this.trigger('login', { username: e.target.name.value })
    this.toggleModal(e)
  }

  _initEvents () {
    this.chatModalClose.addEventListener('click', this.toggleModal)
    this.chatModalSubmit.addEventListener('submit', this.submitLoginForm.bind(this))
  }
}

export default LoginForm
