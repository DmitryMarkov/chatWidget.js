/* global CustomEvent */

function EventMixin () {
  this.on = function (name, cb) {
    this.el.addEventListener(name, cb)
  }
  this.trigger = function (name, data) {
    let event = new CustomEvent(name, { detail: data })
    this.el.dispatchEvent(event)
  }
}

export default EventMixin
