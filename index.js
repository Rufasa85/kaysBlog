const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models')
const cloudinary = require('cloudinary');
const apiKeys = require('./apikeys.js');
const multer = require('multer');
const uploads = multer({dest:'./uploads'});

app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:false}));

cloudinary.config({
	cloud_name:apiKeys.cloudName,
	api_key:apiKeys.apiKey,
	api_secret:apiKeys.apiSecret
})

app.get('/', function(req, res) {
	db.post.findAll().then(function(posts){
		res.render('index', {posts:posts})
	});
	// res.send(apiKeys);
});

app.get('/new',function(req,res) {
	res.render('new')
});

app.get('/:id', function (req, res) {
	db.post.find({where: {id:req.params.id}}).then(function(post) {	
		res.render('edit', {post:post});
	})
});

app.post('/', uploads.fields([
	{
		name:'picOne', 
		maxCount:1
	},
	{
		name:'picTwo',
		maxCount:1
	}]),
	function(req,res) {
	let picOne = null;
	if (req.files.picOne) {
		cloudinary.uploader.upload(req.files.picOne[0]['path'], function (result) {
			console.log(result.url);
			picOne=result.url;
			db.post.create({
				title:req.body.title,
				post:req.body.body,
				picone:picOne,
				pictwo:req.body.picTwo,
				date:new Date()
			}).then(function(post) {
			res.redirect('/');
			})
		});
	} else {
		db.post.create({
			title:req.body.title,
			post:req.body.body,
			picone:picOne,
			pictwo:req.body.picTwo,
			date:new Date()
		}).then(function(post) {
			res.redirect('/');
		})
	}
	// res.send(req.body);
});

app.post('/edit', uploads.fields([
	{
		name:'picOne', 
		maxCount:1
	},
	{
		name:'picTwo',
		maxCount:1
	}]),
	function(req,res) {
		res.send(req.body)
});


app.listen(process.env.PORT || 3000);