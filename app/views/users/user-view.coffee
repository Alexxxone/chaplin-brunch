View = require 'views/base/view'
Chat = require 'views/chat-view'

template = require './templates/user'
chat_template = require 'views/templates/chat'

mediator = require 'mediator'
Friendship = require 'models/friendships/friend'

module.exports = class UserView extends View
  autoRender: true
  template: template
  chat: chat_template
  user: mediator.user

  initialize: ->
    super
    console.log 'user-view'
    @delegate "click", ".accept_friend", @accept_friend
    @delegate 'click', '.friend_image', @info
#    @listenTo(@model, 'change push remove', @render)
  info: ->
    console.log @model.get('email')
#    @el.append(_template('#user_info_panel').render())

  accept_friend: ->
    friendship = new Friendship({user_id: mediator.user.id, friend_id: @model.id})
    friendship.save()

    console.log friendship


