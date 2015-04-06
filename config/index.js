var mongo = require('mongoose');
var config = require('./conf');
var Survey = require('./models/survey');
var conn = {};

var mongoMessage = function(){
	var db = mongo.connection;
	db.once('open', function () {
		console.info('connected: ' + config.db);
	});	
	db.on('error', function(err){
		console.error.bind(console, '!CONNECTION ERROR: ' + config.db);
		console.error.bind(console, err);
	});	
};

var dbConnection = function(){
	var url = 'mongodb://' + config.mongo_host + ':' + config.mongo_port + '/' + config.db;
	return url;
};

module.exports.close = function(){
	return mongo.disconnect();
};

var url = dbConnection();
conn = mongo.createConnection(url);	
mongoMessage();
module.exports.survey = conn.model('Survey', Survey);