Collection = require './base/collection'
Model = require './user'

module.exports = class Users extends Collection
  url:  "http://alexxxxone-backend.herokuapp.com/users.json"
#  url:  "http://localhost:3000/users.json"

