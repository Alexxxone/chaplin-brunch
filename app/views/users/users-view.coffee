CollectionView = require 'views/base/collection-view'
View = require './user-view'
template = require './templates/users'


module.exports = class UsersView extends CollectionView
  itemView: View
  container: '#page-container'
  containerMethod: 'html'
  listSelector: '#all_users'
  template: template


  initialize: ->
    super
    @collection.fetch
      success: () ->
        console.log
    $('.menu_users').addClass('active');
