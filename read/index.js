var Survey = require('./survey');
var Question = require('./question');
var Option   = require('./option');
var Response   = require('./response');

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
module.exports.response  = Response;

module.exports.responses  = function(Obj, cb){
  if(Obj){
    Response.sortASC(Obj, function(err, responses){
      if(err) return cb(err, Obj);
      else {
        var userResponse = [];
        var surveyResponse = [];
        var prev = '';
        for(var i in responses){
          if(prev == responses[i].respondant){
            userResponse.push(responses[i]);
          } else {
            if(prev == '') {
              userResponse.push(responses[i]);
            } else {
              surveyResponse.push(userResponse);
              userResponse = [];
            }
            prev = responses[i].respondant;          
          }
        }
        console.log(surveyResponse);
        return cb(null, surveyResponse);
      }
    });
  } else return cb({type:'!No Object to lookup.'}, Obj);
};

module.exports.surveyForm = function(Obj, cb){
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
									for(var j in options){
										if(options[j].question){                       
											if(survey[0].questions[i].id.toString() == options[j].question.toString()){
												survey[0].questions[i].options.push(options[j]);
											}
										}
									}
								}
								return cb(null, survey[0]);
							}								
						});
					}
				});
			} 
		});
	} else return cb({type:'!No Object To Create'}, Obj);
};
