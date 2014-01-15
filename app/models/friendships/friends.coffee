Collection = require 'models/base/collection'
Model = require './friend'
mediator = require 'mediator'

module.exports = class Friends extends Collection
  url:  "http://alexxxxone-backend.herokuapp.com/friends.json?user_id="+mediator.user.id
#  url:  "http://localhost:3000/friends.json?user_id="+mediator.user.id


