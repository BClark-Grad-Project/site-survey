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
						newOption.question = question.id;					
						if(Obj.label) newOption.label = Obj.label;
						if(Obj.response) newOption.response = Obj.response;
						if(Obj.placeholder) newOption.placeholder = Obj.placeholder;
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