Model = require './base/model'
mediator = require 'mediator'
module.exports = class Init extends Model
  url: "http://localhost:3000/init.json?user_id="+mediator.user.id
#  url: "http://alexxxxone-backend.herokuapp.com/init.json?user_id="+mediator.user.id

