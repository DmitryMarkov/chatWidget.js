import Chat from './chat/main'

/* eslint-disable no-new */
new Chat({
  el: '.chat',
  buttonEl: '.website', // element to append chat toogle button. Must be relative.
  isOpenedOnStart: true // default value: true
})
