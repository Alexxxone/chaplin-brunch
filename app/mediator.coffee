mediator = module.exports = Chaplin.mediator
CurrentUser = require 'models/users/current-user'
utils = require 'lib/utils'

mediator.createUser = (params) ->

  console.log 'register new user'

mediator.logout = ->
  console.log 'logout'
  mediator.user.dispose()
  mediator.user = null
  mediator.receiver_id = null
  mediator.conversation_id = null

  $.removeCookie('id')
  $.removeCookie('username')
  $.removeCookie('friend_id')
  $.removeCookie('conversation_id')
  mediator.publish 'logout'
  utils.redirectTo url: '/login'
mediator.login = (params) ->
    mediator.user = new CurrentUser({id: params.id,username: params.username })
    $.cookie('id', params.id, { expires: 1 })
    $.cookie('username', params.username, { expires: 1 })
#    mediator.publish 'login', mediator.user
    utils.redirectTo url: '/'
mediator.receiver = (receiver_id) ->
  mediator.receiver_id = receiver_id
  $.cookie('receiver_id', receiver_id,{ expires: 1 })
mediator.conversation = (conversation_id) ->
  mediator.conversation_id = conversation_id
  $.cookie('conversation_id', conversation_id,{ expires: 1 })