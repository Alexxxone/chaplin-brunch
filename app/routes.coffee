# Application routes.
module.exports = (match) ->
  match '', 'home#index'
  match 'friends', 'home#friends'
  match 'friends/:id', 'home#show'
  match 'users', 'home#users'
  match 'settings', 'home#settings'
  match 'messages', 'home#messages'
  urlPath: ->
    "friends/#{@get('id')}
    /friends/
    /users/
    /settings/
    /messages/
    //"