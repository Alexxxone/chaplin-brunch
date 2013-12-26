CollectionView = require 'views/base/collection-view'
View = require 'views/home/home-message-view'
template = require './templates/messages'

module.exports = class HomeMessagesView extends CollectionView
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
    console.log @collection
    $('.menu_messages').addClass('active');
