Collection = require './base/collection'
Model = require './message'

module.exports = class Messages extends Collection

  initialize: (option)->
    console.log 'MODEL PARAMS'
    @id = option.id
    super
  model : Model
  url: "http://localhost:3000/messages.json?id="+@id





