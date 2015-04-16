var Survey = require('./survey');

module.exports = function(Obj, cb){
	if(Obj){
		Survey({_id:Obj.id}, Obj, function(err, survey){
			if(err) return cb(err, Obj);
			else return cb(null, survey);
		});
	} else {
		return cb({type:'!No UPDATE Item'}, Obj);
	}
};

module.exports.survey    = Survey;