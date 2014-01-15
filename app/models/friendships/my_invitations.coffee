Collection = require 'models/base/collection'
model = require 'models/users/user'
mediator = require 'mediator'

module.exports = class Invitations extends Collection
  url: "http://localhost:3000/my_invites/"+mediator.user.id+".json"
  model: model
#  urlRoot: "    http://alexxxxone-backend.herokuapp.com/invites/"
