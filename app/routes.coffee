# Application routes.
module.exports = (match) ->
  match '', 'home#index'
  match 'friends', 'home#friends'
