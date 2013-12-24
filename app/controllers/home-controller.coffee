Controller = require 'controllers/base/controller'
HeaderView = require 'views/home/header-view'
HomePageView = require 'views/home/home-page-view'
HomeFriendsView = require 'views/home/home-friends-view'
Collection = require 'models/friends'
module.exports = class HomeController extends Controller
  beforeAction: ->
    super
    @compose 'header', HeaderView, region: 'header'

  index: ->
    @view = new HomePageView region: 'main'

  friends: ->
    friends = new Collection

    friends.fetch
    console.log(friends)
    @view = new HomeFriendsView region: 'main', collection: friends

