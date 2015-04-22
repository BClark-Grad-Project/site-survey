var Survey = require('./survey');
var Question = require('./question');
var Option   = require('./option');

module.exports = function(Obj, cb){
	if(Obj){
		if(Obj.question){
			var searchQ = {_id:Obj.id};
			var updateQ = {};
			updateQ.question = Obj.question.question;
			Question(searchQ, updateQ, function(err, question){
				if(err) return cb(err, Obj);
				else return cb(null, question);
			});
		} else {
			var search = {_id:Obj.id};
			var update = Obj;
			if(Obj.id){
				delete update.id;
			}
			Survey(search, update, function(err, survey){
				if(err) return cb(err, Obj);
				else return cb(null, survey);
			});
		}
	} else {
		return cb({type:'!No UPDATE Item'}, Obj);
	}
};

module.exports.survey    = Survey;
module.exports.question  = Question;
module.exports.option    = Option;
