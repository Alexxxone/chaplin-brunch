CollectionView = require 'views/base/collection-view'
View = require './friend-view'
template = require './templates/my_friends'
FriendsView =  require './friends-view'

module.exports = class MyFriendsView extends CollectionView
  itemView: View
  container: '#my_friends'
  autoRender: true
  containerMethod: 'html'
  template: template
  listSelector: '.my_friends'

  initialize: ->
    super
    console.log 'my_friends'