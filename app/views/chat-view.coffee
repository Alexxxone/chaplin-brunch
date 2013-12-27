View = require 'views/base/view'
Message = require 'models/message'


module.exports = class ChatView extends View
  container: '.main_chat'
  autoRender: false
  template: require './templates/chat'
  params: params
  initialize: ->
    @render()
    $(".chat_container").containerize()
    @delegate "click", ".send_message", @send_message
  send_message:  ->
#    console.log params
#    text =  $(@el).find('.message_text').val()
#    message = new Message()
#    message.create(body: text, receiver_id: params,sender_id: 1)
#    console.log message
#
#    console.log 'send message'
