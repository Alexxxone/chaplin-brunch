Collection = require './base/collection'
Model = require './friend'

module.exports = class Friends extends Collection
  _.extend @prototype, Chaplin.SyncMachine
  model : Model

  fetch: =>
    @beginSync
    collection = @
#    api = "http://alexxxxone-backend.herokuapp.com/friends.json"
    api = "http://localhost:3000/friends.json"

    $.getJSON(api
    ).error (a,b)->
       @unsync
    .success (data) ->
      collection.add data
      console.log collection
      @finishSync
