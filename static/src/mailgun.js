var mgconfig = require('./././././mailgunconfig.js');
var mailgun = require('mailgun-js')({apiKey: mgconfig.api_key, domain: mgconfig.domain});

var data = {
	from: 'Excited User <me@samples.mailgun.org>',
	to: 'serobnic@mail.ru',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};


module.exports = function(acmail){
	return new Promise(function (resolve, reject){
			mailgun.messages().send(data, function (error, body) {
	console.log(body);
				resolve("mail delivery status notifyed")

				});
	});


};
