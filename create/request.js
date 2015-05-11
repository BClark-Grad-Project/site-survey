var Model = require('./../config').request;

module.exports = function(Obj, cb){
    var survey     = Obj.survey;
    var name       = Obj.name;
    var type       = "";
    var value      = "";

    if(Obj.email){
    	value = Obj.email;
    	type  = 'email';
    } else if(Obj.tel){
    	value = Obj.tel;
    	type  = 'tel';
    }
    
	var model = new Model({
	    survey:    survey,
	    name:      name,
		type:      type,
		value:     value
	});	
	
	model.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, model.getData());
    });
};