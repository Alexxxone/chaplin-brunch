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
    @delegate 'click', '.menu_friends', @friends
    @delegate 'click', '.menu_users', @users
    @delegate 'click', '.menu_settings', @show
  friends: ->
    utils.redirectTo controller: 'friends', action: 'index'

  users: ->
    utils.redirectTo controller: 'friends', action: 'users'

  show: ->
    utils.redirectTo url: '/settings'


#   utils.redirectTo('friends#index', {id: 2})