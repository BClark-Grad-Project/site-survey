var Survey = require('./survey');

module.exports.survey    = Survey;

module.exports = function(Obj, cb){
	if(Obj){
		
	} else {
		return cb('!No Object To Create', Obj);
	}
};
