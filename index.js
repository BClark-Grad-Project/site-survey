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
	  } else return cb('!No object', Obj);

};

module.exports.read = function(Obj, cb){
	if(Obj){
		R(Obj, function(err, data){
			if(err) return cb(err, Obj);
			else return cb(null, data);
		});
	} else return cb('!No object', Obj);
};
module.exports.update = function(Obj, cb){
	if(Obj){
		U(Obj, function(err, data){
			if(err) return cb(err, null);
			else return cb(null, data);
		});
	} else return cb('!No object', Obj);
};

module.exports.remove = function(Obj, cb){
	if(Obj){
		D(Obj, function(err, data){
		    if(err) return cb(err, null);
		    else return cb(null, data);
		});
	} else return cb('!No object', Obj);
};