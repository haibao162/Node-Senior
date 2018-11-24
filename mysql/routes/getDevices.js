var express = require('express');
var router = express.Router();
var device = require('../Device/devicesApi');
var mysql = require('../lib/config');

var sql_findAllDevice = 'select * from job';
router.get('/deviceList',function(req,res,next){
    device.getList(mysql,sql_findAllDevice,[]).then(function(result){
		console.log(result);
		res.json(result);
    });
    console.log('get device list from localhost:'+req.app.get('port')+'/device/deviceList');
});

var sql_findDeviceById = 'select * from Device where id = ?';
router.get('/deviceList/:id(\\d+)',function(req,res){
	var params = [];
	params.push(req.params.id);
	device.getList(mysql,sql_findDeviceById,params).then(function(result){
		res.json(result);
	});
});

var sql_insertDevice = 'insert into job(age,salary) values (?,?)';
router.get('/insert',function(req,res){
	var params = [33,11000];
	device.Insert(mysql,sql_insertDevice,params).then(function(result){
		console.log(result);
		res.send(result);
	},function(err){
		console.log('reject:'+err);
	});
});

var sql_insertJob = 'insert into haibao.job(age,salary) values(?,?)';
router.post('/insertJob',function(req,res){
	var params = req.body;
	insertJob(params.age,params.salary).then(function(result){
		console.log(result);
	});
});

var student_job_product = 'select a.*,b.productName,b.date,c.age,c.salary from haibao.student as a '
						+'left join haibao.product as b on a.productID=b.id '
						+'left join haibao.job as c on a.jobID=c.id';
router.get('/join',function(req,res){
	device.getList(mysql,student_job_product).then(function(result){
		res.send(result);
	},function(err){
		res.status(500).send('getList error '+err);
	});
});

function insertJob(age,salary){
	return device.Insert(mysql,sql_insertJob,[age,salary]);
}

router.put('/editJob/:id',function(req,res){
	var id = req.params.id;
	var params = req.body;
	var sqlCommand = 'UPDATE haibao.job SET age = ?,salary = ? WHERE id = ? ';
	editJob(mysql,sqlCommand,id,params).then(function(result){
		console.log(result);
		res.send(result);
	},function(err){
		res.status(500).send('editJob error '+ err);
	});
});

function editJob(db,sql,id,params){
	return device.Update(db,sql,[params.age,params.salary,id]);
}

router.get('/mutipleRecord/:salary',function(req,res){
	var sql = 'select * from haibao.job where salary = ?';
	var salary = req.params.salary;
	device.getSingleList(mysql,sql,salary).then(function(result){
		console.log(result);
		return device.getList(mysql,student_job_product);
	}).then(function(data){
		console.log(data);
	},function(err){
		console.log('errrrrrr:' + err);
	});
});
module.exports = router;
