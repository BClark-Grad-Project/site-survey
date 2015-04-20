var Model = require('./../config').option;

module.exports = function(Obj, cb){
    var survey        = Obj.survey;
    var question      = Obj.question;
    
	var model = new Model({
	    survey:        survey,
	    question:      question
	});	
	
	model.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, model.getData());
    });
};