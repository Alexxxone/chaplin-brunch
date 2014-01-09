Model = require './base/model'

module.exports = class Conversation extends Model
  urlRoot: "http://localhost:3000/conversations/:id.json"

