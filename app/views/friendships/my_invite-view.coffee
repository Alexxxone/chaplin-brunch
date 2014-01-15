View = require 'views/base/view'
mediator = require 'mediator'
template = require './templates/my_invites'
Friendship = require 'models/friendships/friend'

module.exports = class FriendView extends View
  autoRender: true
  template: template
  user: mediator.user

  initialize: ->
    super
    @delegate "click", ".decline_request", @decline_request
    @delegate 'click', '.friend_image', @info

  info: ->
    console.log @model.get('email')
#    @el.append(_template('#user_info_panel').render())

  decline_request: ->
    friendship = new Friendship(firend_id: @model.id, user_id: @user.id )
    friendship.url = 'http://localhost:3000/friendships/'+@model.id+'?user_id='+@user.id
    friendship.fetch(method: 'delete')
    @model.destroy({wait: true})

