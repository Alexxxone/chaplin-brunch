View = require 'views/base/view'

module.exports = class MessageView extends View
  autoRender: true
  template: require './templates/message'
  initialize: ->
    super
    @model.fetch
      success: (response) ->
        console.log response
    @model.set(created_at: moment(@model.get('created_at')).fromNow())
