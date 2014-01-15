CollectionView = require 'views/base/collection-view'
View = require './user-view'
template = require './templates/users'


module.exports = class UsersView extends CollectionView
  itemView: View
  container: '#container'
  autoRender: true
  containerMethod: 'html'
  listSelector: '#all_users'
  template: template
  className: 'friends-page'

  initialize: ->
    super
    $('.menu_users').addClass('active');
