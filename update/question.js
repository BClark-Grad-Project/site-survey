var Model = require('./../config').question;

module.exports = function(search, updateData, cb){	
	Model.findOneAndUpdate(search, updateData, {}, function(err, model){
		if(err){return cb(err, search);}
		else return cb(null, model.getData());
	});
};