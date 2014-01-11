View = require 'views/base/view'
Login = require 'models/conversation'
template = require './templates/login'
mediator = require 'mediator'
utils = require 'lib/utils'
User = require 'models/user'
Collection = require 'models/base/collection'
module.exports = class LoginView extends View
  container: 'body'
  autoRender: true
  template: template
  containerMethod: 'html'
  initialize: ->
    @delegate "click", ".send", @login
    @delegate "click", ".cancel", @cancel
    @delegate "click", ".help", @fill
  fill: ->
    $('#inputEmail').val('b0@maial.ru')
    $('#inputPassword').val('12345678')
  login: ->
    email = $('#inputEmail').val()
    password = $('#inputPassword').val()
    $.ajax(
      crossDomain: true
      type: 'POST'
      url: "http://localhost:3000/login"
      data: 'user': {'email': email,'password': password}
    ).success (response) ->
      mediator.login(response)

    .complete (response) ->
      $('.form-group').addClass('has-error') if response.status is 404
  cancel: ->
    utils.redirectTo url: '/'

