const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models')
const cloudinary = require('cloudinary');
const apiKeys = require('./static/js/apikeys.js');

app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:false}));

cloudinary.config({
	cloud_name:apiKeys.cloudName,
	api_key:apiKeys.apiKey,
	api_secret:apiKeys.apiSecret
})

app.get('/', function(req, res) {
	res.render('index')
});

app.get('/new',function(req,res) {
	res.render('new')
});

app.post('/', function(req,res) {
	// if (req.body.picone) {
	// 	cloudinary.uploader.upload
	// }
	db.post.create({
		title:req.body.title,
		post:req.body.body,
		picone:req.body.picOne,
		pictwo:req.body.picTwo,
		date:new Date()
	}).then(function(post) {
		res.send(post);
	})
	// res.send(req.body);
})

app.listen(process.env.PORT || 3000);