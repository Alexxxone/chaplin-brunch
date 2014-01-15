mediator = require 'mediator'
utils = require 'lib/utils'

Controller = require 'controllers/base/controller'
MenuView = require 'views/home/menu-view'
Init = require 'models/init'
HomePageView = require 'views/home/home-page-view'

FriendsView = require 'views/friendships/friends-view'
MyFriendsView = require 'views/friendships/my_friends-view'
FriendView = require 'views/friendships/friend-view'
InvitesView = require 'views/friendships/invites-view'
MyInvitesView = require 'views/friendships/my_invites-view'





MyFriends = require 'models/friendships/my_friends'
Invitation = require 'models/friendships/invitations'
MyInvitation = require 'models/friendships/my_invitations'

Users = require 'models/users/users'
UsersView = require 'views/users/users-view'

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
    $('.left_menu li').removeClass('active')

    if  mediator.user
      console.log 'login'
    else
      utils.redirectTo url: '/login'

  index: ->
    @view = new HomePageView region: 'main'

  friends: ->
    friends = new MyFriends
    invitations = new Invitation
    my_invitations = new MyInvitation
    @view = new FriendsView region: 'main'
    @compose 'my_friends',MyFriendsView, region: 'my_friends',collection: friends
    @compose 'invites',InvitesView, region: 'invites', collection: invitations
    @compose 'my_invites',MyInvitesView, region: 'my_invites', collection: my_invitations

  show: (params)->
    console.log params.id
  users: ->
    users = new Users
    @view = new UsersView region: 'main', collection: users
  conversations: ->
    conversations = new Conversations
    @view = new HomeConversationsView region: 'main', collection: conversations
    conversations.fetch()

  conversation: (params) ->
    messages = new Messages( id: params.id )
    @view = new MessagesView region: 'main', collection: messages
  settings: ->
    $('.menu_settings').addClass('active');


