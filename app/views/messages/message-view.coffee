View = require 'views/base/view'

module.exports = class MessageView extends View
  autoRender: true
  template: require './templates/message'
  initialize: ->
    super
    @model.set(created_at: moment(@model.get('created_at')).fromNow())
    @delegate 'click', '.start_chat', @start_chat
    @delegate 'click', '.each_friend_in_list', @mark_message
    @delegate 'click', '.remove_message', @remove_message


  start_chat: ->
    new Chat(params: @model.get('user').id)

  mark_message: ->
    $(@.el).toggleClass('marked_message')
    $(@.el).find('.remove_message').fadeToggle()
  remove_message: ->
    @model.destroy()
