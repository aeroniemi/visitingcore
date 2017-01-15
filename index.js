var express = require('express');
var exphbs  = require('express-handlebars');
var config = require('./config.js');
var app = express();

var latestTemp;
var latestPressure;
var latestHumidity;
var latestTime;
var ready = false;

var Datastore = require('nedb');
var dateFormat = require('dateformat');
var open = new Date();
var db = new Datastore({ filename: 'latest.txt', autoload: true }); // rename to dbLatest
var dbDaily = new Datastore({ filename: dateFormat(open, "yyyy-mm-dd'T00:00:00'") + "day.txt", autoload: true });
 


var counter = 0;


app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');
app.use(express.static('static'));

app.get('/', function (req, res) {
	if (ready) {
		var now = new Date();
		var secondsPast = (now.getTime() - latestTime.getTime()) / 1000;
		res.render("index", {
			ready: true,
		});
	} else {
		res.render("index", {
			ready: false,
		});
	}
});



app.listen(86, function () {
	console.log('Weather station online on port 80');
});