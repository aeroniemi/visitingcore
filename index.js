var express = require('express');
var exphbs  = require('express-handlebars');
var config = require('./config.js');
var app = express();
var ready = false;
var bodyParser = require('body-parser');
var mailgunjs = require('./mailgun.js');

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
	module.exports = { 
			Fname: req.body.Fname,
  			cid: req.body.cid,
 			emailadd: req.body.emailadd,
  			division: req.body.division,
  			vacc: req.body.vacc
	};
	setTimeout({
	res.render('index');
	console.log('it works');
	
	mailgunjs().catch(function(){
		console.log("error with mailgun")
	}).then(function (){
			db.insert(req.body);
		console.log(req.body);
		console.log(req.body.cid);

	}), 2000)});


app.listen(config.port, function () {

	console.log('online on port ' + config.port);
});


