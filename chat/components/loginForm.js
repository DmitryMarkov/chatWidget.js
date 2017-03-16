// jshint asi: true
;(function () {
  'use strict'

  const modal_tmpl = window.modal_tmpl

  class LoginForm {
    constructor (options) {
      this.el = options.el

      this.render()

      this.toggleModal = this.toggleModal.bind(this)

      this._initEvents()
    }

    render () {
      this.el.innerHTML = modal_tmpl()

      this.chatModal = this.el.querySelector('.modal__chat')
      this.chatModalClose = this.el.querySelector('.modal__chat-close')
      this.chatModalSubmit = this.el.querySelector('.chat-login')
    }

    on (name, cb) {
			this.el.addEventListener(name, cb)
		}

    trigger (name, data) {
			let event = new CustomEvent(name, { detail: data })
			this.el.dispatchEvent(event)
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

  window.LoginForm = LoginForm

})()
