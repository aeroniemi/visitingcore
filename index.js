var express = require('express');
var exphbs  = require('express-handlebars');
var config = require('./config.js');
var app = express();
var ready = false;
var bodyParser = require('body-parser')


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
app.post('/atccareer', function (req, res) {
   res.render('index', { txtName: req.body.txtName });
}

app.listen(59961, function () {
	console.log('online on port 80');
});


