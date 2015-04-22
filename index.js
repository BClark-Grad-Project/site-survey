/**
 * Survey data sets.
 * Author : Brandon Laurence Clark
 * License: MIT
 */

// Get the database(db) configuration & functions.
var db = require('./config');

// C.R.U.D. functions.
var C = require('./create');
var R = require('./read');
var U = require('./update');
var D = require('./delete');

module.exports.create = function(Obj, cb){	
	  if(Obj){
		 C(Obj, function(err, data){
			    if(err) return cb(err, null);
			    else return cb(null, data);
		 });
	  } else return cb({type:'!No object'}, Obj);
};

module.exports.read = function(Obj, cb){
	if(Obj){
		R(Obj, function(err, data){
			if(err) return cb(err, Obj);
			else return cb(null, data);
		});
	} else return cb({type:'!No object'}, Obj);
};

module.exports.update = function(Obj, cb){
	if(Obj){
		U(Obj, function(err, data){
			if(err) return cb(err, null);
			else {
				if(Obj.question){
					if(Obj.question.option){
						var newOption = {};
						newOption.survey = Obj.question.survey;
						newOption.question = Obj.question.id;					
						newOption.option = Obj.question.option;
						if(Obj.question.label) newOption.label = Obj.question.label;
						if(Obj.question.response) newOption.response = Obj.question.response;
						if(Obj.question.placeholder) newOption.placeholder = Obj.question.placeholder;
						if(Obj.question.label_placeholder) newOption.label_placeholder = Obj.question.label_placeholder;
						C({option:newOption}, function(err, option){
							if(err) return cb(err, Obj);
							else {
								data.option = option;
								return cb(null, data);
							}
						});
					} else return cb(null, data);
				} else return cb(null, data);
			}
		});
	} else return cb({type:'!No object'}, Obj);
};

module.exports.remove = function(Obj, cb){
	if(Obj){
		D(Obj, function(err, data){
		    if(err) return cb(err, null);
		    else return cb(null, data);
		});
	} else return cb({type:'!No object'}, Obj);
};