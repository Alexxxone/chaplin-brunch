Collection = require './base/collection'
Model = require './conversation'
mediator = require 'mediator'
module.exports = class Conversations extends Collection
  url:  "http://alexxxxone-backend.herokuapp.com/conversations.json?user_id="+mediator.user.id
#  url:  "http://localhost:3000/conversations.json?user_id="+mediator.user.id




