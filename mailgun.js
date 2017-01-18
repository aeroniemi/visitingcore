var mgconfig = require('./static/src/mailgunconfig.js');
var mailgun = require('mailgun-js')({apiKey: mgconfig.api_key, domain: mgconfig.domain});
var createEmail = function (data) {
	return {
		from: 'visitingcore <alex.beavil@rovacc.ro>',
		to: "alex.beavil@rovacc.ro",
		subject: data.cid + ' - Hello!',
		text: 'a systems test: division=' + data.division
	};
};


module.exports = function(data){
	return new Promise(function (resolve, reject){
			mailgun.messages().send(createEmail(data), function (error, body) {
	console.log(body + ":");
				console.log(error);
				console.log(data.emailadd);
				resolve("mail delivery status notifyed")

				});
	});


};
