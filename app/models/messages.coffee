Collection = require './base/collection'
Model = require './message'

module.exports = class Messages extends Collection
  _.extend @prototype, Chaplin.SyncMachine
  model : Model

  fetch: =>
    @beginSync
    collection = @
    #    api = "http://alexxxxone-backend.herokuapp.com/friends.json"
    api = "http://localhost:3000/messages.json"

    $.getJSON(api
    ).error (a,b)->
      @unsync
    .success (data) ->
        collection.add data
        @finishSync



