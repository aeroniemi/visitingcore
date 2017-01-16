var express = require('express');
var exphbs  = require('express-handlebars');
var config = require('./config.js');
var app = express();
var ready = false;
var bodyParser = require('body-parser');
var mailgunjs = require('static/src/mailgun.js');

var Datastore = require('nedb');
var dateFormat = require('dateformat');
var open = new Date();
var db = new Datastore({ filename: 'latest.txt', autoload: true }); 

app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');
app.use(express.static('static'));

app.use(bodyParser.urlencoded({
	extended: true
}));


app.get('/', function (req, res) {

	res.render("index", {
		ready: true,

	});
});

app.get('/override', function (req, res) {

	res.render("override", {
		ready: true,

	});
});
app.get('/atccareer', function (req, res) {

	res.render("atccareer", {
		ready: true,
	});


});
app.post('/atccareer', function (req, res) {
	res.render('index');
	console.log('it works');
	db.insert(req.body);
	mailgunjs(acmail).catch(function(){
		console.log("error with mailgun")
	}).then(){
		db.update({ cid: req.body.cid }, { emailsent: true }, function (err, numReplaced, upsert) {
	};

});


app.listen(config.port, function () {

	console.log('online on port' + config.port);
});


