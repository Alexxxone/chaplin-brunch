View = require 'views/base/view'
mediator = require 'mediator'
template = require './templates/invites'
Friendship = require 'models/friendships/friend'

module.exports = class FriendView extends View
  autoRender: true
  template: template
  user: mediator.user
  initialize: ->
    super
    console.log 'invite-view'
    @delegate "click", ".accept_friend", @accept_friend
    @delegate 'click', '.friend_image', @info
    @delegate 'click', '.decline_friendship', @decline_friendship


  info: ->
    console.log @model.get('email')
#    @el.append(_template('#user_info_panel').render())

  accept_friend: ->
    friendship = new Friendship({user_id: mediator.user.id, friend_id: @model.id})
    friendship.save({wait: true})
    @model.destroy({wait: true})
    @publishEvent('new_friend')
  decline_friendship: ->
    console.log 'decline_friendship -> send'
#    @model.url = "http://localhost:3000/destroy_invitation/#{@model.id}/#{@user.id}"
    @model.url = "http://alexxxxone-backend.herokuapp.com/destroy_invitation/#{@model.id}/#{@user.id}"
    @model.destroy({wait: true})
    @publishEvent('decline_friendship')
