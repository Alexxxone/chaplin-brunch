Controller = require 'controllers/base/controller'
HeaderView = require 'views/home/header-view'
HomePageView = require 'views/home/home-page-view'
HomeFriendsView = require 'views/home/home-friends-view'
HomeFriendView = require 'views/home/home-friend-view'
HomeUsersView = require 'views/home/home-users-view'
Friends = require 'models/friends'
Friend = require 'models/friend'
Users = require 'models/users'
Message = require 'models/message'
Messages = require 'models/messages'
HomeMessageView = require 'views/home/home-message-view'
HomeMessagesView = require 'views/home/home-messages-view'
module.exports = class HomeController extends Controller
  beforeAction: ->
    super
    @compose 'header', HeaderView, region: 'header'
    $('.left_menu li').removeClass('active');

  index: ->
    @view = new HomePageView region: 'main'

  friends: ->
    friends = new Friends
    @view = new HomeFriendsView region: 'main', collection: friends
    friends.fetch()
  show: (params)->
    console.log params.id
#    friend = new Friend
#    @view = new HomeFriendView region: 'main', model: friend
  users: ->
    users = new Users
    @view = new HomeUsersView region: 'main', collection: users
    users.fetch()
  messages: ->
    messages = new Messages
    @view = new HomeMessagesView region: 'main', collection: messages
    messages.fetch()
    $('.menu_messages').addClass('active');
  settings: ->
    console.log 'settings HomeController'
    $('.menu_settings').addClass('active');