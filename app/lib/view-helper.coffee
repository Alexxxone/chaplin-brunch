# Application-specific view helpers
# http://handlebarsjs.com/#helpers
# --------------------------------
utils = require './utils'
mediator = require 'mediator'

register = (name, fn) ->
  Handlebars.registerHelper name, fn

# Map helpers
# -----------

# Check for logged user
Handlebars.registerHelper 'ifLoggedIn', (options) ->
  method = if mediator.user then options.fn else options.inverse
  method this
# Get User name
Handlebars.registerHelper 'user_name', (options) ->
  mediator.user.get('username')

# Make 'with' behave a little more mustachey.
register 'with', (context, options) ->
  if not context or Handlebars.Utils.isEmpty context
    options.inverse(this)
  else
    options.fn(context)

# Inverse for 'with'.
register 'without', (context, options) ->
  inverse = options.inverse
  options.inverse = options.fn
  options.fn = inverse
  Handlebars.helpers.with.call(this, context, options)

# Get Chaplin-declared named routes. {{url "likes#show" "105"}}
register 'url', (routeName, params..., options) ->
  utils.reverse routeName, params
