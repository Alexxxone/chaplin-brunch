Model = require './base/model'

module.exports = class Init extends Model
  url: "http://localhost:3000/init.json"
#  initialize: ->
#    @fetch()
#  fetch: =>
#
#    #    api = "http://alexxxxone-backend.herokuapp.com/friends.json"
#    api = "http://localhost:3000/init.json"
#    model = @
#    $.getJSON(api
#    ).error (a,b)->
#      @unsync
#    .success (data) ->
#        data
