var Survey = require('./../config').survey;

module.exports = function(Obj, cb){
	Survey
		.find(Obj)
		.exec(function(err, data){
			if(err) return cb(err, Obj); 
			else if(!data) return cb(null, undefined);
			else {
				var newData = [];
				
				for(var i in data){
					newData.push(data[i].getData());
				}
				
				return cb(null, newData);
			}
		});	
};