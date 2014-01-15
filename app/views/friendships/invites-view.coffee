CollectionView = require 'views/base/collection-view'
View = require './invite-view'
template = require './templates/inv'

module.exports = class InvitesView extends CollectionView
  itemView: View
  container: '#invites'
  autoRender: true
  containerMethod: 'html'
  template: template
  listSelector: '.invites'



  initialize: ->
    @listenTo @collection, 'reset', @render
    super