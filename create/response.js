var Model = require('./../config').response;

module.exports = function(Obj, cb){
    var survey     = Obj.survey;
    var question   = Obj.question;
    var option     = Obj.option;
    var respondant = Obj.respondant;

    var user      = Obj.user       ? Obj.user       : undefined;
    var request   = Obj.request    ? Obj.request    : undefined;
    var date      = Obj.date       ? Obj.date       : undefined;
    var response  = Obj.response   ? Obj.response   : undefined;
    
	var model = new Model({
	    option:    option,
	    survey:    survey,
	    question:  question,
		user:      user,
		request:   request,
		date:      date,
	    response:  response,
		respondant:respondant
	});	
	
	model.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, model.getData());
    });
};