View = require 'views/base/view'
Chat = require 'views/chat-view'
template = require './templates/friend'
chat_template = require 'views/templates/chat'

mediator = require 'mediator'
Friendship = require 'models/friend'
module.exports = class FriendView extends View
  autoRender: true
  template: template
  chat: chat_template
  user: mediator.user
#  info_temp: $('#user_info_panel').html()
  initialize: ->
    super
    console.log 'friend-view'
    @delegate "click", ".start_chat", @start_chat
    @delegate "click", ".remove_friend", @destroy_friendship
    @delegate 'click', '.friend_image', @info

  start_chat: ->
    new Chat(model: @model)
  info: ->
    console.log @model.get('email')
#    Handlebars.compile @info_temp


  destroy_friendship: ->
    friendship = new Friendship(firend_id: @model.id, user_id: @user.id )
    console.log friendship
    friendship.url = 'http://localhost:3000/friendships/'+@model.id+'?user_id='+@user.id
    friendship.fetch(method: 'delete')
    @model.destroy()
