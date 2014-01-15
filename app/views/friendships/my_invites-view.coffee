CollectionView = require 'views/base/collection-view'
View = require './my_invite-view'
template = require './templates/my_inv'

module.exports = class MyInvitesView extends CollectionView
  itemView: View
  container: '#my_invites'
  containerMethod: 'html'
  template: template
  listSelector: '.my_invites'


  initialize: ->
    super
    @collection.fetch
      success: (response) ->
        unless response.length is 0
          $('.my_invites_count_badge').text(response.length)
        else
          $('.my_invites_count_badge').empty()
    @listenTo @collection, 'reset', @render
