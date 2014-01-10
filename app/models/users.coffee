Collection = require './base/collection'
Model = require './user'

module.exports = class Users extends Collection
  _.extend @prototype, Chaplin.SyncMachine
  model : Model
  fetch: =>
    @beginSync
    collection = @
    api = "http://alexxxxone-backend.herokuapp.com/users.json"
#    api = "http://localhost:3000/users.json"
    $.getJSON(api
    ).error (a,err)->
       @unsync
       console.log err
    .success (data) ->
      console.log data
      collection.add data
      @finishSync
