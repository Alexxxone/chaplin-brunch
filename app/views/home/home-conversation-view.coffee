View = require 'views/base/view'
Chat = require 'views/chat-view'
utils = require 'lib/utils'
mediator = require 'mediator'

module.exports = class CoversationView extends View
  autoRender: true
  template: require './templates/conversation'
  initialize: ->
    super
    @model.set(created_at: moment(@model.get('created_at')).fromNow())
    @delegate 'click', '.start_chat', @start_chat
    @delegate 'click', '.each_friend_in_list', @open_conversation


  start_chat: ->
    new Chat(params: @model.get('user').id)

  open_conversation: ->
    mediator.conversation(@model.get('id'))
    if mediator.user.id == @model.get('friend_id')
      mediator.receiver(@model.get('user_id'))
    else
      mediator.receiver(@model.get('friend_id'))
    utils.redirectTo url: '/conversation/'+@model.get('id')
