View = require 'views/base/view'
mediator = require 'mediator'
template = require './templates/invites'
Friendship = require 'models/friend'
module.exports = class FriendView extends View
  autoRender: true
  template: template

  initialize: ->
    super
    console.log 'invite-view'
    @delegate "click", ".accept_friend", @accept_friend
    @delegate 'click', '.friend_image', @info
#    @listenTo(@model, 'change push remove', @render)
  info: ->
    console.log @model.get('email')
#    @el.append(_template('#user_info_panel').render())

  accept_friend: ->
    friendship = new Friendship({user_id: mediator.user.id, friend_id: @model.id})
    friendship.save()
    @model.destroy()


