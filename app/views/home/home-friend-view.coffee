View = require 'views/base/view'
Chat = require 'views/chat-view'
module.exports = class FriendView extends View
  autoRender: true
  template: require './templates/friend'
  chat: require 'views/templates/chat'
  initialize: ->
    super
    @model.fetch
      success: (response) ->
        console.log response
    @delegate "click", ".start_chat", @start_chat
  start_chat: ->
    new Chat(model: @model)
