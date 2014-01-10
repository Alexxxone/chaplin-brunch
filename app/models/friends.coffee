Collection = require './base/collection'
Model = require './friend'

module.exports = class Friends extends Collection
  url:  "http://alexxxxone-backend.herokuapp.com/friends.json"
#  url:  "http://localhost:3000/friends.json"

