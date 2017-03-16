// jshint asi: true
;(function () {
  'use strict'

  class MessageForm {
    constructor (options) {
      this.el = options.el
      this.messageTextarea = this.el.querySelector('#message')
      this._initEvents()
    }

    on (name, cb) {
			this.el.addEventListener(name, cb)
		}

    trigger (name, data) {
			let event = new CustomEvent(name, { detail: data })
			this.el.dispatchEvent(event)
		}

    reset (e) {
      this.el.reset()
    }

    submitMessageForm (e) {
      if (e.charCode == 13 && e.shiftKey === false) {
        e.preventDefault()
        this.trigger('message', { text: e.target.value })
        this.reset(e)
      }
    }

    _initEvents () {
      this.messageTextarea.addEventListener('keypress', this.submitMessageForm.bind(this))
    }
  }

  window.MessageForm = MessageForm

})()
