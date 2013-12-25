View = require 'views/base/view'



module.exports = class ChatView extends View
  container: '.main_chat'
  autoRender: false
  template: require './templates/chat'
  initialize: ->
    @render()
    $(".chat_container").containerize()
    @delegate "click", ".send_message", @send_message
  send_message: ->
    console.log 'send message'
