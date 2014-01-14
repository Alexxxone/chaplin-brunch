View = require 'views/base/view'
Chat = require 'views/chat-view'
Friendship = require 'models/friendship'
mediator = require 'mediator'

module.exports = class FriendView extends View
  autoRender: true
  template: require './templates/friend'
  chat: require 'views/templates/chat'
  initialize: ->
    super
    console.log 'friend-view'
#    @delegate "click", ".start_chat", @start_chat
#    @delegate "click", ".accept_friend", @accept_friend
#    @delegate 'click', '.friend_image', @info
#    @listenTo(@model, 'push remove', @render)
#  start_chat: ->
#    new Chat(model: @model)
#
#  info: ->
#    console.log @model.get('email')
#    @el.append(_template('#user_info_panel').render())
#
#  accept_friend: (elem)->
#    friendship = new Friendship({user_id: mediator.user.id, friend_id: $(elem.currentTarget).attr('name')})
#    friendship.save()
#    console.log friendship
#  destroy_friendship: ->
#
#    @model.destroy()
