View = require 'views/base/view'
template = require './templates/friends'


module.exports = class FriendsView extends View
  container: '#container'
  autoRender: true
  autoAttach: true
  containerMethod: 'html'
  className: 'friends-page'
  template: template
  regions:
    my_friends: '#my_friends'
    invites: '#invites'
    my_invites: '#my_invites'

  initialize: ->
    super
    $('.menu_friends').addClass('active');

