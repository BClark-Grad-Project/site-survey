var Model = require('./../config').question;

module.exports = function(Obj, cb){
	Model
		.find(Obj)
		.exec(function(err, model){
			if(err) return cb(err, Obj); 
			else {
				var newData = [];
				
				for(var i in model){
					newData.push(model[i].getData());
				}
				
				return cb(null, newData);
			}
		});	
};