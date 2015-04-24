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
				Question({survey:search._id}, function(err, questions){
					if(err) return cb(err, Obj);
					else {
						if(questions[0]){
							survey[0].questions = questions;
							Option({survey:search._id}, function(err, options){
								if(err) return cb(err, Obj);
								else {
									if(options[0]){
										survey[0].options = options;
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

module.exports.surveyForm = function(Obj){
	if(Obj){
		Survey({_id:Obj.id}, function(err, survey){
			if(err) return cb(err, Obj);
			else {
				Question({survey:Obj.id}, function(err, questions){
					if(err) return cb(err, Obj);
					else {
						survey[0].questions = questions;
						Option({survey:Obj.id}, function(err, options){
							if(err) return cb(err, Obj);
							else {
								for(var i in survey[0].questions){
									survey[0].questions[i].options = [];
									for(var j in questions){
										if(survey[0].questions[i].id == options[j].question){
											survey[0].questions[i].options.push(options[j]);
										}
									}
								}
								return cb(null, survey);
							}								
						});
					}
				});
			} 
		});
	} else return cb({type:'!No Object To Create'}, Obj);
};
