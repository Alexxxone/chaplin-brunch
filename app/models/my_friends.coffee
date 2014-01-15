Collection = require './base/collection'
model = require './user'
mediator = require 'mediator'

module.exports = class MyFriends extends Collection
  url: "http://localhost:3000/friendships.json?user_id="+mediator.user.id
  model: model
#  urlRoot: "    http://alexxxxone-backend.herokuapp.com/friendships/?user_id="+mediator.user.id
