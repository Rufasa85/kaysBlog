const express = require('express');
const app = express();
const db = require('./models')

app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	res.render('index')
});

app.listen(process.env.PORT || 3000);