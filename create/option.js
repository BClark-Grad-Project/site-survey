var Model = require('./../config').option;

module.exports = function(Obj, cb){
    var survey   = Obj.survey;
    var question = Obj.question;
    var option   = Obj.option;

    var response           = Obj.response ? Obj.response : undefined;
    var label              = Obj.label ? Obj.label : undefined;
    var label_placeholder  = Obj.label_placeholder ? Obj.label_placeholder : undefined;
    var placeholder        = Obj.placeholder ? Obj.placeholder : undefined;
    
	var model = new Model({
	    option:            option,
	    survey:            survey,
	    question:          question,
	    response:          response,
	    label:             label,
	    label_placeholder: label_placeholder,
	    placeholder:       placeholder
	});	
	
	model.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, model.getData());
    });
};