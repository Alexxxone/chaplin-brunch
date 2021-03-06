# Application routes.
module.exports = (match) ->
  match '', 'home#index'
  match 'friends', 'home#friends'
  match 'friends/:id', 'home#show'
  match 'users', 'home#users'
  match 'settings', 'home#settings'
  match 'conversations', 'home#conversations'
  match 'conversation/:id', 'home#conversation'
  match 'login', 'login_reg#login'
  match 'logout', 'login_reg#logout'
  match 'register', 'login_reg#registration'
  urlPath: ->
    "friends/#{@get('id')}
    /friends/
    /users/
    /settings/
    /conversations/
    /conversation/:id/
    /messages/destroy/:id/
    //"