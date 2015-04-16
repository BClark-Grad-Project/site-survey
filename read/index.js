var Survey = require('./survey');

module.exports = function(Obj, cb){
	if(Obj){
		Survey(Obj, function(err, survey){
			if(err) return cb(err, Obj);
			else return cb(null, survey);
		});
	} else {
		return cb({type:'!No READ Item'}, Obj);
	}
};

module.exports.survey    = Survey;
