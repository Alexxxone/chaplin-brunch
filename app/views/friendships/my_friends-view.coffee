CollectionView = require 'views/base/collection-view'
View = require './friend-view'
template = require './templates/my'

module.exports = class MyFriendsView extends CollectionView
  itemView: View
  container: '#my_friends'
  containerMethod: 'html'
  template: template
  listSelector: '.my_friends'


  initialize: ->
    super
    @collection.fetch()
    @listenTo @collection, 'reset', @render
    @subscribeEvent('new_friend', @restrat)
    @subscribeEvent('delete_friend', @restrat)

  restrat:  ->
    @initialize()
