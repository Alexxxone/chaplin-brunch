CollectionView = require 'views/base/collection-view'
View = require 'views/home/home-friend-view'
template = require './templates/friends'
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
    @collection.fetch
      success: (response) ->
        console.log response
    console.log $('.menu_users')
    $('.menu_users').addClass('active');
