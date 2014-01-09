CollectionView = require 'views/base/collection-view'
View = require 'views/messages/message-view'
template = require './templates/messages'

module.exports = class MessagesView extends CollectionView
  itemView: View
  container: '#container'
  autoRender: true
  className: 'messages-page'
  containerMethod: 'html'
  template: template
  listSelector: '#messages_content'

  initialize: ->
    super
    console.log @collection
    $('.menu_conversations').addClass('active')
    @delegate 'click', '.send_message', @send_message
    @collection.on "push", (model) ->
      alert("Ahoy " + model.get("body") + "!")
#    @listenTo(@collection, 'push remove', @render)

  send_message: ->
    input = $(@.el).find('.message_body')
    if input.val().length > 2
      @collection.push({sender_id: 1,user:{username: 'Alex0-test'} ,body: input.val(),receiver_id: 4, conversation_id: 3})
      input.val('')