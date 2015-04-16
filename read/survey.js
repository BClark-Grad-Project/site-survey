var Survey = require('./../config').survey;

module.exports = function(Obj, cb){
	Survey
		.findOne(Obj)
		.exec(function(err, data){
			if(err) return cb(err, Obj); 
			else if(!data) return cb(null, undefined);
			else return cb(null, data.getData());
		});	
};