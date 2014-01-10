Controller = require 'controllers/base/controller'
MenuView = require 'views/home/menu-view'
Init = require 'models/init'
HomePageView = require 'views/home/home-page-view'
HomeFriendsView = require 'views/home/home-friends-view'
HomeFriendView = require 'views/home/home-friend-view'
HomeUsersView = require 'views/home/home-users-view'
Friends = require 'models/friends'
Friend = require 'models/friend'
Users = require 'models/users'
Conversation = require 'models/conversation'
Conversations = require 'models/conversations'
HomeConversationView = require 'views/home/home-conversation-view'
HomeConversationsView = require 'views/home/home-conversations-view'
Message = require 'models/message'
Messages = require 'models/messages'
MessageView = require 'views/messages/message-view'
MessagesView = require 'views/messages/messages-view'

module.exports = class HomeController extends Controller
  beforeAction: ->
    super
    @compose 'menu',MenuView, region: 'menu'
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
  conversations: ->
    conversations = new Conversations
    @view = new HomeConversationsView region: 'main', collection: conversations
    conversations.fetch()

  conversation: (params) ->

    messages = new Messages( id: params.id )
    @view = new MessagesView region: 'main', collection: messages
    messages.fetch()

  settings: ->
    console.log 'settings HomeController'
    $('.menu_settings').addClass('active');