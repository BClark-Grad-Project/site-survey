var Model = require('./../config').question;

module.exports = function(Obj, cb){
    var survey    = Obj.survey;
    var question  = Obj.question;
    var type      = Obj.type;
    
	var model = new Model({
	    survey:    survey,
	    question:  question,
	    type:      type
	});	
	
	model.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, model.getData());
    });
};