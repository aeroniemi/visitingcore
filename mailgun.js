var mgconfig = require('./static/src/mailgunconfig.js');
var mailgun = require('mailgun-js')({apiKey: mgconfig.api_key, domain: mgconfig.domain});

var template = {
	from: 'visitingcore <alex.beavil@rovacc.ro>',
	to: data.emailadd,
	subject: data.cid + ' - Hello!',
	text: 'a systems test: division=' + data.division
};


module.exports = function(){
	return new Promise(function (resolve, reject){
			mailgun.messages().send(template, function (error, body) {
	console.log(body + ":");
				console.log(error);
				console.log(req.body);
console.log(req.body.cid);
				resolve("mail delivery status notifyed")

				});
	});


};
