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
    super
