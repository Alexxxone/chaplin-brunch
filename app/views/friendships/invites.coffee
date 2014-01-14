CollectionView = require 'views/base/collection-view'
View = require './friend-view'
template = require './templates/invites'
FriendsView =  require './friends-view'

module.exports = class InvitesView extends CollectionView
  itemView: View
  container: '#invites'
  autoRender: true
  containerMethod: 'html'
  template: template
  listSelector: '.invites'

  initialize: ->
    console.log 'invites'
    super