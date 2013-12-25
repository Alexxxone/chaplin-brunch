Controller = require 'controllers/base/controller'
HeaderView = require 'views/home/header-view'
HomePageView = require 'views/home/home-page-view'
HomeFriendsView = require 'views/home/home-friends-view'
HomeFriendView = require 'views/home/home-friend-view'
HomeUsersView = require 'views/home/home-users-view'
Friends = require 'models/friends'
Friend = require 'models/friend'
Users = require 'models/users'

module.exports = class HomeController extends Controller
  beforeAction: ->
    super
    @compose 'header', HeaderView, region: 'header'

  index: ->
    @view = new HomePageView region: 'main'

  friends: ->
    console.log 'friends HomeController'
    friends = new Friends
    @view = new HomeFriendsView region: 'main', collection: friends

#  show: ->
#    console.log 'show method in HomeController '
#    friend = new Friend
#    @view = new HomeFriendView region: 'main', model: friend
  users: ->
    console.log 'users HomeController'
    users = new Users
    @view = new HomeUsersView region: 'main', collection: users