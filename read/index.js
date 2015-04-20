var Survey = require('./survey');
var Question = require('./question');
var Option   = require('./option');

module.exports = function(Obj, cb){
	if(Obj){
		var search = Obj;
		if(Obj.id){
			search._id = Obj.id;
			delete search.id;
		}
		Survey(search, function(err, survey){
			if(err) return cb(err, Obj);
			else {
				Question({survey:Obj.id}, function(err, questions){
					if(err) return cb(err, Obj);
					else {
						if(questions[0]){
							survey.questions = questions;
							Option({survey:Obj.id}, function(err, options){
								if(err) return cb(err, Obj);
								else {
									if(options[0]){
										survey.options = options;
										return cb(null, survey);
									} else return cb(null, survey);
								}								
							});
						} else return cb(null, survey);
					}
				});
			} 
		});
	} else {
		return cb({type:'!No READ Item'}, Obj);
	}
};

module.exports.survey    = Survey;
module.exports.question  = Question;
module.exports.option    = Option;

