# The application object.
mediator = require 'mediator'

module.exports = class Application extends Chaplin.Application
  # start: ->
  #   # You can fetch some data here and start app
  #   # (by calling `super`) after that.
  #   super

  initMediator: ->
    unless $.cookie('id') is undefined
      mediator.login({id: $.cookie('id'), username: $.cookie('username')})
    else
      mediator.login({id: 0, username: 'New'})
    unless $.cookie('receiver_id') is undefined
      mediator.receiver($.cookie('receiver_id'))
      mediator.conversation($.cookie('conversation_id'))
    super
