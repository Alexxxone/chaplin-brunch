Controller = require 'controllers/base/controller'
LoginView = require 'views/login-view'


module.exports = class LoginRegController extends Controller
  login: ->
    @view = new LoginView
  registration: ->