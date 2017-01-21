var express = require('express');
var exphbs  = require('express-handlebars');
var config = require('./config.js');
var app = express();
var ready = false;
var bodyParser = require('body-parser');
var mailgunjs = require('./mailgun.js');
var OAuth= require('oauth').OAuth;

var Datastore = require('nedb');
var dateFormat = require('dateformat');
var open = new Date();
var db = new Datastore({ filename: 'latest.txt', autoload: true }); 
var visitdb = new Datastore({ filename: 'visit.txt', autoload: true });

var oa = new OAuth(config.oauth);


app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');
app.use(express.static('static'));

app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/auth/vatsim', function(req, res){
    oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
        if (error) {
            console.log(error);
            res.send("yeah no. didn't work.")
        }
        else {
            req.session.oauth = {};
            req.session.oauth.token = oauth_token;
            console.log('oauth.token: ' + req.session.oauth.token);
            req.session.oauth.token_secret = oauth_token_secret;
            console.log('oauth.token_secret: ' + req.session.oauth.token_secret);
            res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token)
        }
    });
});

app.get('/auth/vatsim/callback', function(req, res, next){
    if (req.session.oauth) {
        req.session.oauth.verifier = req.query.oauth_verifier;
        var oauth = req.session.oauth;

        oa.getOAuthAccessToken(oauth.token,oauth.token_secret,oauth.verifier,
                               function(error, oauth_access_token, oauth_access_token_secret, results){
            if (error){
                console.log(error);
                res.send("yeah something broke.");
            } else {
                req.session.oauth.access_token = oauth_access_token;
                req.session.oauth,access_token_secret = oauth_access_token_secret;
                console.log(results);
                res.send("worked. nice one.");
            }
        }
                              );
    } else
        next(new Error("you're not supposed to be here."))
        });
app.get('/override', function (req, res) {

    res.render("override", {
        ready: true,

    });
});

app.get('/', function (req, res) {

	res.render("index");
});

app.get('/override', function (req, res) {

	res.render("override", {
		ready: true,

	});
});
app.get('/atctransfer', function (req, res) {
	res.render("atcform1", {
        transfer: true
        });
});
app.get('/atcvisit', function (req, res) {
	res.render("atcform1", {
        visit: true
        });
});
app.get('/atccareer', function (req, res) {
	res.render("atcform1", {
        care: true
        });
});
app.post('/atccareer', function (req, res) {
	res.render('formsubmit1');
	console.log('it works');
	mailgunjs(req.body).catch(function(){
		console.log("error with mailgun");
	}).then(function (){
		db.insert(req.body);
		console.log(req.body);
	});
});
app.post('/.$atcform*/', function (req, res) {
	res.render('formsubmit1');
	mailgunjs(req.body).catch(function(){
	}).then(function (){
		visitdb.insert(req.body);
	});
});

app.listen(config.port, function () {
	console.log('online on port ' + config.port);
});
