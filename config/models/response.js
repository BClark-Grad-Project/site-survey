var mongo  = require('mongoose');

var Schema = mongo.Schema({
    survey:      {type: mongo.Schema.Types.ObjectId, ref: 'Survey', required: true},
    question:    {type: mongo.Schema.Types.ObjectId, ref: 'Question', required: true},
    option:      {type: mongo.Schema.Types.ObjectId, ref: 'Option', required: true},
    user:        {type: mongo.Schema.Types.ObjectId, ref: 'User'},
    request:     {type: mongo.Schema.Types.ObjectId, ref: 'Request'},
    respondant:  {type: String, required: true},
    date:        {type:Date, 'default': Date.now},
    response:    {type: String},
    active:      {type: Boolean, 'default': true}
});

Schema.methods.getData = function(){
	return {
  	  id:          this._id,
	  survey:      this.survey,
      question:    this.question,
      option:      this.option,
	  user:        this.user,
	  request:     this.request,
	  date:        this.date,
      response:    this.response,
	  respondant:  this.respondant,
	  active:      this.active
	};
};

module.exports = Schema;
