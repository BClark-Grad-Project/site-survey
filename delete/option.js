var Model = require('./../config').option;

module.exports = function(Obj, cb){
	Model
		.find()
		.remove(Obj)
		.exec(function(err){
			if(err) return cb(err, Obj);
			else return cb(null, {response:'Deleted'});
		});
};