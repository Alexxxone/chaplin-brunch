CollectionView = require 'views/base/collection-view'
View = require 'views/friendships/friend-view'
template = require 'views/friendships/templates/friends'
module.exports = class HomeUsersView extends CollectionView

  itemView: View
  container: '#container'
  autoRender: true
  containerMethod: 'html'
  className: 'friends-page'
  template: template
  listSelector: '#index_content'

  initialize: ->
    super
    $('.menu_users').addClass('active');
