# chatWidget.js

### DEMO

https://dmitrymarkov.github.io/chatWidget.js/

### COMMANDS
```
pug --client chat/templates/modal.pug --extension pug.js --name modal_tmpl
pug --client chat/templates/chat.pug --extension pug.js --name chat_tmpl
sass --watch chat/sass:chat
```

### TODO

- [ ] textarea auto resize with text
- [ ] show/hide button component
- [ ] replace emojis
- [ ] date divider and proper date in message history
- [ ] bem styles
- [ ] accent corners
- [ ] chat with me button closed
- [ ] my own background
- [ ] webpack conf
- [ ] generic form component with extends
- [ ] eslint with standard setting
- [ ] DataService class with fetch/json
- [ ] Botik class
- [ ] Event apply class
- [ ] Optimize toggle chat
- [ ] Unit tests
- [ ] e2e tests
- [ ] websockets
- [ ] pouchDB local cache
- [x] Move to my repo

#### v.0.0.1

- [x] overflow-y
- [x] audio blink sound
- [x] setTimeout for botik messages
- [x] localStore username and botik use this name
- [x] chat window auto scroll
- [x] pug templates
- [x] scss file with vars and mixins
- [x] event-oriented interface
