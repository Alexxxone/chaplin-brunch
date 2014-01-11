mediator = module.exports = Chaplin.mediator
CurrentUser = require 'models/current-user'


mediator.createUser = (params) ->

  console.log 'register new user'

mediator.logout = ->
  console.log 'logout'
  mediator.user.dispose()
  mediator.user = null
  $.removeCookie('id')
  $.removeCookie('username')
  mediator.publish 'logout'
mediator.login = (params) ->
  unless mediator.user
    mediator.user = new CurrentUser({id: params.id,username: params.username })
    $.cookie('id', params.id, { expires: 1 })
    $.cookie('username', params.username, { expires: 1 })
    mediator.publish 'login', mediator.user

