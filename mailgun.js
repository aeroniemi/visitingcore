var mgconfig = require('./static/src/mailgunconfig.js');
var mailgun = require('mailgun-js')({apiKey: mgconfig.api_key, domain: mgconfig.domain});
var emailBody = "I'm glad you're showing interest in controlling within the LBSR FIR. The next steps in this procedure is to get a reference from your local training department. This should be sent to publicrelation@rovacc.ro at their earliest convenience, and within the next 7 days. \
Should this not be recived, your application will be canceled, and you be unable to apply ";
var createEmail = function (data) {
	return {
		from: 'visitingcore <alex.beavil@rovacc.ro>',
		to: data.emailadd,
		subject: data.cid + ' - Hello!',
		text: 'Hello ' + data.Fname + ',' + emailBody
	};
};


module.exports = function(data){
	return new Promise(function (resolve, reject){
			mailgun.messages().send(createEmail(data), function (error, body) {
				resolve("mail delivery status notifyed")

				});
	});


};
