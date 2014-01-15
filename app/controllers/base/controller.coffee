SiteView = require 'views/site-view'
Init = require 'models/init'

module.exports = class Controller extends Chaplin.Controller
  # Compositions persist stuff between controllers.
  # You may also persist models etc.
  beforeAction: ->
    @model =  new Init
    @compose 'site', SiteView , model: @model









