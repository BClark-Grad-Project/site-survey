var Model = require('./../config').response;

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

module.exports.sortASC = function(Obj, cb){
    //var val = Object.keys(Obj)[0];
	Model
		.find(Obj)
		.sort({respondant:'asc'})
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
