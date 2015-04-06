var mongo  = require('mongoose');

var SurveySchema = mongo.Schema({
    user:        {type: mongo.Schema.Types.ObjectId, ref:  'User', required: true},
    active:      {type: Boolean, 'default': true}
});

SurveySchema.methods.getData = function(){
	return {
  	  id:          this._id,
	  user:        this.user,
	  active:      this.active
	};
};

module.exports = SurveySchema;
