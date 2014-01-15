User = require 'models/users/user'

module.exports = class CurrentUser extends User
  urlKey: ''
  urlPath: ->
    '/users/me'