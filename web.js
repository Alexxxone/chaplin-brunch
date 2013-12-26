console.log(process.env.PORT);

var statik = require('statik');

statik(process.env.PORT || 3005);
console.log(process.env.PORT);

//brunch watch --server
//http://backbonetutorials.com/cross-domain-sessions/