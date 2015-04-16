var Survey = require('./../config').survey;

module.exports = function(Obj, cb){
    if(!Obj.user){ return cb({type:'!No Survey Creator'}, Obj);}

    var user        = Obj.user;
    var name        = Obj.name;
    var description = Obj.description;
    var catagory    = Obj.catagory;
    var start       = Obj.start;
    var end         = Obj.end;
    var conductor   = Obj.conductor;
    var website     = Obj.website;
    var email       = Obj.email;
    var response    = Obj.response;
    var header      = Obj.header;
    
	var survey = new Survey({
	    user:        user,
	    name:        name,
	    catagory:    catagory,
	    description: description,
	    start:       start,
	    end:         end,
	    conductor:   conductor,
	    website:     website,
        email:       email,
	    header:      header,
	    response:    response
	});	
	
	survey.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, survey.getData());
    });
};