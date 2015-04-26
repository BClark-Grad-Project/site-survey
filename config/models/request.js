var mongo  = require('mongoose');

var Schema = mongo.Schema({
    survey:      {type: mongo.Schema.Types.ObjectId, ref:  'Survey', required: true},
    type:        {type: String, required:true},
    question:    {type: String, required:true},
    active:      {type: Boolean, 'default': true}
});

Schema.methods.getData = function(){
	return {
  	  id:          this._id,
	  survey:      this.survey,
      type:        this.type,
      question:    this.question,
	  active:      this.active
	};
};

module.exports = Schema;
