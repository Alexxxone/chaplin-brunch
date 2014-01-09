View = require 'views/base/view'
Chat = require 'views/chat-view'
utils = require 'lib/utils'

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
    utils.redirectTo url: '/conversation/'+@model.get('id')
