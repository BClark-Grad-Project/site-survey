var Model = require('./../config').option;

module.exports = function(search, updateData, cb){	
	Model.findOneAndUpdate(search, updateData, {}, function(err, model){
		if(err){return cb(err, search);}
		else return cb(null, model.getData());
	});
};