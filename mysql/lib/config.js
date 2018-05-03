var db = require('mysql');
var config = require('../config.json');
var pool = db.createPool({
	host : config.host,
	user : config.user,
	password : config.password,
	database : config.database
});

function getConnection(callback){
	return pool.getConnection(callback);
}

// getConnection(function(err,connection){
// connection.query('select * from Device',function(err,result){
//      console.log(result);
//      connection.release();
// 	});
// });

module.exports = {
	getConnection : getConnection
};