var Survey   = require('./survey');
var Question = require('./question');
var Option   = require('./option');

module.exports = function(Obj, cb){
	if(Obj){
		if(Obj.question){
			Question({_id:Obj.question}, function(err, response){
				if(err) return cb(err, null);
				else Option({question:Obj.question}, function(err, response){
						if(err) return cb(err, null);
						else return cb(null, response);
					});
			});			
		} else {
			var search = Obj;
			if(Obj.id){
				search._id = Obj.id;
				delete search.id;
			}
			Survey(search, function(err, survey){
				if(err) return cb(err, Obj);
				else return cb(null, survey);
			});				
		}	
	} else {
		return cb({type:'!No Delete Item'}, Obj);
	}
};

module.exports.survey    = Survey;
module.exports.question  = Question;
module.exports.option    = Option;