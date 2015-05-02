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


module.exports.recent = function(count, cb){
	Survey
		.find({active:true, state:{$ne: 0 }})
		.sort({start: -1})
		.limit(count)
		.exec(function(err, data){
			if(err){return cb(err, null);}
			
			var items = [];
			for(i in data){
				items[i] = data[i].getData();
			}
			
			return cb(null, items);
		});	
};