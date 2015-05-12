var Survey = require('./survey');
var Question = require('./question');
var Option   = require('./option');
var Response   = require('./response');
var Request   = require('./request');

var Sentiment = require('sentiment');

var findResponses = function(Obj, cb){
	Response.sortASC(Obj, function(err, responses){
      if(err) return cb(err, Obj);
      else {
        var userResponse = [];
        var surveyResponse = [];
        var next = '';
        for(var i in responses){
          if(next == responses[i].respondant){
            userResponse.push(responses[i]);
            var lengt = i;
            lengt++;
            if(responses[lengt]){
              if(responses[i].respondant !== responses[lengt].respondant){
                surveyResponse.push(userResponse);
                userResponse = [];
              }
            } else surveyResponse.push(userResponse);
          } else {
            if(next == '') {
              userResponse.push(responses[i]);
            } else {
              userResponse.push(responses[i]);
            }
          }
          next = responses[i].respondant;
          var leng = i;
          leng++;
        }
        return cb(null, surveyResponse);
      }
    });	
};

var findSurveyForm = function(Obj, cb){
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
};

var isUniqueResponse = function(id, Obj){
  var count = 0;
  for(var i in Obj){
    if(Obj[i].question.toString() == id){
      count++;
    }
  }
  return 1 < count ? false : true;
};

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
module.exports.request   = Request;

module.exports.responses  = function(Obj, cb){
  if(Obj){
		findResponses(Obj, function(err, responses){
			if(err) return cb(err, Obj);
			else return cb(null, responses);
				
		});
  } else return cb({type:'!No Object to lookup.'}, Obj);
};

module.exports.surveyForm = function(Obj, cb){
	if(Obj){
		findSurveyForm(Obj, function(err, form){
			if(err) return cb(err, Obj);
			else return cb(null, form);
				
		});
	} else return cb({type:'!No Object To Create'}, Obj);
};


module.exports.recentSurveys = function(Obj, cb){
	Survey.recent(5, function(err, surveys){
		if(err) return cb(err, Obj);
		else return cb(null, surveys);		
	});	
};

module.exports.surveyResult = function(Obj, cb){
	if(Obj){
		findSurveyForm(Obj, function(err, form){
			if(err) return cb(err, Obj);
			else findResponses({survey:Obj.id}, function(err, responses){
				if(err) return cb(err, Obj);
				else {
					for(var i in responses){
					  var guage = true;
						for(var n in responses[i]){
							for(var j in form.questions){
								if(responses[i][n].question.toString() == form.questions[j].id.toString()){
									for(var k in form.questions[j].options){
										if(form.questions[j].options[k].id.toString() == responses[i][n].option.toString()){
											if(form.questions[j].options[k].option != 'opinion'){
											    if(form.questions[j].options[k].selected) form.questions[j].options[k].selected++;
											    else form.questions[j].options[k].selected = 1;
											    var checker = isUniqueResponse(form.questions[j].id.toString(), responses[i]);
									            if(checker){
									              if(form.questions[j].selected) form.questions[j].selected++;
									              else form.questions[j].selected = 1;
									            } else {
									              if(guage){
									                if(form.questions[j].selected) form.questions[j].selected++;
									                else form.questions[j].selected = 1;
									                guage = false;
									              }
									            }
											} else {
											  if(responses[i][n].response != undefined){
												  var sentiment = Sentiment(responses[i][n].response);
											      if(form.questions[j].options[k].selected) {
											    	  form.questions[j].options[k].score.push(sentiment.score);
											    	  form.questions[j].options[k].comparative.push(sentiment.comparative);
											    	  form.questions[j].options[k].selected++;
											    	  form.questions[j].selected++;
											      } else {
											    	  form.questions[j].options[k].score = ['Score',sentiment.score];
											    	  form.questions[j].options[k].comparative = ['Relevance',sentiment.comparative];
											    	  form.questions[j].options[k].selected = 1;
											    	  form.questions[j].selected = 1;
											      }
											  }											      
											}
										}
									}
								}
							}
						}
					}
					if(responses.length) form.responded = responses.length;
					else form.responded = 0;
					return cb(null, form);
				}	
			});
		});
	} else return cb({type:'!No Object To Create'}, Obj);
};


module.exports.requestedResponse = function(Obj, cb){
	if(Obj){
		Request(Obj, function(err, respondants){
			if(err) return cb(err, Obj);
			else return cb(null, respondants);
		});
	}
	
};