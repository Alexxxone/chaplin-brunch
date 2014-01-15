View = require 'views/base/view'
utils = require 'lib/utils'
mediator = require 'mediator'
SiteView = require 'views/site-view'
Init = require 'models/init'

# Site view is a top-level view which is bound to body.
module.exports = class SiteView extends View
  container: 'body'
  id: 'site-container'
  autoRender: true
  regions:
    menu: '#menu-container'
    main: '#page-container'
  template: require './templates/site'
  user: mediator.user if mediator.user
  initialize: ->
    @model.fetch
      success: (res)->
        $('.new_friend_badge').text(res.get('invitations')) if res.get('invitations') > 0
        $('.new_messages_badge').text(res.get('messages')) if res.get('messages') > 0
    @socket = io.connect(window.location.toString())
    @delegate 'click', '.menu_main_page', @home
    @delegate 'click', '.menu_friends', @friends
    @delegate 'click', '.menu_users', @users
    @delegate 'click', '.menu_settings', @settings
    @delegate 'click', '.menu_conversations', @conversations
    @delegate 'click', '.login_link', @login
    @delegate 'click', '.logout_link', @logout

    that = @
    @socket.on "inbox#{@user.id}", (data)->
      that.incoming_inbox(data)
      console.log data
  home: ->
    utils.redirectTo url: '/'
  friends: ->
    utils.redirectTo url: '/friends'
  users: ->
    utils.redirectTo url: '/users'
  settings: ->
    utils.redirectTo url: '/settings'
  conversations: ->
    utils.redirectTo url: '/conversations'
  login: ->
    utils.redirectTo url: '/login'
  logout: ->
    mediator.logout()
    utils.redirectTo url: '/login'

  incoming_inbox: (data) ->
    badge = $('.new_messages_badge').text()
    $('.new_messages_badge').text(parseInt(badge)+1)
    $.gritter.add
      title: data.body
      text: data.username


