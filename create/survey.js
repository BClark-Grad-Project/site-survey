var Survey = require('./../config').survey;

module.exports = function(Obj, cb){
    if(!Obj.user){ return cb('!No Survey Creator', Obj);}

    var user      = Obj.user;
    
	var survey = new Survey({
	    user:      user
	    });	
	
	survey.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, survey.getData());
    });
};