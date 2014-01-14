CollectionView = require 'views/base/collection-view'
View = require '/views/messages/message-view'
template = require './templates/messages'
mediator = require 'mediator'
Message = require '/models/message'

module.exports = class MessagesView extends CollectionView
  itemView: View
  container: '#container'
  autoRender: true
  className: 'messages-page'
  containerMethod: 'html'
  animationDuration: 1000
  template: template
  listSelector: '#messages_content'
  loadingSelector: ".loading"
  receiver_id: mediator.receiver_id
  conversation_id: mediator.conversation_id
  user: mediator.user


  initialize: ->
    super
    @socket = io.connect(window.location.toString())
    $('.menu_conversations').addClass('active')
    @delegate 'click', '.send_message', @send_message
    @scroll_to_bottom()
    @listenTo(@collection, 'push remove', @render)
    that = @
    @socket.on "news#{@conversation_id}", (data)->
      that.incoming_message(data)

  send_message: ->
    input = $(@.el).find('.message_body')
    if input.val().length > 2
      message = new Message({user_id: @user.id ,message:{body: input.val(),receiver_id: @receiver_id, conversation_id: @conversation_id}})

      message.save()
      console.log(message)
      @collection.push({sender_id: @user.id ,user:{username: @user.get('username')} ,body: input.val(),receiver_id: @receiver_id, conversation_id: @conversation_id})
      @publish(input.val())
      input.val('')
      @scroll_to_bottom()
  scroll_to_bottom: ->
    scrollTo_val = $('#messages_content').prop('scrollHeight') + 'px'
    $('#messages_content').slimScroll({scrollTo: scrollTo_val})

  publish: (body) ->
    @socket.emit "messages",
      sender_id: @user.id
      username: @user.get('username')
      receiver_id: @receiver_id
      body: body
      conversation_id: @conversation_id

  incoming_message: (data)->
#    badge = $('.new_messages_badge').text()
#    $('.new_messages_badge').text(parseInt(badge)-1)
    @collection.push({sender_id: data.sender_id ,user:{username: data.username} ,body: data.body ,receiver_id: data.receiver_id , conversation_id: data.conversation_id})
    @scroll_to_bottom()