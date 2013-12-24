Collection = require './base/collection'
Model = require './friend'

module.exports = class Friend extends Collection
  model : Model,
  url: 'http://alexxxxone-backend.herokuapp.com/house'
