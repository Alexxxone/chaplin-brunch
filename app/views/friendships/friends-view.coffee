View = require 'views/base/view'

template = require './templates/friends'
My_friends = require './my_friends'
Invites = require './invites'

module.exports = class FriendsView extends View
  container: '#container'
  autoRender: true
  containerMethod: 'html'
  className: 'friends-page'
  template: template


  initialize: ->
    super
    @collection.fetch
      success: (response) ->
          new Invites(collection: response.models[0].get('invites'))
          new My_friends(collection: response.models[0].get('my_friends'))
          $('.friends_count').text(response.length)
    $('.menu_friends').addClass('active');
