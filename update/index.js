var Survey = require('./survey');

module.exports = function(Obj, cb){
	if(Obj){
		var search = {_id:Obj.id};
		var update = Obj;
		if(Obj.id){
			delete update.id;
		}
		Survey(search, update, function(err, survey){
			if(err) return cb(err, Obj);
			else return cb(null, survey);
		});
	} else {
		return cb({type:'!No UPDATE Item'}, Obj);
	}
};

module.exports.survey    = Survey;