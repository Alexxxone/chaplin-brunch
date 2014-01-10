(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
var Application, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Application = (function(_super) {
  __extends(Application, _super);

  function Application() {
    _ref = Application.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return Application;

})(Chaplin.Application);
});

;require.register("controllers/base/controller", function(exports, require, module) {
var Controller, Init, SiteView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SiteView = require('views/site-view');

Init = require('models/init');

module.exports = Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    _ref = Controller.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Controller.prototype.beforeAction = function() {
    this.model = new Init;
    return this.compose('site', SiteView, {
      model: this.model
    });
  };

  return Controller;

})(Chaplin.Controller);
});

;require.register("controllers/home-controller", function(exports, require, module) {
var Controller, Conversation, Conversations, Friend, Friends, HomeController, HomeConversationView, HomeConversationsView, HomeFriendView, HomeFriendsView, HomePageView, HomeUsersView, Init, MenuView, Message, MessageView, Messages, MessagesView, Users, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

MenuView = require('views/home/menu-view');

Init = require('models/init');

HomePageView = require('views/home/home-page-view');

HomeFriendsView = require('views/home/home-friends-view');

HomeFriendView = require('views/home/home-friend-view');

HomeUsersView = require('views/home/home-users-view');

Friends = require('models/friends');

Friend = require('models/friend');

Users = require('models/users');

Conversation = require('models/conversation');

Conversations = require('models/conversations');

HomeConversationView = require('views/home/home-conversation-view');

HomeConversationsView = require('views/home/home-conversations-view');

Message = require('models/message');

Messages = require('models/messages');

MessageView = require('views/messages/message-view');

MessagesView = require('views/messages/messages-view');

module.exports = HomeController = (function(_super) {
  __extends(HomeController, _super);

  function HomeController() {
    _ref = HomeController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomeController.prototype.beforeAction = function() {
    HomeController.__super__.beforeAction.apply(this, arguments);
    this.compose('menu', MenuView, {
      region: 'menu'
    });
    return $('.left_menu li').removeClass('active');
  };

  HomeController.prototype.index = function() {
    return this.view = new HomePageView({
      region: 'main'
    });
  };

  HomeController.prototype.friends = function() {
    var friends;
    friends = new Friends;
    this.view = new HomeFriendsView({
      region: 'main',
      collection: friends
    });
    return friends.fetch();
  };

  HomeController.prototype.show = function(params) {
    return console.log(params.id);
  };

  HomeController.prototype.users = function() {
    var users;
    users = new Users;
    this.view = new HomeUsersView({
      region: 'main',
      collection: users
    });
    return users.fetch();
  };

  HomeController.prototype.conversations = function() {
    var conversations;
    conversations = new Conversations;
    this.view = new HomeConversationsView({
      region: 'main',
      collection: conversations
    });
    return conversations.fetch();
  };

  HomeController.prototype.conversation = function(params) {
    var messages;
    messages = new Messages({
      id: params.id
    });
    this.view = new MessagesView({
      region: 'main',
      collection: messages
    });
    return messages.fetch();
  };

  HomeController.prototype.settings = function() {
    console.log('settings HomeController');
    return $('.menu_settings').addClass('active');
  };

  return HomeController;

})(Controller);
});

;require.register("initialize", function(exports, require, module) {
var Application, routes;

Application = require('application');

routes = require('routes');

$(function() {
  return new Application({
    title: 'Chat',
    controllerSuffix: '-controller',
    routes: routes
  });
});
});

;require.register("lib/utils", function(exports, require, module) {
var utils;

utils = Chaplin.utils.beget(Chaplin.utils);

if (typeof Object.seal === "function") {
  Object.seal(utils);
}

module.exports = utils;
});

;require.register("lib/view-helper", function(exports, require, module) {
var register, utils,
  __slice = [].slice;

utils = require('./utils');

register = function(name, fn) {
  return Handlebars.registerHelper(name, fn);
};

register('with', function(context, options) {
  if (!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(context);
  }
});

register('without', function(context, options) {
  var inverse;
  inverse = options.inverse;
  options.inverse = options.fn;
  options.fn = inverse;
  return Handlebars.helpers["with"].call(this, context, options);
});

register('url', function() {
  var options, params, routeName, _i;
  routeName = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), options = arguments[_i++];
  return utils.reverse(routeName, params);
});
});

;require.register("mediator", function(exports, require, module) {
var mediator;

mediator = module.exports = Chaplin.mediator;
});

;require.register("models/base/collection", function(exports, require, module) {
var Collection, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./model');

module.exports = Collection = (function(_super) {
  __extends(Collection, _super);

  function Collection() {
    _ref = Collection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Collection.prototype.model = Model;

  return Collection;

})(Chaplin.Collection);
});

;require.register("models/base/model", function(exports, require, module) {
var Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    _ref = Model.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return Model;

})(Chaplin.Model);
});

;require.register("models/conversation", function(exports, require, module) {
var Conversation, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./base/model');

module.exports = Conversation = (function(_super) {
  __extends(Conversation, _super);

  function Conversation() {
    _ref = Conversation.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Conversation.prototype.urlRoot = "    http://alexxxxone-backend.herokuapp.com/conversations/:id.json";

  return Conversation;

})(Model);
});

;require.register("models/conversations", function(exports, require, module) {
var Collection, Conversations, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('./base/collection');

Model = require('./conversation');

module.exports = Conversations = (function(_super) {
  __extends(Conversations, _super);

  function Conversations() {
    _ref = Conversations.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Conversations.prototype.url = "http://alexxxxone-backend.herokuapp.com/conversations.json";

  return Conversations;

})(Collection);
});

;require.register("models/friend", function(exports, require, module) {
var Friend, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./base/model');

module.exports = Friend = (function(_super) {
  __extends(Friend, _super);

  function Friend() {
    _ref = Friend.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Friend.prototype.urlRoot = "/";

  return Friend;

})(Model);
});

;require.register("models/friends", function(exports, require, module) {
var Collection, Friends, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('./base/collection');

Model = require('./friend');

module.exports = Friends = (function(_super) {
  __extends(Friends, _super);

  function Friends() {
    _ref = Friends.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Friends.prototype.url = "http://alexxxxone-backend.herokuapp.com/friends.json";

  return Friends;

})(Collection);
});

;require.register("models/init", function(exports, require, module) {
var Init, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./base/model');

module.exports = Init = (function(_super) {
  __extends(Init, _super);

  function Init() {
    _ref = Init.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Init.prototype.url = "http://alexxxxone-backend.herokuapp.com/init.json";

  return Init;

})(Model);
});

;require.register("models/message", function(exports, require, module) {
var Message, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./base/model');

module.exports = Message = (function(_super) {
  __extends(Message, _super);

  function Message() {
    _ref = Message.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Message.prototype.urlRoot = "http://alexxxxone-backend.herokuapp.com/messages/";

  return Message;

})(Model);
});

;require.register("models/messages", function(exports, require, module) {
var Collection, Messages, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('./base/collection');

Model = require('./message');

module.exports = Messages = (function(_super) {
  __extends(Messages, _super);

  function Messages() {
    _ref = Messages.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Messages.prototype.url = "http://alexxxxone-backend.herokuapp.com/messages.json";

  Messages.prototype.initialize = function(option) {
    this.url = "http://alexxxxone-backend.herokuapp.com/messages.json?id=" + option.id;
    return Messages.__super__.initialize.apply(this, arguments);
  };

  Messages.prototype.model = Model;

  return Messages;

})(Collection);
});

;require.register("models/user", function(exports, require, module) {
var Model, User, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./base/model');

module.exports = User = (function(_super) {
  __extends(User, _super);

  function User() {
    _ref = User.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  User.prototype.urlRoot = "/";

  return User;

})(Model);
});

;require.register("models/users", function(exports, require, module) {
var Collection, Model, Users, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('./base/collection');

Model = require('./user');

module.exports = Users = (function(_super) {
  __extends(Users, _super);

  function Users() {
    _ref = Users.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Users.prototype.url = "http://alexxxxone-backend.herokuapp.com/users.json";

  return Users;

})(Collection);
});

;require.register("routes", function(exports, require, module) {
module.exports = function(match) {
  match('', 'home#index');
  match('friends', 'home#friends');
  match('friends/:id', 'home#show');
  match('users', 'home#users');
  match('settings', 'home#settings');
  match('conversations', 'home#conversations');
  match('conversation/:id', 'home#conversation');
  return {
    urlPath: function() {
      return "friends/" + (this.get('id')) + "    /friends/    /users/    /settings/    /conversations/    /conversation/:id/    /messages/destroy/:id/    //";
    }
  };
};
});

;require.register("views/base/collection-view", function(exports, require, module) {
var CollectionView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

module.exports = CollectionView = (function(_super) {
  __extends(CollectionView, _super);

  function CollectionView() {
    _ref = CollectionView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

  return CollectionView;

})(Chaplin.CollectionView);
});

;require.register("views/base/view", function(exports, require, module) {
var View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('lib/view-helper');

module.exports = View = (function(_super) {
  __extends(View, _super);

  function View() {
    _ref = View.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  View.prototype.optionNames = Chaplin.View.prototype.optionNames.concat(['template']);

  View.prototype.getTemplateFunction = function() {
    return this.template;
  };

  return View;

})(Chaplin.View);
});

;require.register("views/chat-view", function(exports, require, module) {
var ChatView, Message, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

Message = require('models/conversation');

module.exports = ChatView = (function(_super) {
  __extends(ChatView, _super);

  function ChatView() {
    _ref = ChatView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ChatView.prototype.container = '.main_chat';

  ChatView.prototype.autoRender = false;

  ChatView.prototype.template = require('./templates/chat');

  ChatView.prototype.initialize = function() {
    this.render();
    $(".chat_container").containerize();
    return this.delegate("click", ".send_message", this.send_message);
  };

  ChatView.prototype.send_message = function() {};

  return ChatView;

})(View);
});

;require.register("views/home/home-conversation-view", function(exports, require, module) {
var Chat, CoversationView, View, utils, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

Chat = require('views/chat-view');

utils = require('lib/utils');

module.exports = CoversationView = (function(_super) {
  __extends(CoversationView, _super);

  function CoversationView() {
    _ref = CoversationView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  CoversationView.prototype.autoRender = true;

  CoversationView.prototype.template = require('./templates/conversation');

  CoversationView.prototype.initialize = function() {
    CoversationView.__super__.initialize.apply(this, arguments);
    this.model.set({
      created_at: moment(this.model.get('created_at')).fromNow()
    });
    this.delegate('click', '.start_chat', this.start_chat);
    return this.delegate('click', '.each_friend_in_list', this.open_conversation);
  };

  CoversationView.prototype.start_chat = function() {
    return new Chat({
      params: this.model.get('user').id
    });
  };

  CoversationView.prototype.open_conversation = function() {
    return utils.redirectTo({
      url: '/conversation/' + this.model.get('id')
    });
  };

  return CoversationView;

})(View);
});

;require.register("views/home/home-conversations-view", function(exports, require, module) {
var CollectionView, HomeConversationsView, View, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

View = require('views/home/home-conversation-view');

template = require('./templates/conversations');

module.exports = HomeConversationsView = (function(_super) {
  __extends(HomeConversationsView, _super);

  function HomeConversationsView() {
    _ref = HomeConversationsView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomeConversationsView.prototype.itemView = View;

  HomeConversationsView.prototype.container = '#container';

  HomeConversationsView.prototype.autoRender = true;

  HomeConversationsView.prototype.className = 'messages-page';

  HomeConversationsView.prototype.containerMethod = 'html';

  HomeConversationsView.prototype.template = template;

  HomeConversationsView.prototype.listSelector = '#messages_content';

  HomeConversationsView.prototype.initialize = function() {
    HomeConversationsView.__super__.initialize.apply(this, arguments);
    console.log(this.collection);
    return $('.menu_conversations').addClass('active');
  };

  return HomeConversationsView;

})(CollectionView);
});

;require.register("views/home/home-friend-view", function(exports, require, module) {
var Chat, FriendView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

Chat = require('views/chat-view');

module.exports = FriendView = (function(_super) {
  __extends(FriendView, _super);

  function FriendView() {
    _ref = FriendView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  FriendView.prototype.autoRender = true;

  FriendView.prototype.template = require('./templates/friend');

  FriendView.prototype.chat = require('views/templates/chat');

  FriendView.prototype.initialize = function() {
    FriendView.__super__.initialize.apply(this, arguments);
    this.delegate("click", ".start_chat", this.start_chat);
    return this.delegate('click', '.friend_image', this.info);
  };

  FriendView.prototype.start_chat = function() {
    return new Chat({
      model: this.model
    });
  };

  FriendView.prototype.info = function() {
    console.log(this.model.get('email'));
    return this.el.append(_template('#user_info_panel').render().el);
  };

  return FriendView;

})(View);
});

;require.register("views/home/home-friends-view", function(exports, require, module) {
var CollectionView, HomeFriendsView, View, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

View = require('views/home/home-friend-view');

template = require('./templates/friends');

module.exports = HomeFriendsView = (function(_super) {
  __extends(HomeFriendsView, _super);

  function HomeFriendsView() {
    _ref = HomeFriendsView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomeFriendsView.prototype.itemView = View;

  HomeFriendsView.prototype.container = '#container';

  HomeFriendsView.prototype.autoRender = true;

  HomeFriendsView.prototype.containerMethod = 'html';

  HomeFriendsView.prototype.className = 'friends-page';

  HomeFriendsView.prototype.template = template;

  HomeFriendsView.prototype.listSelector = '#index_content';

  HomeFriendsView.prototype.initialize = function() {
    HomeFriendsView.__super__.initialize.apply(this, arguments);
    return $('.menu_friends').addClass('active');
  };

  return HomeFriendsView;

})(CollectionView);
});

;require.register("views/home/home-page-view", function(exports, require, module) {
var HomePageView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = HomePageView = (function(_super) {
  __extends(HomePageView, _super);

  function HomePageView() {
    _ref = HomePageView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomePageView.prototype.autoRender = true;

  HomePageView.prototype.className = 'home-page';

  HomePageView.prototype.template = require('./templates/home');

  HomePageView.prototype.initialize = function() {
    return $('.menu_main_page').addClass('active');
  };

  return HomePageView;

})(View);
});

;require.register("views/home/home-users-view", function(exports, require, module) {
var CollectionView, HomeUsersView, View, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

View = require('views/home/home-friend-view');

template = require('./templates/friends');

module.exports = HomeUsersView = (function(_super) {
  __extends(HomeUsersView, _super);

  function HomeUsersView() {
    _ref = HomeUsersView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomeUsersView.prototype.itemView = View;

  HomeUsersView.prototype.container = '#container';

  HomeUsersView.prototype.autoRender = true;

  HomeUsersView.prototype.containerMethod = 'html';

  HomeUsersView.prototype.className = 'friends-page';

  HomeUsersView.prototype.template = template;

  HomeUsersView.prototype.listSelector = '#index_content';

  HomeUsersView.prototype.initialize = function() {
    HomeUsersView.__super__.initialize.apply(this, arguments);
    return $('.menu_users').addClass('active');
  };

  return HomeUsersView;

})(CollectionView);
});

;require.register("views/home/menu-view", function(exports, require, module) {
var MenuView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = MenuView = (function(_super) {
  __extends(MenuView, _super);

  function MenuView() {
    _ref = MenuView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  MenuView.prototype.autoRender = true;

  MenuView.prototype.template = require('./templates/menu');

  return MenuView;

})(View);
});

;require.register("views/home/templates/conversation", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\n    <li class=\"each_friend_in_list\">\n";
  }

function program3(depth0,data) {
  
  
  return "\n    <li class=\"each_friend_in_list not_readed\">\n";
  }

  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.last_message)),stack1 == null || stack1 === false ? stack1 : stack1.readed), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    <div class=\"messages_image\" >\n        <img src=\"images/deactivated_100.gif\" alt=\"image\"/>\n    </div>\n    <div class=\"friend_info\" >\n        <blockquote >\n            <p>";
  if (stack2 = helpers.body) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.body); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "</p>\n            <small class=\"created_at\">";
  if (stack2 = helpers.created_at) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.created_at); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + ", By "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.last_message)),stack1 == null || stack1 === false ? stack1 : stack1.user)),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</small>\n            <small><cite title=\"Source Title\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.last_message)),stack1 == null || stack1 === false ? stack1 : stack1.body)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</cite></small>\n        </blockquote>\n    </div>\n    <div class=\"friend_actions\">\n        <p><a href=\"javascript:;\" class=\"start_chat\">Start Chat</a></p>\n    </div>\n</li>\n\n\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/conversations", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h4>Conversations</h4>\n<ul id='messages_content'  class=\"friends_list\">\n</ul>\n\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/friend", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"each_friend_in_list\">\n    <div class=\"friend_image\">\n        <img src=\"images/deactivated_100.gif\" alt=\"image\"/>\n    </div>\n    <div class=\"friend_info\">\n        <p> ";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.username); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n        <p> ";
  if (stack1 = helpers.email) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.email); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n    </div>\n    <div class=\"friend_actions\">\n\n        <p> <a href=\"javascript:;\" >Write message</a></p>\n        <p> <a href=\"javascript:;\" >Look at friends</a></p>\n        <p><a href=\"javascript:;\" >Remove from friends</a></p>\n        <p><a href=\"javascript:;\" class=\"start_chat\">Start Chat</a></p>\n\n    </div>\n</li>\n<script type=\"text/x-handlebars-template\" id=\"user_info_panel\">\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            ";
  if (stack1 = helpers.email) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.email); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n        </div>\n    </div>\n</script>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/friends", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h4>You have "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.collection)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " friend('s)</h4>\n<ul id='index_content'  class=\"friends_list\">\n</ul>\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/header", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/home", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<img src=\"images/user.png\" alt=\"image\"/>\n<h1>WALL</h1>\n\n<div class=\"wall_scroll\" style=\"color:black;\">\n    <div class=\"wall_message\">\n        <p>Big news</p>\n        <p>oifdgodihsfoigsdfoigdknfgodn\n            odfmphgdf\n            psmdfgpod\n            oifdgodihsfoigsdfoig\n        </p>\n    </div>\n    <div class=\"wall_message\">\n        <p>Big news</p>\n        <p>oifdgodihsfoigsdfoigdknfgodn\n            odfmphgdf\n            psmdfgpod\n            oifdgodihsfoigsdfoig\n        </p>\n    </div>\n    <div class=\"wall_message\">\n        <p>Big news</p>\n        <p>oifdgodihsfoigsdfoigdknfgodn\n            odfmphgdf\n            psmdfgpod\n            oifdgodihsfoigsdfoig\n        </p>\n    </div>\n</div>\n\n\n<script type=\"text/javascript\">\n    $(\".wall_scroll\").slimScroll({\n    height: \"450px\",\n    color: '#008cba'\n    })\n</script>";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/menu", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!--<div class='col-md-3'>-->\n    <!--<ul class=\"nav nav-pills nav-stacked left_menu\">-->\n        <!--<li class=\"menu_main_page\"><a href=\"javascript:;\"><i class=\"fa fa-home fa-fw\"></i> My page</a></li>-->\n        <!--<li class=\"menu_friends\"><a href=\"javascript:;\"><i class=\"fa fa-user fa-fw\"></i> Fiends<span class=\"badge pull-right new_friend_badge\">";
  if (stack1 = helpers.invitations) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.invitations); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></a></li>-->\n        <!--<li class=\"menu_messages\"><a href=\"javascript:;\"><i class=\"fa fa-envelope-o fa-fw\"></i>Messages<span class=\"badge pull-right new_messages_badge\">";
  if (stack1 = helpers.messages) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.messages); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></a>-->\n        <!--<li class=\"menu_users\"><a href=\"javascript:;\"><i class=\"fa fa-user fa-fw\"></i> All People</a></li></li>-->\n        <!--<li class=\"menu_settings\"><a href=\"javascript:;\"><i class=\"fa fa-cogs fa-fw\"></i> Settings</a></li>-->\n    <!--</ul>-->\n<!--</div>-->\n\n\n<!--<script type=\"text/javascript\">-->\n    <!--var elem = $('.left_menu');-->\n    <!--var elem_heigth = elem.offset().top+ elem.height() ;-->\n    <!--var arrow = $(\".arrow_up\");-->\n    <!--$(document).on('scroll', function(){-->\n        <!--if(window.pageYOffset > elem_heigth ){-->\n            <!--if(arrow.is( \":hidden\" )){-->\n                <!--arrow.clearQueue();-->\n                <!--arrow.stop();-->\n                <!--arrow.css('display','block');-->\n                <!--arrow.css('left','0');-->\n                <!--arrow.animate({-->\n                    <!--opacity: 1,-->\n                    <!--left: \"+=50\"-->\n                <!--}, 200);-->\n            <!--}-->\n        <!--}else{-->\n            <!--if(arrow.is( \":visible\" )){-->\n                <!--arrow.clearQueue();-->\n                <!--arrow.stop();-->\n                <!--arrow.css('left','0');-->\n                <!--arrow.animate({-->\n                    <!--opacity: 0.25,-->\n                    <!--left: \"-=50\"-->\n\n                <!--}, 200,function(){-->\n                    <!--arrow.css('display','none');-->\n                <!--});-->\n            <!--}-->\n        <!--}-->\n    <!--})-->\n\n<!--</script>-->";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/messages/message-view", function(exports, require, module) {
var MessageView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = MessageView = (function(_super) {
  __extends(MessageView, _super);

  function MessageView() {
    _ref = MessageView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  MessageView.prototype.autoRender = true;

  MessageView.prototype.template = require('./templates/message');

  MessageView.prototype.initialize = function() {
    MessageView.__super__.initialize.apply(this, arguments);
    this.model.set({
      created_at: moment(this.model.get('created_at')).fromNow()
    });
    this.delegate('click', '.start_chat', this.start_chat);
    this.delegate('click', '.each_friend_in_list', this.mark_message);
    this.delegate('click', '.remove_message', this.remove_message);
    return this.scroll_to_bottom();
  };

  MessageView.prototype.start_chat = function() {
    return new Chat({
      params: this.model.get('user').id
    });
  };

  MessageView.prototype.mark_message = function() {
    $(this.el).toggleClass('marked_message');
    return $(this.el).find('.remove_message').fadeToggle();
  };

  MessageView.prototype.remove_message = function() {
    return this.model.destroy();
  };

  MessageView.prototype.scroll_to_bottom = function() {
    var scrollTo_val;
    scrollTo_val = $('#messages_content>div:first').height() * $('#messages_content > div').length + 'px';
    return $('#messages_content').slimScroll({
      scrollTo: scrollTo_val
    });
  };

  return MessageView;

})(View);
});

;require.register("views/messages/messages-view", function(exports, require, module) {
var CollectionView, MessagesView, View, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

View = require('views/messages/message-view');

template = require('./templates/messages');

module.exports = MessagesView = (function(_super) {
  __extends(MessagesView, _super);

  function MessagesView() {
    _ref = MessagesView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  MessagesView.prototype.itemView = View;

  MessagesView.prototype.container = '#container';

  MessagesView.prototype.autoRender = false;

  MessagesView.prototype.className = 'messages-page';

  MessagesView.prototype.containerMethod = 'html';

  MessagesView.prototype.animationDuration = 1000;

  MessagesView.prototype.template = template;

  MessagesView.prototype.listSelector = '#messages_content';

  MessagesView.prototype.loadingSelector = ".loading";

  MessagesView.prototype.initialize = function() {
    MessagesView.__super__.initialize.apply(this, arguments);
    $('.menu_conversations').addClass('active');
    this.delegate('click', '.send_message', this.send_message);
    this.scroll_to_bottom();
    this.listenTo(this.collection, 'push remove', this.render);
    return console.log(this.collection.models);
  };

  MessagesView.prototype.send_message = function() {
    var input;
    input = $(this.el).find('.message_body');
    if (input.val().length > 2) {
      this.collection.push({
        sender_id: 1,
        user: {
          username: 'Alex0-test'
        },
        body: input.val(),
        receiver_id: 4,
        conversation_id: 3
      });
      input.val('');
      return this.scroll_to_bottom();
    }
  };

  MessagesView.prototype.scroll_to_bottom = function() {
    var scrollTo_val;
    scrollTo_val = $('#messages_content').prop('scrollHeight') + 'px';
    return $('#messages_content').slimScroll({
      scrollTo: scrollTo_val
    });
  };

  return MessagesView;

})(CollectionView);
});

;require.register("views/messages/templates/message", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"each_friend_in_list\">\n    <div class=\"messages_image\" >\n        <img src=\"/images/deactivated_100.gif\" alt=\"image\" height=\"50\" width=\"50\"/>\n    </div>\n    <div class=\"friend_info\" >\n\n            <p>";
  if (stack1 = helpers.body) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.body); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n            <small class=\"created_at text-muted\">";
  if (stack1 = helpers.created_at) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.created_at); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + ", By "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</small>\n            <small><cite title=\"Source Title\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.messages)),stack1 == null || stack1 === false ? stack1 : stack1.body)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</cite></small>\n\n    </div>\n    <div class=\"friend_actions\">\n        <button type=\"button\" class=\"close remove_message pull-right\" aria-hidden=\"true\">&times;</button>\n    </div>\n\n</li>\n\n\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/messages/templates/messages", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h4>Messages</h4>\n<div class=\"loading\"><div id=\"canvasloader-container\" class=\"wrapper\"></div></div>\n<ul id='messages_content'  class=\"friends_list\">\n</ul>\n\n<div class=\"input-group\">\n    <span class=\"input-group-addon\">:)</span>\n    <input type=\"text\" class=\"form-control message_body\">\n    <span class=\"input-group-btn\">\n      <button class=\"btn btn-primary send_message\" type=\"button\">Send</button>\n    </span>\n</div>\n\n\n\n\n<script type=\"text/javascript\">\n    var cl = new CanvasLoader('canvasloader-container');\n    cl.setColor('#008cba'); // default is '#000000'\n    cl.setShape('spiral'); // default is 'oval'\n    cl.setDiameter(71); // default is 40\n    cl.setDensity(90); // default is 40\n    cl.setRange(0.8); // default is 1.3\n    cl.setFPS(51); // default is 24\n    cl.show(); // Hidden by default\n\n    // This bit is only for positioning - not necessary\n    var loaderObj = document.getElementById(\"canvasLoader\");\n    loaderObj.style.position = \"absolute\";\n    loaderObj.style[\"top\"] = cl.getDiameter() * -0.5 + \"px\";\n    loaderObj.style[\"left\"] = cl.getDiameter() * -0.5 + \"px\";\n\n    $('#messages_content').slimScroll({\n        width: 'auto',\n        height: '745px',\n        size: '10px',\n        position: 'right',\n        color: '#008cba',\n        wheelStep: 10,\n        allowPageScroll: false,\n        disableFadeOut: false\n    });\n</script>\n\n\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/site-view", function(exports, require, module) {
var SiteView, View, utils, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

utils = require('lib/utils');

module.exports = SiteView = (function(_super) {
  __extends(SiteView, _super);

  function SiteView() {
    _ref = SiteView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  SiteView.prototype.container = 'body';

  SiteView.prototype.id = 'site-container';

  SiteView.prototype.autoRender = true;

  SiteView.prototype.regions = {
    menu: '#menu-container',
    main: '#page-container'
  };

  SiteView.prototype.template = require('./templates/site');

  SiteView.prototype.initialize = function() {
    this.model.fetch({
      success: function(res) {
        if (res.get('invitations') > 0) {
          $('.new_friend_badge').text(res.get('invitations'));
        }
        if (res.get('messages') > 0) {
          return $('.new_messages_badge').text(res.get('messages'));
        }
      }
    });
    this.delegate('click', '.menu_main_page', this.home);
    this.delegate('click', '.menu_friends', this.friends);
    this.delegate('click', '.menu_users', this.users);
    this.delegate('click', '.menu_settings', this.settings);
    return this.delegate('click', '.menu_conversations', this.conversations);
  };

  SiteView.prototype.home = function() {
    return utils.redirectTo({
      url: '/'
    });
  };

  SiteView.prototype.friends = function() {
    return utils.redirectTo({
      url: '/friends'
    });
  };

  SiteView.prototype.users = function() {
    return utils.redirectTo({
      url: '/users'
    });
  };

  SiteView.prototype.settings = function() {
    return utils.redirectTo({
      url: '/settings'
    });
  };

  SiteView.prototype.conversations = function() {
    return utils.redirectTo({
      url: '/conversations'
    });
  };

  return SiteView;

})(View);
});

;require.register("views/templates/chat", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"cont2\" class=\"chat_container mbc_container draggable resizable ui-draggable ui-resizable\"\n     style=\"width:450px; height: auto; opacity: 1; position: absolute; visibility: visible; z-index: 92;\"\n     data-centeronwindow=\"true\" data-icon=\"/images/icons/header_chat.png\" data-drag=\"true\" data-resize=\"true\"\n     data-collapsable=\"true\" data-containment=\"document\" data-resizegrid=\"100,100\"\n     data-buttons=\"changecontent,dock,fullscreen,close\" t=\"141\" l=\"239.203125\">\n    <div class=\"mbc_header\">\n        <div class=\"mbc_title\"><h2 style=\"padding-left: 45px;\"><img src=\"images/icons/header_chat.png\" class=\"icon\">Container\n            2</h2></div>\n    </div>\n    <div class=\"mbc_content\" style=\"height: 266px; margin-top: 64px;\">\n\n\n        <br/>\n        <br/>\n        <br/>\n        <p>name - ";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.username); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n        ";
  if (stack1 = helpers.email) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.email); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n        ";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.id); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n\n        <table class=\"table table-hover table-striped\">\n            <thead>\n            <tr>\n                <th>asd</th>\n                <th>asd</th>\n                <th>asd</th>\n            </tr>\n            </thead>\n            <tbody class=\"message_list\">\n            <tr>\n                <td>asdasd</td>\n                <td>asdasd</td>\n                <td>asdasd</td>\n            </tr>\n            </tbody>\n        </table>\n        <div class=\"col-lg-12 \">\n            <div class=\"input-group\">\n                <input type=\"text\" class=\"form-control message_text\">\n                    <span class=\"input-group-btn\">\n                      <button class=\"btn btn-info send_message\" type=\"button\">Send</button>\n                    </span>\n            </div>\n        </div>\n\n\n    </div>\n</div>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/site", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"navbar navbar-default navbar-fixed-top navbar-collapse collapse navbar-inverse-collapse\">\n    <div class=\"container\">\n        <div class=\"navbar-header\">\n            <a href=\"../\" class=\"navbar-brand\">Bootswatch</a>\n            <button class=\"navbar-toggle\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar-main\">\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n        </div>\n        <div class=\"navbar-collapse collapse\" id=\"navbar-main\">\n            <ul class=\"nav navbar-nav\">\n                <li class=\"dropdown\">\n                    <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" id=\"themes\">Themes <span class=\"caret\"></span></a>\n                    <ul class=\"dropdown-menu\" aria-labelledby=\"themes\">\n                        <li><a tabindex=\"-1\" href=\"../default/\">Default</a></li>\n                        <li class=\"divider\"></li>\n                        <li><a tabindex=\"-1\" href=\"../amelia/\">Amelia</a></li>\n                        <li><a tabindex=\"-1\" href=\"../cerulean/\">Cerulean</a></li>\n                        <li><a tabindex=\"-1\" href=\"../cosmo/\">Cosmo</a></li>\n                        <li><a tabindex=\"-1\" href=\"../cyborg/\">Cyborg</a></li>\n                        <li><a tabindex=\"-1\" href=\"../flatly/\">Flatly</a></li>\n                        <li><a tabindex=\"-1\" href=\"../journal/\">Journal</a></li>\n                        <li><a tabindex=\"-1\" href=\"../readable/\">Readable</a></li>\n                        <li><a tabindex=\"-1\" href=\"../simplex/\">Simplex</a></li>\n                        <li><a tabindex=\"-1\" href=\"../slate/\">Slate</a></li>\n                        <li><a tabindex=\"-1\" href=\"../spacelab/\">Spacelab</a></li>\n                        <li><a tabindex=\"-1\" href=\"../united/\">United</a></li>\n                        <li><a tabindex=\"-1\" href=\"../yeti/\">Yeti</a></li>\n                    </ul>\n                </li>\n                <li>\n                    <a href=\"../help/\">Help</a>\n                </li>\n                <li>\n                    <a href=\"http://news.bootswatch.com\">Blog</a>\n                </li>\n                <li class=\"dropdown\">\n                    <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" id=\"download\">Download <span class=\"caret\"></span></a>\n                    <ul class=\"dropdown-menu\" aria-labelledby=\"download\">\n                        <li><a tabindex=\"-1\" href=\"./bootstrap.min.css\">bootstrap.min.css</a></li>\n                        <li><a tabindex=\"-1\" href=\"./bootstrap.css\">bootstrap.css</a></li>\n                        <li class=\"divider\"></li>\n                        <li><a tabindex=\"-1\" href=\"./variables.less\">variables.less</a></li>\n                        <li><a tabindex=\"-1\" href=\"./bootswatch.less\">bootswatch.less</a></li>\n                    </ul>\n                </li>\n            </ul>\n\n            <ul class=\"nav navbar-nav navbar-right\">\n                <li><a href=\"http://builtwithbootstrap.com/\" target=\"_blank\">Built With Bootstrap</a></li>\n                <li><a href=\"https://wrapbootstrap.com/?ref=bsw\" target=\"_blank\">WrapBootstrap</a></li>\n            </ul>\n\n        </div>\n    </div>\n</div>\n\n<div class=\"main_site\">\n    <div class=\"header-container\" id=\"menu-container\"></div>\n    <div class=\"main_chat\"></div>\n    <div class=\"row\">\n        <div class='col-md-3'>\n                <ul class=\"nav nav-pills nav-stacked left_menu\">\n                    <li class=\"menu_main_page\"><a href=\"javascript:;\"><i class=\"fa fa-home fa-fw\"></i> My page</a></li>\n                    <li class=\"menu_friends\"><a href=\"javascript:;\"><i class=\"fa fa-user fa-fw\"></i> Fiends<span class=\"badge pull-right new_friend_badge\">";
  if (stack1 = helpers.invitations) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.invitations); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></a></li>\n                    <li class=\"menu_conversations\"><a href=\"javascript:;\"><i class=\"fa fa-envelope-o fa-fw\"></i>Messages<span class=\"badge pull-right new_messages_badge\">";
  if (stack1 = helpers.messages) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.messages); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></a>\n                    <li class=\"menu_users\"><a href=\"javascript:;\"><i class=\"fa fa-user fa-fw\"></i> All People</a></li></li>\n                    <li class=\"menu_settings\"><a href=\"javascript:;\"><i class=\"fa fa-cogs fa-fw\"></i> Settings</a></li>\n                </ul>\n        </div>\n\n        <div class=\"\" >\n          <div class='col-md-6'  id=\"page-container\">\n          </div>\n        </div>\n        <div class=\"col-md-2\">\n\n            <div class=\"panel panel-primary\">\n                <div class=\"panel-heading\">News</div>\n                <div class=\"panel-body\">\n                    <img src=\"http://asset2.cbsistatic.com/cnwk.1d/i/tim/2010/09/28/0927LazaridisPlayBook_270x203.jpg\" alt=\"news\" class=\"img-thumbnail\" >\n                    Mike Lazaridis, a BlackBerry co-founder and former co-CEO, has officially ditched his plans to acquire the company through a joint bid with a fellow co-founder.\n                    In dissolving the plan, Lazaridis' stake in the sagging company is now 4.99 percent.\n                    Lazaridis made his decision public in a Securities and Exchange Commission filing on Tuesday. Under the now-defunct plan, which was announced in October, Lazaridis and fellow co-founder Douglas Fregin had combined stakes to reach 8 percent total ownership and said they were considering a purchase of the company. Last month, however, BlackBerry took itself off the market, and new management is trying to turn the company around.\n                </div>\n            </div>\n            <div class=\"panel panel-default\">\n                <div class=\"panel-body\">\n                    Panel content\n                </div>\n                <div class=\"panel-footer\">Panel footer</div>\n            </div>\n        </div>\n        <a href=\"#top\" class=\"arrow_up\"><i class=\"fa fa-chevron-up fa-3x\"></i></a>\n    </div>\n</div>\n\n<script type=\"text/javascript\">\n    var elem = $('.left_menu');\n    var elem_heigth = elem.offset().top+ elem.height() ;\n    var arrow = $(\".arrow_up\");\n    $(document).on('scroll', function(){\n       if(window.pageYOffset > elem_heigth ){\n           if(arrow.is( \":hidden\" )){\n             arrow.clearQueue();\n             arrow.stop();\n             arrow.css('display','block');\n             arrow.css('left','0');\n             arrow.animate({\n                   opacity: 1,\n                   left: \"+=50\"\n               }, 200);\n           }\n       }else{\n           if(arrow.is( \":visible\" )){\n               arrow.clearQueue();\n               arrow.stop();\n               arrow.css('left','0');\n               arrow.animate({\n                   opacity: 0.25,\n                   left: \"-=50\"\n\n               }, 200,function(){\n                   arrow.css('display','none');\n               });\n           }\n       }\n    })\n\n</script>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=app.js.map