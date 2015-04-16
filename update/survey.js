var Survey = require('./../config').survey;

module.exports = function(search, updateData, cb){	
	Survey.findOneAndUpdate(search, updateData, {}, function(err, survey){
		if(err){return cb(err, updateData);}
		else return cb(null, survey.getData());
	});
};