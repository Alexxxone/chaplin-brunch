View = require 'views/base/view'
Chat = require 'views/chat-view'
module.exports = class MessageView extends View
  autoRender: true
  template: require './templates/message'
  initialize: ->
    super

    @model.set(created_at: moment(@model.get('created_at')).fromNow())
    @delegate 'click', '.start_chat', @start_chat


  start_chat: ->
    new Chat(model: @model)

