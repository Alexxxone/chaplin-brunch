Collection = require './base/collection'
Model = require './friend'

module.exports = class Friend extends Collection
  _.extend @prototype, Chaplin.SyncMachine
  model : Model
#  url: 'http://alexxxxone-backend.herokuapp.com'
  fetch: =>

    #Set the machine into `syncing` state
    @beginSync()
    $.ajaxSetup beforeSend: (xhr) ->
      xhr.setRequestHeader "accept", "application/json"

    $.ajax(
      url: "http://localhost:3000/friends.json?callback?"
      dataType: "jsonp"
      type: "get"
      processData: false
      jsonpCallback: @successs
    ).success (response) ->
        console.log(response)




#    uri: "http://localhost:3000/friends"
#    method: "GET"
#    json: true
#    , (error, response, body) ->
#    if error
#      res.send 400
#    else
#      res.render "friends",
#        title: "friends"
#        friends: body


  successs: (response) ->
    console.log('success function');
    console.log(response);
    # Exit if for some reason this collection was
    # disposed prior to the response
    return if @disposed

    # Update the collection


    # Set the machine into `synced` state
    @disposed