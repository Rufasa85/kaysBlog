const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const db = require('./models')

app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res) {
	res.render('index')
});

app.get('/new',function(req,res) {
	res.render('new')
});

app.post('/', function(req,res) {
	res.send(req.body);
})

app.listen(process.env.PORT || 3000);