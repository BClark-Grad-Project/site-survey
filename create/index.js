var Survey   = require('./survey');
var Question = require('./question');
var Option   = require('./option');

module.exports = function(Obj, cb){
	if(Obj){
		if(Obj.question) {
			var newQ = {};
			newQ.survey = Obj.question.survey;
			newQ.question = Obj.question.question;
			newQ.type = Obj.question.type;
			Question(newQ, function(err, question){
				if(err) return cb(err, Obj);
				else {
					if(Obj.question.option){
						var newO = {};
						newO.survey = Obj.question.survey;
						newO.question = question.id;
						if(Obj.question.response) newO.response = Obj.question.response;
						if(Obj.question.label) newO.label = Obj.question.label;
						if(Obj.question.placeholder) newO.placeholder = Obj.question.placeholder;
						Option(newO, function(err, option){
							if(err) return cb(err, Obj);
							else {
								question.option = option;								
								return cb(null, question);
							}
						});
					} else return cb(null, question);
				}
			});
		} else if(Obj.option) Option(Obj.option, function(err, option){
				if(err) return cb(err, Obj);
				else return cb(null, option);
			});
		else Survey(Obj, function(err, survey){
			if(err) return cb(err, Obj);
			else return cb(null, survey);});
	} else return cb({type:'!No Object To Create'}, Obj);
};

module.exports.survey    = Survey;
module.exports.question  = Question;
module.exports.option    = Option;
