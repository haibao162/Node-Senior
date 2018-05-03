var db = require('mysql');
var config = require('../config.json');
var pool = db.createPool({
	host : config.host,
	user : config.user,
	password : config.password,
	database : config.database
});

pool.getConnection(function(err, connection) {
  console.log(11); 
});

pool.on('acquire', function () {
 console.log('connection');
});
//https://www.npmjs.com/package/mysql#install