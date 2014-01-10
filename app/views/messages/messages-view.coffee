CollectionView = require 'views/base/collection-view'
View = require 'views/messages/message-view'
template = require './templates/messages'

module.exports = class MessagesView extends CollectionView
  itemView: View
  container: '#container'
  autoRender: false
  className: 'messages-page'
  containerMethod: 'html'
  animationDuration: 1000
  template: template
  listSelector: '#messages_content'
  loadingSelector: ".loading"


  initialize: ->
    super
    $('.menu_conversations').addClass('active')
    @delegate 'click', '.send_message', @send_message
    @scroll_to_bottom()
    @listenTo(@collection, 'push remove', @render)
    console.log @collection.models
  send_message: ->
    input = $(@.el).find('.message_body')
    if input.val().length > 2
      @collection.push({sender_id: 1,user:{username: 'Alex0-test'} ,body: input.val(),receiver_id: 4, conversation_id: 3})
      input.val('')
      @scroll_to_bottom()
  scroll_to_bottom: ->
    scrollTo_val = $('#messages_content').prop('scrollHeight') + 'px'
    $('#messages_content').slimScroll({scrollTo: scrollTo_val})




