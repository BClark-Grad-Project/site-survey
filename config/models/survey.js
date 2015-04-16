var mongo  = require('mongoose');

var SurveySchema = mongo.Schema({
    user:        {type: mongo.Schema.Types.ObjectId, ref:  'User', required: true},
    name:        {type: String, required:true},
    catagory:    {type: String, required:true},
    description: {type: String, required:true},
    start:       {type: Date},
    end:         {type: Date},
    conductor:   {type: String},
    website:     {type: String},
    email:       {type: String},
    header:      {type: String},
    response:    {type: String},
    state:       {type: Number, 'default': 0},
    active:      {type: Boolean, 'default': true}
});

SurveySchema.methods.getData = function(){
	return {
  	  id:          this._id,
	  user:        this.user,
      name:        this.name,
      catagory:    this.catagory,
      description: this.description,
      start:       this.start,
      end:         this.end,
      conductor:   this.conductor,
      website:     this.website,
      email:       this.email,
      header:      this.header,
	  response:    this.response,
	  state:       this.state,
	  active:      this.active
	};
};

module.exports = SurveySchema;
