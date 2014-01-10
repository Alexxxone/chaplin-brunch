Collection = require './base/collection'
Model = require './message'

module.exports = class Messages extends Collection
  url:  "http://localhost:3000/messages.json"
  initialize: (option)->
    @url = "http://localhost:3000/messages.json?id="+option.id
    super
  model : Model







