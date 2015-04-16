var Survey = require('./../config').survey;

module.exports = function(Obj, cb){
	Survey
		.find()
		.remove(Obj)
		.exec(function(err){
			if(err) return cb(err, Obj);
			else return cb(null, {response:'Deleted'});
		});
};