Collection = require 'models/base/collection'
model = require 'models/users/user'
mediator = require 'mediator'

module.exports = class MyFriends extends Collection
#  url: "http://localhost:3000/friendships.json?user_id="+mediator.user.id
  url: "http://alexxxxone-backend.herokuapp.com/friendships.json?user_id="+mediator.user.id
  model: model
