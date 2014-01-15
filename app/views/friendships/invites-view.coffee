CollectionView = require 'views/base/collection-view'
View = require './invite-view'
template = require './templates/inv'

module.exports = class InvitesView extends CollectionView
  itemView: View
  container: '#invites'
  containerMethod: 'html'
  template: template
  listSelector: '.invites'


  initialize: ->
    super
    self = @
    @collection.fetch
      success: (response) ->
        self.badges(response.length)
    @listenTo @collection, 'reset', @render
    @subscribeEvent('delete_friend', @restrat)
    @subscribeEvent('new_friend', @restrat)
    @subscribeEvent('decline_friendship', @restrat)

  restrat:  ->
    console.log 'decline_friendship -> receiv'
    @initialize()

  badges: (length) ->
    if length is 0
      $('.new_friend_badge, .invites_count_badge').empty()
    else
      $('.new_friend_badge, .invites_count_badge').text(length)

