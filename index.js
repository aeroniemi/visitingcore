var express = require('express');
var exphbs  = require('express-handlebars');
var config = require('./config.js');
var app = express();
var hbs = require('hbs');
require('handlebars-form-helpers').register(hbs.handlebars);
var latestTemp;
var latestPressure;
var latestHumidity;
var latestTime;
var ready = false;

var Datastore = require('nedb');
var dateFormat = require('dateformat');
var open = new Date();
var db = new Datastore({ filename: 'latest.txt', autoload: true }); // rename to dbLatest
 


var counter = 0;



app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');
app.use(express.static('static'));

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


app.listen(59961, function () {
	console.log('online on port 80');
});