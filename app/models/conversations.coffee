Collection = require './base/collection'
Model = require './conversation'

module.exports = class Conversations extends Collection
  _.extend @prototype, Chaplin.SyncMachine
  model : Model

  fetch: =>
    @beginSync
    collection = @
    api = "http://alexxxxone-backend.herokuapp.com/conversations.json"
#    api = "http://localhost:3000/conversations.json"

    $.getJSON(api
    ).error (a,b)->
      @unsync
    .success (data) ->
        collection.add data
        @finishSync



