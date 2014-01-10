View = require 'views/base/view'
utils = require 'lib/utils'


# Site view is a top-level view which is bound to body.
module.exports = class SiteView extends View
  container: 'body'
  id: 'site-container'
  autoRender: true
  regions:
    menu: '#menu-container'
    main: '#page-container'
  template: require './templates/site'
  initialize: ->
    @model.fetch
      success: (res)->
        $('.new_friend_badge').text(res.get('invitations')) if res.get('invitations') > 0
        $('.new_messages_badge').text(res.get('messages')) if res.get('messages') > 0
    @delegate 'click', '.menu_main_page', @home
    @delegate 'click', '.menu_friends', @friends
    @delegate 'click', '.menu_users', @users
    @delegate 'click', '.menu_settings', @settings
    @delegate 'click', '.menu_conversations', @conversations

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


