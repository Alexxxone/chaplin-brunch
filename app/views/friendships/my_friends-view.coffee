CollectionView = require 'views/base/collection-view'
View = require './friend-view'
template = require './templates/my'

module.exports = class MyFriendsView extends CollectionView
  itemView: View
  container: '#my_friends'
  autoRender: true
  containerMethod: 'html'
  template: template
  listSelector: '.my_friends'


  initialize: ->
    super
    @listenTo @collection, 'reset', @render
#    @collection.fetch
#      success: (response) ->
#        $('.friends_count').text(response.length)
