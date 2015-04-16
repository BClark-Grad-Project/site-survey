var Survey = require('./survey');

module.exports = function(Obj, cb){
	if(Obj){
		var search = Obj;
		if(Obj.id){
			search._id = Obj.id;
			delete search.id;
		}
		Survey(search, function(err, survey){
			if(err) return cb(err, Obj);
			else return cb(null, survey);
		});		
	} else {
		return cb({type:'!No Delete Item'}, Obj);
	}
};

module.exports.survey    = Survey;