var mongo  = require('mongoose');

var Schema = mongo.Schema({
    option:      {type: String, required:true},
    survey:      {type: mongo.Schema.Types.ObjectId, ref: 'Survey', required: true},
    question:    {type: mongo.Schema.Types.ObjectId, ref: 'Question', required: true},
    response:    {type: String},
    label:       {type: String, 'default':'Other'},
    placeholder: {type: String},
    label_placeholder: {type: String},
    active:      {type: Boolean, 'default': true}
});

Schema.methods.getData = function(){
	if(this.option == 'provide') return {
	  	  id:          this._id,
		  survey:      this.survey,
	      question:    this.question,
	      option:      this.option,
	      response:    this.response,
		  active:      this.active
		};
	else if(this.option == 'provided') return {
	  	  id:                this._id,
		  survey:            this.survey,
	      question:          this.question,
	      option:            this.option,
	      label:             this.label,
	      label_placehlder:  this.label_placeholder,
		  active:            this.active
		};		
	else if(this.option == 'opinion') return {
	  	  id:          this._id,
		  survey:      this.survey,
	      question:    this.question,
	      option:      this.option,
	      placehlder:  this.placeholder,
		  active:      this.active
		};		
	else return {
  	  id:          this._id,
	  survey:      this.survey,
      question:    this.question,
      option:      this.option,
      response:    this.response,
      label:       this.label,
      placehlder:  this.placeholder,
	  active:      this.active
	};
};

module.exports = Schema;
