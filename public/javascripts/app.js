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
var Application, mediator, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

mediator = require('mediator');

module.exports = Application = (function(_super) {
  __extends(Application, _super);

  function Application() {
    _ref = Application.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Application.prototype.initMediator = function() {
    if ($.cookie('id') !== void 0) {
      mediator.login({
        id: $.cookie('id'),
        username: $.cookie('username')
      });
    } else {
      mediator.login({
        id: 0,
        username: 'New'
      });
    }
    if ($.cookie('receiver_id') !== void 0) {
      mediator.receiver($.cookie('receiver_id'));
      mediator.conversation($.cookie('conversation_id'));
    }
    return Application.__super__.initMediator.apply(this, arguments);
  };

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
var Controller, Conversation, Conversations, FriendView, FriendsView, HomeController, HomeConversationView, HomeConversationsView, HomePageView, Init, Invitation, InvitesView, MenuView, Message, MessageView, Messages, MessagesView, MyFriends, MyFriendsView, MyInvitation, MyInvitesView, Users, UsersView, mediator, utils, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

mediator = require('mediator');

utils = require('lib/utils');

Controller = require('controllers/base/controller');

MenuView = require('views/home/menu-view');

Init = require('models/init');

HomePageView = require('views/home/home-page-view');

FriendsView = require('views/friendships/friends-view');

MyFriendsView = require('views/friendships/my_friends-view');

FriendView = require('views/friendships/friend-view');

InvitesView = require('views/friendships/invites-view');

MyInvitesView = require('views/friendships/my_invites-view');

MyFriends = require('models/friendships/my_friends');

Invitation = require('models/friendships/invitations');

MyInvitation = require('models/friendships/my_invitations');

Users = require('models/users/users');

UsersView = require('views/users/users-view');

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
    $('.left_menu li').removeClass('active');
    if (mediator.user) {
      return console.log('login');
    } else {
      return utils.redirectTo({
        url: '/login'
      });
    }
  };

  HomeController.prototype.index = function() {
    return this.view = new HomePageView({
      region: 'main'
    });
  };

  HomeController.prototype.friends = function() {
    var friends, invitations, my_invitations;
    friends = new MyFriends;
    invitations = new Invitation;
    my_invitations = new MyInvitation;
    this.view = new FriendsView({
      region: 'main'
    });
    this.compose('my_friends', MyFriendsView, {
      region: 'my_friends',
      collection: friends
    });
    this.compose('invites', InvitesView, {
      region: 'invites',
      collection: invitations
    });
    return this.compose('my_invites', MyInvitesView, {
      region: 'my_invites',
      collection: my_invitations
    });
  };

  HomeController.prototype.show = function(params) {
    return console.log(params.id);
  };

  HomeController.prototype.users = function() {
    var users;
    users = new Users;
    return this.view = new UsersView({
      region: 'main',
      collection: users
    });
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
    return this.view = new MessagesView({
      region: 'main',
      collection: messages
    });
  };

  HomeController.prototype.settings = function() {
    return $('.menu_settings').addClass('active');
  };

  return HomeController;

})(Controller);
});

;require.register("controllers/login_reg-controller", function(exports, require, module) {
var Controller, LoginRegController, LoginView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

LoginView = require('views/login-view');

module.exports = LoginRegController = (function(_super) {
  __extends(LoginRegController, _super);

  function LoginRegController() {
    _ref = LoginRegController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LoginRegController.prototype.login = function() {
    return this.view = new LoginView;
  };

  LoginRegController.prototype.registration = function() {};

  return LoginRegController;

})(Controller);
});

;require.register("controllers/settings-controller", function(exports, require, module) {
var Controller, SettingsController, SettingsPageView, mediator, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

SettingsPageView = require('views/settings-page-view');

mediator = require('mediator');

module.exports = SettingsController = (function(_super) {
  __extends(SettingsController, _super);

  function SettingsController() {
    this._show = __bind(this._show, this);
    _ref = SettingsController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  SettingsController.prototype._show = function() {
    return this.view = new SettingsPageView({
      model: mediator.user
    });
  };

  SettingsController.prototype.show = function() {
    if (mediator.user != null) {
      return this._show();
    } else {
      return this.subscribeEvent('login', this._show);
    }
  };

  return SettingsController;

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
var mediator, register, utils,
  __slice = [].slice;

utils = require('./utils');

mediator = require('mediator');

register = function(name, fn) {
  return Handlebars.registerHelper(name, fn);
};

Handlebars.registerHelper('ifLoggedIn', function(options) {
  var method;
  method = mediator.user ? options.fn : options.inverse;
  return method(this);
});

Handlebars.registerHelper('user_name', function(options) {
  return mediator.user.get('username');
});

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
var CurrentUser, mediator, utils;

mediator = module.exports = Chaplin.mediator;

CurrentUser = require('models/users/current-user');

utils = require('lib/utils');

mediator.createUser = function(params) {
  return console.log('register new user');
};

mediator.logout = function() {
  console.log('logout');
  mediator.user.dispose();
  mediator.user = null;
  mediator.receiver_id = null;
  mediator.conversation_id = null;
  $.removeCookie('id');
  $.removeCookie('username');
  $.removeCookie('friend_id');
  $.removeCookie('conversation_id');
  mediator.publish('logout');
  return utils.redirectTo({
    url: '/login'
  });
};

mediator.login = function(params) {
  mediator.user = new CurrentUser({
    id: params.id,
    username: params.username
  });
  $.cookie('id', params.id, {
    expires: 1
  });
  $.cookie('username', params.username, {
    expires: 1
  });
  return utils.redirectTo({
    url: '/'
  });
};

mediator.receiver = function(receiver_id) {
  mediator.receiver_id = receiver_id;
  return $.cookie('receiver_id', receiver_id, {
    expires: 1
  });
};

mediator.conversation = function(conversation_id) {
  mediator.conversation_id = conversation_id;
  return $.cookie('conversation_id', conversation_id, {
    expires: 1
  });
};
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

  Conversation.prototype.urlRoot = "http://localhost:3000/conversations/:id.json";

  return Conversation;

})(Model);
});

;require.register("models/conversations", function(exports, require, module) {
var Collection, Conversations, Model, mediator, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('./base/collection');

Model = require('./conversation');

mediator = require('mediator');

module.exports = Conversations = (function(_super) {
  __extends(Conversations, _super);

  function Conversations() {
    _ref = Conversations.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Conversations.prototype.url = "http://alexxxxone-backend.herokuapp.com/conversations.json?user_id=" + mediator.user.id;

  return Conversations;

})(Collection);
});

;require.register("models/friendships/friend", function(exports, require, module) {
var Friend, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('models/base/model');

module.exports = Friend = (function(_super) {
  __extends(Friend, _super);

  function Friend() {
    _ref = Friend.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Friend.prototype.urlRoot = "http://alexxxxone-backend.herokuapp.com/friendships";

  return Friend;

})(Model);
});

;require.register("models/friendships/friends", function(exports, require, module) {
var Collection, Friends, Model, mediator, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('models/base/collection');

Model = require('./friend');

mediator = require('mediator');

module.exports = Friends = (function(_super) {
  __extends(Friends, _super);

  function Friends() {
    _ref = Friends.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Friends.prototype.url = "http://alexxxxone-backend.herokuapp.com/friends.json?user_id=" + mediator.user.id;

  return Friends;

})(Collection);
});

;require.register("models/friendships/invitations", function(exports, require, module) {
var Collection, Invitations, mediator, model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('models/base/collection');

model = require('models/users/user');

mediator = require('mediator');

module.exports = Invitations = (function(_super) {
  __extends(Invitations, _super);

  function Invitations() {
    _ref = Invitations.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Invitations.prototype.url = "http://alexxxxone-backend.herokuapp.com/invites.json?user_id=" + mediator.user.id;

  Invitations.prototype.model = model;

  return Invitations;

})(Collection);
});

;require.register("models/friendships/invites", function(exports, require, module) {
var Invites, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('models/base/model');

module.exports = Invites = (function(_super) {
  __extends(Invites, _super);

  function Invites() {
    _ref = Invites.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Invites.prototype.urlRoot = "http://alexxxxone-backend.herokuapp.com/invites/";

  return Invites;

})(Model);
});

;require.register("models/friendships/my_friends", function(exports, require, module) {
var Collection, MyFriends, mediator, model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('models/base/collection');

model = require('models/users/user');

mediator = require('mediator');

module.exports = MyFriends = (function(_super) {
  __extends(MyFriends, _super);

  function MyFriends() {
    _ref = MyFriends.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  MyFriends.prototype.url = "http://alexxxxone-backend.herokuapp.com/friendships.json?user_id=" + mediator.user.id;

  MyFriends.prototype.model = model;

  return MyFriends;

})(Collection);
});

;require.register("models/friendships/my_invitations", function(exports, require, module) {
var Collection, Invitations, mediator, model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('models/base/collection');

model = require('models/users/user');

mediator = require('mediator');

module.exports = Invitations = (function(_super) {
  __extends(Invitations, _super);

  function Invitations() {
    _ref = Invitations.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Invitations.prototype.url = "http://alexxxxone-backend.herokuapp.com/my_invites/" + mediator.user.id + ".json";

  Invitations.prototype.model = model;

  return Invitations;

})(Collection);
});

;require.register("models/init", function(exports, require, module) {
var Init, Model, mediator, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./base/model');

mediator = require('mediator');

module.exports = Init = (function(_super) {
  __extends(Init, _super);

  function Init() {
    _ref = Init.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Init.prototype.initialize = function() {
    if (mediator.user) {
      return this.url = "http://alexxxxone-backend.herokuapp.com/init.json?user_id=" + mediator.user.id;
    }
  };

  Init.prototype.url = function() {};

  Init.prototype.url = "http://alexxxxone-backend.herokuapp.com/init.json?user_id=" + mediator.user.id;

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
var Collection, Messages, Model, mediator, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('./base/collection');

Model = require('./message');

mediator = require('mediator');

module.exports = Messages = (function(_super) {
  __extends(Messages, _super);

  function Messages() {
    _ref = Messages.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Messages.prototype.url = "http://alexxxxone-backend.herokuapp.com/messages.json";

  Messages.prototype.initialize = function(option) {
    this.url = "http://alexxxxone-backend.herokuapp.com/messages.json?id=" + option.id + "&user_id=" + mediator.user.id;
    return Messages.__super__.initialize.apply(this, arguments);
  };

  Messages.prototype.model = Model;

  return Messages;

})(Collection);
});

;require.register("models/users/current-user", function(exports, require, module) {
var CurrentUser, User, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

User = require('models/users/user');

module.exports = CurrentUser = (function(_super) {
  __extends(CurrentUser, _super);

  function CurrentUser() {
    _ref = CurrentUser.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  CurrentUser.prototype.urlKey = '';

  CurrentUser.prototype.urlPath = function() {
    return '/users/me';
  };

  return CurrentUser;

})(User);
});

;require.register("models/users/user", function(exports, require, module) {
var Model, User, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('models/base/model');

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

;require.register("models/users/users", function(exports, require, module) {
var Collection, Model, Users, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('models/base/collection');

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
  match('login', 'login_reg#login');
  match('logout', 'login_reg#logout');
  match('register', 'login_reg#registration');
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

;require.register("views/friendships/friend-view", function(exports, require, module) {
var Chat, FriendView, Friendship, View, chat_template, mediator, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

Chat = require('views/chat-view');

template = require('./templates/friend');

chat_template = require('views/templates/chat');

mediator = require('mediator');

Friendship = require('models/friendships/friend');

module.exports = FriendView = (function(_super) {
  __extends(FriendView, _super);

  function FriendView() {
    _ref = FriendView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  FriendView.prototype.autoRender = true;

  FriendView.prototype.template = template;

  FriendView.prototype.chat = chat_template;

  FriendView.prototype.user = mediator.user;

  FriendView.prototype.initialize = function() {
    FriendView.__super__.initialize.apply(this, arguments);
    this.delegate("click", ".start_chat", this.start_chat);
    this.delegate("click", ".remove_friend", this.destroy_friendship);
    return this.delegate('click', '.friend_image', this.info);
  };

  FriendView.prototype.start_chat = function() {
    return new Chat({
      model: this.model
    });
  };

  FriendView.prototype.info = function() {
    return console.log(this.model.get('email'));
  };

  FriendView.prototype.destroy_friendship = function() {
    var friendship;
    console.log('destroy_friendship');
    friendship = new Friendship({
      firend_id: this.model.id,
      user_id: this.user.id
    });
    friendship.url = 'http://alexxxxone-backend.herokuapp.com/friendships/' + this.model.id + '?user_id=' + this.user.id;
    friendship.fetch({
      method: 'delete'
    });
    this.model.destroy({
      wait: true
    });
    return this.publishEvent('delete_friend');
  };

  return FriendView;

})(View);
});

;require.register("views/friendships/friends-view", function(exports, require, module) {
var FriendsView, View, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

template = require('./templates/friends');

module.exports = FriendsView = (function(_super) {
  __extends(FriendsView, _super);

  function FriendsView() {
    _ref = FriendsView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  FriendsView.prototype.container = '#container';

  FriendsView.prototype.autoRender = true;

  FriendsView.prototype.autoAttach = true;

  FriendsView.prototype.containerMethod = 'html';

  FriendsView.prototype.className = 'friends-page';

  FriendsView.prototype.template = template;

  FriendsView.prototype.regions = {
    my_friends: '#my_friends',
    invites: '#invites',
    my_invites: '#my_invites'
  };

  FriendsView.prototype.initialize = function() {
    FriendsView.__super__.initialize.apply(this, arguments);
    return $('.menu_friends').addClass('active');
  };

  return FriendsView;

})(View);
});

;require.register("views/friendships/invite-view", function(exports, require, module) {
var FriendView, Friendship, View, mediator, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

mediator = require('mediator');

template = require('./templates/invites');

Friendship = require('models/friendships/friend');

module.exports = FriendView = (function(_super) {
  __extends(FriendView, _super);

  function FriendView() {
    _ref = FriendView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  FriendView.prototype.autoRender = true;

  FriendView.prototype.template = template;

  FriendView.prototype.user = mediator.user;

  FriendView.prototype.initialize = function() {
    FriendView.__super__.initialize.apply(this, arguments);
    console.log('invite-view');
    this.delegate("click", ".accept_friend", this.accept_friend);
    this.delegate('click', '.friend_image', this.info);
    return this.delegate('click', '.decline_friendship', this.decline_friendship);
  };

  FriendView.prototype.info = function() {
    return console.log(this.model.get('email'));
  };

  FriendView.prototype.accept_friend = function() {
    var friendship;
    friendship = new Friendship({
      user_id: mediator.user.id,
      friend_id: this.model.id
    });
    friendship.save({
      wait: true
    });
    this.model.destroy({
      wait: true
    });
    return this.publishEvent('new_friend');
  };

  FriendView.prototype.decline_friendship = function() {
    console.log('decline_friendship -> send');
    this.model.url = "http://alexxxxone-backend.herokuapp.com/destroy_invitation/" + this.model.id + "/" + this.user.id;
    this.model.destroy({
      wait: true
    });
    return this.publishEvent('decline_friendship');
  };

  return FriendView;

})(View);
});

;require.register("views/friendships/invites-view", function(exports, require, module) {
var CollectionView, InvitesView, View, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

View = require('./invite-view');

template = require('./templates/inv');

module.exports = InvitesView = (function(_super) {
  __extends(InvitesView, _super);

  function InvitesView() {
    _ref = InvitesView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  InvitesView.prototype.itemView = View;

  InvitesView.prototype.container = '#invites';

  InvitesView.prototype.containerMethod = 'html';

  InvitesView.prototype.template = template;

  InvitesView.prototype.listSelector = '.invites';

  InvitesView.prototype.initialize = function() {
    var self;
    InvitesView.__super__.initialize.apply(this, arguments);
    self = this;
    this.collection.fetch({
      success: function(response) {
        return self.badges(response.length);
      }
    });
    this.listenTo(this.collection, 'reset', this.render);
    this.subscribeEvent('delete_friend', this.restrat);
    this.subscribeEvent('new_friend', this.restrat);
    return this.subscribeEvent('decline_friendship', this.restrat);
  };

  InvitesView.prototype.restrat = function() {
    console.log('decline_friendship -> receiv');
    return this.initialize();
  };

  InvitesView.prototype.badges = function(length) {
    if (length === 0) {
      return $('.new_friend_badge, .invites_count_badge').empty();
    } else {
      return $('.new_friend_badge, .invites_count_badge').text(length);
    }
  };

  return InvitesView;

})(CollectionView);
});

;require.register("views/friendships/my_friends-view", function(exports, require, module) {
var CollectionView, MyFriendsView, View, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

View = require('./friend-view');

template = require('./templates/my');

module.exports = MyFriendsView = (function(_super) {
  __extends(MyFriendsView, _super);

  function MyFriendsView() {
    _ref = MyFriendsView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  MyFriendsView.prototype.itemView = View;

  MyFriendsView.prototype.container = '#my_friends';

  MyFriendsView.prototype.containerMethod = 'html';

  MyFriendsView.prototype.template = template;

  MyFriendsView.prototype.listSelector = '.my_friends';

  MyFriendsView.prototype.initialize = function() {
    MyFriendsView.__super__.initialize.apply(this, arguments);
    this.collection.fetch();
    this.listenTo(this.collection, 'reset', this.render);
    this.subscribeEvent('new_friend', this.restrat);
    return this.subscribeEvent('delete_friend', this.restrat);
  };

  MyFriendsView.prototype.restrat = function() {
    return this.initialize();
  };

  return MyFriendsView;

})(CollectionView);
});

;require.register("views/friendships/my_invite-view", function(exports, require, module) {
var FriendView, Friendship, View, mediator, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

mediator = require('mediator');

template = require('./templates/my_invites');

Friendship = require('models/friendships/friend');

module.exports = FriendView = (function(_super) {
  __extends(FriendView, _super);

  function FriendView() {
    _ref = FriendView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  FriendView.prototype.autoRender = true;

  FriendView.prototype.template = template;

  FriendView.prototype.user = mediator.user;

  FriendView.prototype.initialize = function() {
    FriendView.__super__.initialize.apply(this, arguments);
    this.delegate("click", ".decline_request", this.decline_request);
    return this.delegate('click', '.friend_image', this.info);
  };

  FriendView.prototype.info = function() {
    return console.log(this.model.get('email'));
  };

  FriendView.prototype.decline_request = function() {
    var friendship;
    friendship = new Friendship({
      firend_id: this.model.id,
      user_id: this.user.id
    });
    friendship.url = 'http://alexxxxone-backend.herokuapp.com/friendships/' + this.model.id + '?user_id=' + this.user.id;
    friendship.fetch({
      method: 'delete'
    });
    return this.model.destroy({
      wait: true
    });
  };

  return FriendView;

})(View);
});

;require.register("views/friendships/my_invites-view", function(exports, require, module) {
var CollectionView, MyInvitesView, View, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

View = require('./my_invite-view');

template = require('./templates/my_inv');

module.exports = MyInvitesView = (function(_super) {
  __extends(MyInvitesView, _super);

  function MyInvitesView() {
    _ref = MyInvitesView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  MyInvitesView.prototype.itemView = View;

  MyInvitesView.prototype.container = '#my_invites';

  MyInvitesView.prototype.containerMethod = 'html';

  MyInvitesView.prototype.template = template;

  MyInvitesView.prototype.listSelector = '.my_invites';

  MyInvitesView.prototype.initialize = function() {
    MyInvitesView.__super__.initialize.apply(this, arguments);
    this.collection.fetch({
      success: function(response) {
        if (response.length !== 0) {
          return $('.my_invites_count_badge').text(response.length);
        } else {
          return $('.my_invites_count_badge').empty();
        }
      }
    });
    return this.listenTo(this.collection, 'reset', this.render);
  };

  return MyInvitesView;

})(CollectionView);
});

;require.register("views/friendships/templates/friend", function(exports, require, module) {
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
    + "</p>\n    </div>\n    <div class=\"friend_actions\">\n        <p><a href=\"javascript:;\" class=\"remove_friend\">Remove from friends</a></p>\n        <p><a href=\"javascript:;\" class=\"start_chat\">Start Chat</a></p>\n    </div>\n</li>\n\n\n\n<script type=\"text/x-handlebars-template\" id=\"user_info_panel\">\n   <div class=\"panel panel-default\">\n       <div class=\"panel-body\">\n           ";
  if (stack1 = helpers.email) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.email); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n       </div>\n   </div>\n</script>";
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

;require.register("views/friendships/templates/friends", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h4>You have <span class=\"friends_count_badge\"></span> friend('s)</h4>\n\n<ul class=\"nav nav-pills\">\n    <li class=\"active\"><a href=\"#my_friends\" data-toggle=\"tab\">My friends</a></li>\n    <li><a href=\"#invites\" data-toggle=\"tab\">Invitations<span class=\"badge pull-right invites_count_badge\"></span></a></li>\n    <li><a href=\"#my_invites\" data-toggle=\"tab\">My Request's<span class=\"badge pull-right my_invites_count_badge\"></span></a></li>\n</ul>\n\n<!-- Tab panes -->\n\n<div class=\"tab-content\">\n\n    <div class=\"tab-pane active\" id=\"my_friends\">\n    </div>\n    <div class=\"tab-pane\" id=\"invites\">\n    </div>\n    <div class=\"tab-pane\" id=\"my_invites\">\n    </div>\n\n</div>\n\n\n";
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

;require.register("views/friendships/templates/inv", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul id='index_content'  class=\"friends_list invites\">\n\n</ul>";
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

;require.register("views/friendships/templates/invites", function(exports, require, module) {
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
    + "</p>\n    </div>\n    <div class=\"friend_actions\">\n        <p><a href=\"javascript:;\" class=\"accept_friend\">Add to friends</a></p>\n        <p><a href=\"javascript:;\" class=\"decline_friendship\">Decline friendship</a></p>\n        <p><a href=\"javascript:;\" class=\"start_chat\">Start Chat</a></p>\n    </div>\n</li>\n\n";
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

;require.register("views/friendships/templates/my", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul id='index_content'  class=\"friends_list my_friends\">\n\n</ul>\n";
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

;require.register("views/friendships/templates/my_inv", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul id='index_content'  class=\"friends_list my_invites\">\n\n</ul>";
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

;require.register("views/friendships/templates/my_invites", function(exports, require, module) {
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
    + "</p>\n    </div>\n    <div class=\"friend_actions\">\n        <p><a href=\"javascript:;\" class=\"decline_request\">Decline request</a></p>\n        <p><a href=\"javascript:;\" class=\"start_chat\">Start Chat</a></p>\n    </div>\n</li>\n\n";
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

;require.register("views/home/home-conversation-view", function(exports, require, module) {
var Chat, CoversationView, View, mediator, utils, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

Chat = require('views/chat-view');

utils = require('lib/utils');

mediator = require('mediator');

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
    mediator.conversation(this.model.get('id'));
    if (mediator.user.id === this.model.get('friend_id')) {
      mediator.receiver(this.model.get('user_id'));
    } else {
      mediator.receiver(this.model.get('friend_id'));
    }
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
    console.log('home-conversation-view');
    return $('.menu_conversations').addClass('active');
  };

  return HomeConversationsView;

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
  


  return "<img src=\"images/user.png\" alt=\"image\"/>\n<h1>WALL</h1>\n\n<div class=\"wall_scroll\" style=\"color:black;\">\n    <div class=\"wall_message\">\n        <p>Big news</p>\n        <p>oifdgodihsfoigsdfoigdknfgodn\n            odfmphgdf\n            psmdfgpod\n            oifdgodihsfoigsdfoig\n        </p>\n    </div>\n    <div class=\"wall_message\">\n        <p>Big news</p>\n        <p>oifdgodihsfoigsdfoigdknfgodn\n            odfmphgdf\n            psmdfgpod\n            oifdgodihsfoigsdfoig\n        </p>\n    </div>\n    <div class=\"wall_message\">\n        <p>Big news</p>\n        <p>oifdgodihsfoigsdfoigdknfgodn\n            odfmphgdf\n            psmdfgpod\n            oifdgodihsfoigsdfoig\n        </p>\n    </div>\n</div>\n<table class=\"table table-hover table-striped\">\n    <thead>\n    <tr>\n        <th></th>\n        <th></th>\n        <th></th>\n    </tr>\n    </thead>\n    <tbody class=\"message_list\">\n\n    </tbody>\n</table>\n\n<div class=\"row\">\n    <div class=\"col-xs-12 col-md-8\">\n        <form class=\"form-inline\" role=\"form\">\n            <div class=\"form-group\">\n                <input type=\"text\" class=\"form-control input_message\" id=\"\" placeholder=\"Type your message here\">\n            </div>\n            <button type=\"button\" class=\"btn btn-info send_message\">Send</button>\n        </form>\n    </div>\n</div>\n\n<script type=\"text/javascript\">\n    $(\".wall_scroll\").slimScroll({\n    height: \"450px\",\n    color: '#008cba'\n    })\n\n//        var socket = io.connect(window.location.toString());\n//        $('.send_message').click(function(){\n//            input =  $('.input_message');\n//            message =  input.val();\n//            if (message.length >=2){\n//                input.val('');\n//                socket.emit('messages', { message: message, name: name });\n//                append_message(message,'Me');\n//            }\n//            return false;\n//        });\n//\n//        socket.on('new', function (data) {\n//            console.log('custom online');\n//            $('body').append('<p class=\"text-primary new_user_connected\" style=\"position: absolute; top:0;left:40%;\">'+data.message+'</p>');\n//\n//            $( \".new_user_connected\" ).animate({\n//                top: '+=160px'\n//            }, {\n//                duration: 600,\n//                specialEasing: {\n//                    width: \"linear\"\n//                },\n//                complete: function() {\n//                    $(this).delay(600).animate({\n//                        opacity: 0,\n//                        left: '-=500px'\n//                    }, 500,function(){\n//                        $(this).remove();\n//                    } )\n//                }\n//            });\n//        });\n//\n//        socket.on('news', function(data) {\n//            console.log(data.body);\n//            append_message(data.body, data.name);\n//    //        newExcitingAlerts(data.name);\n//        });\n//\n//    function append_message(message,sender_name){\n//        message_box = '<tr><td>'+sender_name+'</td><td>'+message+'</td><td><button type=\"button\" class=\"close delete_message\" >&times;</button></td></tr>'\n//        $('.message_list').append(message_box);\n//    }\n</script>";
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

;require.register("views/login-view", function(exports, require, module) {
var Collection, Login, LoginView, User, View, mediator, template, utils, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

Login = require('models/conversation');

template = require('./templates/login');

mediator = require('mediator');

utils = require('lib/utils');

User = require('models/users/user');

Collection = require('models/base/collection');

module.exports = LoginView = (function(_super) {
  __extends(LoginView, _super);

  function LoginView() {
    _ref = LoginView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LoginView.prototype.container = 'body';

  LoginView.prototype.autoRender = true;

  LoginView.prototype.template = template;

  LoginView.prototype.containerMethod = 'html';

  LoginView.prototype.initialize = function() {
    this.delegate("click", ".send", this.login);
    this.delegate("click", ".cancel", this.cancel);
    return this.delegate("click", ".help", this.fill);
  };

  LoginView.prototype.fill = function() {
    $('#inputEmail').val('b0@maial.ru');
    return $('#inputPassword').val('12345678');
  };

  LoginView.prototype.login = function() {
    var email, password;
    email = $('#inputEmail').val();
    password = $('#inputPassword').val();
    return $.ajax({
      crossDomain: true,
      type: 'POST',
      url: "http://alexxxxone-backend.herokuapp.com/login",
      data: {
        'user': {
          'email': email,
          'password': password
        }
      }
    }).success(function(response) {
      return mediator.login(response);
    }).complete(function(response) {
      if (response.status === 404) {
        return $('.form-group').addClass('has-error');
      }
    });
  };

  LoginView.prototype.cancel = function() {
    return utils.redirectTo({
      url: '/'
    });
  };

  return LoginView;

})(View);
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
var CollectionView, Message, MessagesView, View, mediator, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

View = require('/views/messages/message-view');

template = require('./templates/messages');

mediator = require('mediator');

Message = require('/models/message');

module.exports = MessagesView = (function(_super) {
  __extends(MessagesView, _super);

  function MessagesView() {
    _ref = MessagesView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  MessagesView.prototype.itemView = View;

  MessagesView.prototype.container = '#container';

  MessagesView.prototype.className = 'messages-page';

  MessagesView.prototype.containerMethod = 'html';

  MessagesView.prototype.template = template;

  MessagesView.prototype.listSelector = '#messages_content';

  MessagesView.prototype.loadingSelector = ".loading";

  MessagesView.prototype.receiver_id = mediator.receiver_id;

  MessagesView.prototype.conversation_id = mediator.conversation_id;

  MessagesView.prototype.user = mediator.user;

  MessagesView.prototype.initialize = function() {
    var self, that;
    this.start_animation();
    MessagesView.__super__.initialize.apply(this, arguments);
    self = this;
    this.collection.fetch({
      complete: function() {
        return self.stop_animation();
      }
    });
    this.socket = io.connect(window.location.toString());
    $('.menu_conversations').addClass('active');
    this.delegate('click', '.send_message', this.send_message);
    this.scroll_to_bottom();
    this.listenTo(this.collection, 'reset', this.render);
    that = this;
    return this.socket.on("news" + this.conversation_id, function(data) {
      return that.incoming_message(data);
    });
  };

  MessagesView.prototype.send_message = function() {
    var input, message;
    input = $(this.el).find('.message_body');
    if (input.val().length > 2) {
      message = new Message({
        user_id: this.user.id,
        message: {
          body: input.val(),
          receiver_id: this.receiver_id,
          conversation_id: this.conversation_id
        }
      });
      message.save();
      console.log(message);
      this.collection.push({
        sender_id: this.user.id,
        user: {
          username: this.user.get('username')
        },
        body: input.val(),
        receiver_id: this.receiver_id,
        conversation_id: this.conversation_id
      });
      this.publish(input.val());
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

  MessagesView.prototype.publish = function(body) {
    return this.socket.emit("messages", {
      sender_id: this.user.id,
      username: this.user.get('username'),
      receiver_id: this.receiver_id,
      body: body,
      conversation_id: this.conversation_id
    });
  };

  MessagesView.prototype.incoming_message = function(data) {
    this.collection.push({
      sender_id: data.sender_id,
      user: {
        username: data.username
      },
      body: data.body,
      receiver_id: data.receiver_id,
      conversation_id: data.conversation_id
    });
    return this.scroll_to_bottom();
  };

  MessagesView.prototype.start_animation = function() {
    return $(this.loadingSelector).fadeToggle('slow');
  };

  MessagesView.prototype.stop_animation = function() {
    return $(this.loadingSelector).fadeToggle('slow');
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
  


  return "<h4>Messages</h4>\n<ul id='messages_content'  class=\"friends_list\">\n\n</ul>\n\n<div class=\"input-group\">\n    <span class=\"input-group-addon\">:)</span>\n    <input type=\"text\" class=\"form-control message_body\">\n    <span class=\"input-group-btn\">\n      <button class=\"btn btn-primary send_message\" type=\"button\">Send</button>\n    </span>\n</div>\n\n\n\n\n<script type=\"text/javascript\">\n    var cl = new CanvasLoader('canvasloader-container');\n    cl.setColor('#008cba'); // default is '#000000'\n    cl.setShape('spiral'); // default is 'oval'\n    cl.setDiameter(71); // default is 40\n    cl.setDensity(90); // default is 40\n    cl.setRange(0.8); // default is 1.3\n    cl.setFPS(51); // default is 24\n    cl.show(); // Hidden by default\n\n    // This bit is only for positioning - not necessary\n    var loaderObj = document.getElementById(\"canvasLoader\");\n    loaderObj.style.position = \"absolute\";\n    loaderObj.style[\"top\"] = cl.getDiameter() * -0.5 + \"px\";\n    loaderObj.style[\"left\"] = cl.getDiameter() * -0.5 + \"px\";\n\n    $('#messages_content').slimScroll({\n        width: 'auto',\n        height: '745px',\n        size: '10px',\n        position: 'right',\n        color: '#008cba',\n        wheelStep: 10,\n        allowPageScroll: false,\n        disableFadeOut: false\n    });\n</script>\n\n\n";
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
var Init, SiteView, View, mediator, utils, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

utils = require('lib/utils');

mediator = require('mediator');

SiteView = require('views/site-view');

Init = require('models/init');

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

  SiteView.prototype.user = mediator.user ? mediator.user : void 0;

  SiteView.prototype.initialize = function() {
    var that;
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
    this.socket = io.connect(window.location.toString());
    this.delegate('click', '.menu_main_page', this.home);
    this.delegate('click', '.menu_friends', this.friends);
    this.delegate('click', '.menu_users', this.users);
    this.delegate('click', '.menu_settings', this.settings);
    this.delegate('click', '.menu_conversations', this.conversations);
    this.delegate('click', '.login_link', this.login);
    this.delegate('click', '.logout_link', this.logout);
    that = this;
    return this.socket.on("inbox" + this.user.id, function(data) {
      that.incoming_inbox(data);
      return console.log(data);
    });
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

  SiteView.prototype.login = function() {
    return utils.redirectTo({
      url: '/login'
    });
  };

  SiteView.prototype.logout = function() {
    mediator.logout();
    return utils.redirectTo({
      url: '/login'
    });
  };

  SiteView.prototype.incoming_inbox = function(data) {
    var badge;
    badge = $('.new_messages_badge').text();
    $('.new_messages_badge').text(parseInt(badge) + 1);
    return $.gritter.add({
      title: data.body,
      text: data.username
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

;require.register("views/templates/login", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"container login\"\n    <div class=\"row\">\n        <div class=\"col-lg-6 col-md-offset-2\">\n            <div class=\"well\">\n                <form class=\"bs-example form-horizontal\" >\n                    <fieldset>\n                        <legend>Login</legend>\n\n                        <div class=\"form-group\">\n                            <label for=\"inputEmail\" class=\"col-lg-2 control-label\">Email</label>\n                            <div class=\"col-lg-10\">\n                                <input type=\"email\" name=\"user[email]\" class=\"form-control\" id=\"inputEmail\" placeholder=\"Email\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label for=\"inputPassword\" class=\"col-lg-2 control-label\">Password</label>\n                            <div class=\"col-lg-10\">\n                                <input type=\"password\" name=\"user[password]\" class=\"form-control\" id=\"inputPassword\" placeholder=\"Password\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <div class=\"col-lg-10 col-lg-offset-2\">\n                                <button  type=\"button\" class=\"btn btn-default cancel\">Cancel</button>\n                                <button type=\"button\" class=\"btn btn-primary send\">Submit</button>\n                                <button type=\"button\" class=\"btn btn-warning help\">Fill</button>\n                            </div>\n                        </div>\n                    </fieldset>\n                </form>\n            </div>\n        </div>\n\n    </div>\n</div>";
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
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <li><a href=\"javascript:;\">";
  if (stack1 = helpers.user_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.user_name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n                <li><a href=\"javascript:;\" class=\"logout_link\">Logout</a></li>\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n                <li><a href=\"javascript:;\">Welcome Guest!</a></li>\n                <li><a href=\"javascript:;\" class=\"login_link\">Login</a></li>\n            ";
  }

  buffer += "<div class=\"navbar navbar-default navbar-fixed-top navbar-collapse collapse navbar-inverse-collapse\">\n    <div class=\"container\">\n        <div class=\"navbar-header\">\n            <a href=\"../\" class=\"navbar-brand\">Bootswatch</a>\n            <button class=\"navbar-toggle\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar-main\">\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n        </div>\n        <div class=\"navbar-collapse collapse\" id=\"navbar-main\">\n            <ul class=\"nav navbar-nav\">\n                <li class=\"dropdown\">\n                    <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" id=\"themes\">Themes <span class=\"caret\"></span></a>\n                    <ul class=\"dropdown-menu\" aria-labelledby=\"themes\">\n                        <li><a tabindex=\"-1\" href=\"../default/\">Default</a></li>\n                        <li class=\"divider\"></li>\n                        <li><a tabindex=\"-1\" href=\"../amelia/\">Amelia</a></li>\n                        <li><a tabindex=\"-1\" href=\"../cerulean/\">Cerulean</a></li>\n                        <li><a tabindex=\"-1\" href=\"../cosmo/\">Cosmo</a></li>\n                        <li><a tabindex=\"-1\" href=\"../cyborg/\">Cyborg</a></li>\n                        <li><a tabindex=\"-1\" href=\"../flatly/\">Flatly</a></li>\n                        <li><a tabindex=\"-1\" href=\"../journal/\">Journal</a></li>\n                        <li><a tabindex=\"-1\" href=\"../readable/\">Readable</a></li>\n                        <li><a tabindex=\"-1\" href=\"../simplex/\">Simplex</a></li>\n                        <li><a tabindex=\"-1\" href=\"../slate/\">Slate</a></li>\n                        <li><a tabindex=\"-1\" href=\"../spacelab/\">Spacelab</a></li>\n                        <li><a tabindex=\"-1\" href=\"../united/\">United</a></li>\n                        <li><a tabindex=\"-1\" href=\"../yeti/\">Yeti</a></li>\n                    </ul>\n                </li>\n                <li>\n                    <a href=\"../help/\">Help</a>\n                </li>\n                <li>\n                    <a href=\"http://news.bootswatch.com\">Blog</a>\n                </li>\n                <li class=\"dropdown\">\n                    <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" id=\"download\">Download <span class=\"caret\"></span></a>\n                    <ul class=\"dropdown-menu\" aria-labelledby=\"download\">\n                        <li><a tabindex=\"-1\" href=\"./bootstrap.min.css\">bootstrap.min.css</a></li>\n                        <li><a tabindex=\"-1\" href=\"./bootstrap.css\">bootstrap.css</a></li>\n                        <li class=\"divider\"></li>\n                        <li><a tabindex=\"-1\" href=\"./variables.less\">variables.less</a></li>\n                        <li><a tabindex=\"-1\" href=\"./bootswatch.less\">bootswatch.less</a></li>\n                    </ul>\n                </li>\n            </ul>\n\n            <ul class=\"nav navbar-nav navbar-right\">\n            ";
  options = {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.ifLoggedIn) { stack1 = stack1.call(depth0, options); }
  else { stack1 = (depth0 && depth0.ifLoggedIn); stack1 = typeof stack1 === functionType ? stack1.call(depth0, options) : stack1; }
  if (!helpers.ifLoggedIn) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </ul>\n\n        </div>\n    </div>\n</div>\n\n<div class=\"main_site\">\n    <div class=\"header-container\" id=\"menu-container\"></div>\n    <div class=\"main_chat\"></div>\n    <div class=\"row\">\n        <div class='col-md-3'>\n                <ul class=\"nav nav-pills nav-stacked left_menu\">\n                    <li class=\"menu_main_page\"><a href=\"javascript:;\"><i class=\"fa fa-home fa-fw\"></i> My page</a></li>\n                    <li class=\"menu_friends\"><a href=\"javascript:;\"><i class=\"fa fa-user fa-fw\"></i> Fiends<span class=\"badge pull-right new_friend_badge\">";
  if (stack1 = helpers.invitations) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.invitations); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></a></li>\n                    <li class=\"menu_conversations\"><a href=\"javascript:;\"><i class=\"fa fa-envelope-o fa-fw\"></i>Messages<span class=\"badge pull-right new_messages_badge\">";
  if (stack1 = helpers.messages) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.messages); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></a>\n                    <li class=\"menu_users\"><a href=\"javascript:;\"><i class=\"fa fa-user fa-fw\"></i> All People</a></li></li>\n                    <li class=\"menu_settings\"><a href=\"javascript:;\"><i class=\"fa fa-cogs fa-fw\"></i> Settings</a></li>\n                </ul>\n        </div>\n\n        <div class=\"\" >\n            <div class=\"loading\"><div id=\"canvasloader-container\" class=\"wrapper\"></div></div>\n            <div class='col-md-6'  id=\"page-container\">\n\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n\n            <div class=\"panel panel-primary\">\n                <div class=\"panel-heading\">News</div>\n                <div class=\"panel-body\">\n                    <img src=\"http://asset2.cbsistatic.com/cnwk.1d/i/tim/2010/09/28/0927LazaridisPlayBook_270x203.jpg\" alt=\"news\" class=\"img-thumbnail\" >\n                    Mike Lazaridis, a BlackBerry co-founder and former co-CEO, has officially ditched his plans to acquire the company through a joint bid with a fellow co-founder.\n                    In dissolving the plan, Lazaridis' stake in the sagging company is now 4.99 percent.\n                    Lazaridis made his decision public in a Securities and Exchange Commission filing on Tuesday. Under the now-defunct plan, which was announced in October, Lazaridis and fellow co-founder Douglas Fregin had combined stakes to reach 8 percent total ownership and said they were considering a purchase of the company. Last month, however, BlackBerry took itself off the market, and new management is trying to turn the company around.\n                </div>\n            </div>\n            <div class=\"panel panel-default\">\n                <div class=\"panel-body\">\n                    Panel content\n                </div>\n                <div class=\"panel-footer\">Panel footer</div>\n            </div>\n        </div>\n        <a href=\"#top\" class=\"arrow_up\"><i class=\"fa fa-chevron-up fa-3x\"></i></a>\n    </div>\n</div>\n\n<script type=\"text/javascript\">\n    var elem = $('.left_menu');\n    var elem_heigth = elem.offset().top+ elem.height() ;\n    var arrow = $(\".arrow_up\");\n    $(document).on('scroll', function(){\n       if(window.pageYOffset > elem_heigth ){\n           if(arrow.is( \":hidden\" )){\n             arrow.clearQueue();\n             arrow.stop();\n             arrow.css('display','block');\n             arrow.css('left','0');\n             arrow.animate({\n                   opacity: 1,\n                   left: \"+=50\"\n               }, 200);\n           }\n       }else{\n           if(arrow.is( \":visible\" )){\n               arrow.clearQueue();\n               arrow.stop();\n               arrow.css('left','0');\n               arrow.animate({\n                   opacity: 0.25,\n                   left: \"-=50\"\n\n               }, 200,function(){\n                   arrow.css('display','none');\n               });\n           }\n       }\n    })\n\n</script>";
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

;require.register("views/users/templates/user", function(exports, require, module) {
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
    + "</p>\n    </div>\n    <div class=\"friend_actions\">\n        <p><a href=\"javascript:;\" class=\"accept_friend\">Add to friends</a></p>\n        <p><a href=\"javascript:;\" class=\"start_chat\">Start Chat</a></p>\n    </div>\n</li>\n\n\n\n<script type=\"text/x-handlebars-template\" id=\"user_info_panel\">\n   <div class=\"panel panel-default\">\n       <div class=\"panel-body\">\n           ";
  if (stack1 = helpers.email) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.email); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n       </div>\n   </div>\n</script>";
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

;require.register("views/users/templates/users", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h4>Users toal registered <span class=\"users_count\"></span></h4>\n\n\n   <ul id='all_users'  class=\"friends_list\">\n\n   </ul>\n\n\n\n";
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

;require.register("views/users/user-view", function(exports, require, module) {
var Chat, Friendship, UserView, View, chat_template, mediator, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

Chat = require('views/chat-view');

template = require('./templates/user');

chat_template = require('views/templates/chat');

mediator = require('mediator');

Friendship = require('models/friendships/friend');

module.exports = UserView = (function(_super) {
  __extends(UserView, _super);

  function UserView() {
    _ref = UserView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  UserView.prototype.autoRender = true;

  UserView.prototype.template = template;

  UserView.prototype.chat = chat_template;

  UserView.prototype.user = mediator.user;

  UserView.prototype.initialize = function() {
    UserView.__super__.initialize.apply(this, arguments);
    console.log('user-view');
    this.delegate("click", ".accept_friend", this.accept_friend);
    return this.delegate('click', '.friend_image', this.info);
  };

  UserView.prototype.info = function() {
    return console.log(this.model.get('email'));
  };

  UserView.prototype.accept_friend = function() {
    var friendship;
    friendship = new Friendship({
      user_id: mediator.user.id,
      friend_id: this.model.id
    });
    friendship.save();
    return console.log(friendship);
  };

  return UserView;

})(View);
});

;require.register("views/users/users-view", function(exports, require, module) {
var CollectionView, UsersView, View, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

View = require('./user-view');

template = require('./templates/users');

module.exports = UsersView = (function(_super) {
  __extends(UsersView, _super);

  function UsersView() {
    _ref = UsersView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  UsersView.prototype.itemView = View;

  UsersView.prototype.container = '#page-container';

  UsersView.prototype.containerMethod = 'html';

  UsersView.prototype.listSelector = '#all_users';

  UsersView.prototype.template = template;

  UsersView.prototype.initialize = function() {
    UsersView.__super__.initialize.apply(this, arguments);
    this.collection.fetch({
      success: function() {
        return console.log;
      }
    });
    return $('.menu_users').addClass('active');
  };

  return UsersView;

})(CollectionView);
});

;
//# sourceMappingURL=app.js.map