var mongo  = require('mongoose');

var Schema = mongo.Schema({
    survey:      {type: mongo.Schema.Types.ObjectId, ref:  'Survey', required: true},
    type:        {type: String, required:true},
    name:        {type: String, required:true},
    value:       {type: String, required:true},
    sent:        {type: String},
    status:      {type: Boolean, 'default': false}
});

Schema.methods.getData = function(){
	return {
  	  id:          this._id,
	  survey:      this.survey,
      type:        this.type,
      name:        this.name,
      value:       this.value,
      sent:        this.sent,
	  status:      this.status
	};
};

module.exports = Schema;
