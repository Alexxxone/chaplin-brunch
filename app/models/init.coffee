Model = require './base/model'
mediator = require 'mediator'
module.exports = class Init extends Model
  initialize: ->
    if mediator.user
      @url =  "http://alexxxxone-backend.herokuapp.com/init.json?user_id="+mediator.user.id
#      @url =  "http://localhost:3000/init.json?user_id="+mediator.user.id
  url: ->
#    "http://localhost:3000/init.json?user_id=1"
  url: "http://alexxxxone-backend.herokuapp.com/init.json?user_id="+mediator.user.id

