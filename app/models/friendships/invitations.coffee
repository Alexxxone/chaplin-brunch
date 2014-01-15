Collection = require 'models/base/collection'
model = require 'models/users/user'
mediator = require 'mediator'

module.exports = class Invitations extends Collection
#  url: "http://localhost:3000/invites.json?user_id="+mediator.user.id
  url: "http://alexxxxone-backend.herokuapp.com/invites.json?user_id="+mediator.user.id
  model: model

