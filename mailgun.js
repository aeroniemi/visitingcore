var mgconfig = require('./static/src/mailgunconfig.js');
var mailgun = require('mailgun-js')({apiKey: mgconfig.api_key, domain: mgconfig.domain});
var index = require("./index.js");
var template = {
	from: 'visitingcore <alex.beavil@rovacc.ro>',
	to: "alex.beavil@rovacc.ro",
	subject: index.cid + ' - Hello!',
	text: 'a systems test: division=' + index.division
};


module.exports = function(){
	return new Promise(function (resolve, reject){
			mailgun.messages().send(template, function (error, body) {
	console.log(body + ":");
				console.log(error);
				console.log(index.emailadd);
				resolve("mail delivery status notifyed")

				});
	});


};
