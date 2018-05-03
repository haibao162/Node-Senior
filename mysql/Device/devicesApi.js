var Q = require('q');

function getList(db,sql,params){
var deferred = Q.defer();
db.getConnection(function(err,connection){
	connection.query(sql,params,function(err,data){
		connection.release();
		if(err){
			console.log(err);
				deferred.reject(err);
			} else {
				deferred.resolve(data);
			}
		});
	});
	return deferred.promise;
}

function Insert(db,sql,params){
var deferred = Q.defer();
db.getConnection(function(err,connection){
	connection.query(sql,params,function(err,data){
		connection.release();
		if(err){
				deferred.reject(err);
			} else {
				deferred.resolve(data);
			}
		});
	});
	return deferred.promise;
}

function Update(db,sql,params){
var deferred = Q.defer();
db.getConnection(function(err,connection){
	connection.query(sql,params,function(err,data){
		connection.release();
		if(err){
				deferred.reject(err);
			} else {
				deferred.resolve(data);
			}
		});
	});
	return deferred.promise;
}

function getSingleList(db,sql,params){
var deferred = Q.defer();
db.getConnection(function(err,connection){
	connection.query(sql,params,function(err,data){
		connection.release();
		if(err){
			console.log(err);
				deferred.reject(err);
			} else if(data.length > 1){
				deferred.reject('error number!');
			}
			else {
				deferred.resolve(data);
			}
		});
	});
	return deferred.promise;
}

module.exports = {
	getList: getList,
	Insert: Insert,
	Update: Update,
	getSingleList : getSingleList
};