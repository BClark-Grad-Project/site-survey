var Survey   = require('./survey');
var Question = require('./question');
var Option   = require('./option');
var Response = require('./response');
var Request  = require('./request');

var uuid = require('node-uuid');
var nodemailer = require('nodemailer');
var mailAuth = require('/opt/gmail/gmail.json');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: mailAuth
});

var sendMail = function(Obj){
	var name = 'Friend';
	if(Obj.name != Obj.value){
		name = Obj.name;
	}
	var mailOptions = {
	    from: 'Mind Research Request <projectmindresearch@gmail.com>', // sender address
	    to: Obj.value, // list of receivers
	    subject: 'Request for questionnaire response.', // Subject line
	    html: '<b>Hello ' + name + '</b>,<br><br><p> I am currently conducting a questionnaire in which I would appreciate your response to.  You can directly access it at https://themindspot.com/survey/' + Obj.survey + '/' + Obj.id + ' or with this link: </p><br><a href="https://themindspot.com/survey/' + Obj.survey + '/' + Obj.id + ' + ">Questionnaire Link</a>'// html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	});	
};

module.exports = function(Obj, cb){
	if(Obj){
		if(Obj.question) {
			var newQ = {};
			newQ.survey = Obj.question.survey;
			newQ.question = Obj.question.question;
			newQ.type = Obj.question.type;
			Question(newQ, function(err, question){
				if(err) return cb(err, Obj);
				else {
					if(Obj.question.option){
						var newO = {};
						newO.survey = Obj.question.survey;
						newO.question = question.id;
						newO.option = Obj.question.option;
						if(Obj.question.response) newO.response = Obj.question.response;
						if(Obj.question.label) newO.label = Obj.question.label;
						if(Obj.question.label) newO.label_placeholder = Obj.question.label_placeholder;
						if(Obj.question.placeholder) newO.placeholder = Obj.question.placeholder;
						Option(newO, function(err, option){
							if(err) return cb(err, Obj);
							else {
								question.option = option;								
								return cb(null, question);
							}
						});
					} else return cb(null, question);
				}
			});
		} else if(Obj.option) Option(Obj.option, function(err, option){
				if(err) return cb(err, Obj);
				else return cb(null, option);
			});
		else Survey(Obj, function(err, survey){
			if(err) return cb(err, Obj);
			else return cb(null, survey);});
	} else return cb({type:'!No Object To Create'}, Obj);
};

module.exports.survey    = Survey;
module.exports.question  = Question;
module.exports.option    = Option;
module.exports.response  = Response;
module.exports.request   = Request;

module.exports.respond = function(Obj){
	if(Obj){
		var responseID = uuid.v4();
		for(var i in Obj){
			Obj[i].respondant = responseID;
			Response(Obj[i], function(err, response){
				if(err) console.log('!Error creating response item', Obj[i]);
		});
	  }
	} else console.log('There was no Array to create response.');
};


module.exports.requestResponse = function(Obj){
	if(Obj[0]){
		for(var i in Obj){
			Request(Obj[i], function(err, data){
				sendMail(data);				
			});
		}
		
	}
};