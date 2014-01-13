CollectionView = require 'views/base/collection-view'
View = require 'views/home/home-conversation-view'
template = require './templates/conversations'

module.exports = class HomeConversationsView extends CollectionView
  itemView: View
  container: '#container'
  autoRender: true
  className: 'messages-page'
  containerMethod: 'html'
  template: template
  listSelector: '#messages_content'

  initialize: ->
    super
#    @collection.fetch
#      success: (response) ->
#        console.log response
    console.log 'home-conversation-view'
    $('.menu_conversations').addClass('active');
