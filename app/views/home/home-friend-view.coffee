View = require 'views/base/view'

module.exports = class FriendView extends View
  autoRender: true
  template: require './templates/friend'