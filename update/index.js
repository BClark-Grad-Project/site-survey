var Survey = require('./survey');

module.exports = function(Obj, cb){
	if(Obj){
		var update = Obj;
		if(Obj.id){
			delete update.id;
		}
		Survey({_id:Obj.id}, update, function(err, survey){
			if(err) return cb(err, Obj);
			else return cb(null, survey);
		});
	} else {
		return cb({type:'!No UPDATE Item'}, Obj);
	}
};

module.exports.survey    = Survey;