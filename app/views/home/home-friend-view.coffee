View = require 'views/base/view'
Chat = require 'views/chat-view'
module.exports = class FriendView extends View
  autoRender: true
  template: require './templates/friend'
  chat: require 'views/templates/chat'
  initialize: ->
    super
    @delegate "click", ".start_chat", @start_chat
    @delegate 'click', '.friend_image', @info
  start_chat: ->
    new Chat(model: @model)

  info: ->
    console.log @model.get('email')
    @el.append(_template('#user_info_panel').render().el)