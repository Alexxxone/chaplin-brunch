Collection = require './base/collection'
Model = require './message'
mediator = require 'mediator'
module.exports = class Messages extends Collection
#  url:  "http://localhost:3000/messages.json"
  url:  "http://alexxxxone-backend.herokuapp.com/messages.json"
  initialize: (option)->
#    @url = "http://localhost:3000/messages.json?id="+option.id+"&user_id="+mediator.user.id
    @url = "http://alexxxxone-backend.herokuapp.com/messages.json?id="+option.id+"&user_id="+mediator.user.id
    super
  model : Model







