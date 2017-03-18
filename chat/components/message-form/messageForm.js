class MessageForm {
  constructor ({
    el,
    EventMixin
  }) {
    // adding on() and trigger() methods
    EventMixin.apply(this)

    this.el = el
    this.messageTextarea = this.el.querySelector('#message')
    this._initEvents()
  }

  reset (e) {
    this.el.reset()
  }

  submitMessageForm (e) {
    console.log(e.shiftKey, e.ctrlKey)
    if (e.charCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      if (e.target.value.trim()) {
        this.trigger('message', { text: e.target.value })
        this.reset(e)
      }
    }
  }

  _initEvents () {
    this.messageTextarea.addEventListener('keypress', this.submitMessageForm.bind(this))
  }
}

export default MessageForm
