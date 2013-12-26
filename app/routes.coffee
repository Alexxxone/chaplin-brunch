# Application routes.
module.exports = (match) ->
  match '', 'home#index'
  match 'friends', 'home#friends'
  match 'friends/:id', 'home#show'
  match 'friends/users', 'home#users'
  match 'settings', 'home#settings'
  urlPath: ->
    "friends/#{@get('id').get('users')}
    /friends/
    /users/
    /settings/
    //"