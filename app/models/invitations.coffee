Collection = require './base/collection'
model = require './user'
mediator = require 'mediator'

module.exports = class Invitations extends Collection
  url: "http://localhost:3000/invites.json?user_id="+mediator.user.id
  model: model
#  urlRoot: "    http://alexxxxone-backend.herokuapp.com/invites/"
