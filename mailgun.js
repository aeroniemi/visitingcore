var mgconfig = require('./static/src/mailgunconfig.js');
var mailgun = require('mailgun-js')({apiKey: mgconfig.api_key, domain: mgconfig.domain});

var data = {
	from: 'visitingcore <alex.beavil@rovacc.ro>',
	to: 'alex.beavil@rovacc.ro',
	subject: 'Hello',
	text: 'a systems test'
};


module.exports = function(acmail){
	return new Promise(function (resolve, reject){
			mailgun.messages().send(data, function (error, body) {
	console.log(body);
				resolve("mail delivery status notifyed")

				});
	});


};