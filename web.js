console.log(process.env.PORT);

var statik = require('statik');

statik(process.env.PORT || 3005);

//
//var statik = require('../index');
//var server = statik.createServer();
//
//server.listen(3000);
//console.log("server online at http://localhost:3000/");
//brunch watch --server
//http://backbonetutorials.com/cross-domain-sessions/