View = require 'views/base/view'
utils = require 'lib/utils'
# Site view is a top-level view which is bound to body.
module.exports = class SiteView extends View
  container: 'body'
  id: 'site-container'
  regions:
    header: '#header-container'
    main: '#page-container'
  template: require './templates/site'
  initialize: ->
    @delegate 'click', '.menu_main_page', @home
    @delegate 'click', '.menu_friends', @friends
    @delegate 'click', '.menu_users', @users
    @delegate 'click', '.menu_settings', @show
    @delegate 'click', '.menu_messages', @messages

  home: ->
    utils.redirectTo url: '/'

  friends: ->
    utils.redirectTo url: '/friends'

  users: ->
    utils.redirectTo url: '/users'

  show: ->
    utils.redirectTo url: '/settings'

  messages: ->
    utils.redirectTo url: '/messages'
