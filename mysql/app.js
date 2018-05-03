var express = require('express');
var app = express();
var getDevices = require('./routes/getDevices');
var config = require('./config');
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	secret:'123456',
	saveUninitialized: true,
	resave:true,
    cookie: {maxAge:  10000 } // 过期时间（毫秒）
}));

app.set('port',config.port);
app.use('/device',function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
},getDevices);

app.get('/session', function (req, res) {
	console.log(req.session);
    if (req.session.sign) {
        console.log(req.session);
        res.send('welecome <strong>' + req.session.name + '</strong>');
    } else {
        req.session.sign = true;
        req.session.name = 'haibao';
        res.end('welcome!');
    }
});

app.use(function(req,res,next){
	console.log('first validation tier');
	if(true){
		next();
	}
});

app.use('/',function(req,res,next){
	console.log('second validation tier');
	next();
});

app.use('/validation',function(req,res){
	console.log('third validation tier');
});


// app.get('/return',function(req,res){
// 	console.log('test return');
// 	return;
// 	console.log('end');
// });

app.listen(config.port);

module.exports = app;