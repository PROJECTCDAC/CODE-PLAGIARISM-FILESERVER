var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');
var fs = require('fs');
var cors = require('cors')
var app = express();
app.use(bodyParser.json());
app.use(cors())

var student;
var subject;

var content = {};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
	if (!fs.existsSync( './uploads/' + subject)){		
		fs.mkdirSync('./uploads/' + subject);
	} 
	if (!fs.existsSync( './uploads/' + subject + '/' + student)){
		fs.mkdirSync('./uploads/' + subject + '/' + student);
	}    	
	callback(null, './uploads/' + subject + '/' + student);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({ storage :storage }).single('file',"student","subject");

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.get('/upload/:subject/:student', function(req,res){
console.log(req.params.student);
console.log(req.params.subject);
student = req.params.student;
subject = req.params.subject;
});

app.post('/upload',upload, function(req,res){
			res.json
			({
				fileURL: `/uploads/${subject}/${student}/`
			});
});

/*
app.post('/file', function(req,res){
		var fileOne = req.body.fileone;
		var fileTwo = req.body.filetwo;
		console.log("file request received for files : " + fileOne + " " + fileTwo);
		//content['contentOne'] = fs.readFileSync(fileOne).toString(); 
		//content['contentTwo'] = fs.readFileSync(fileTwo).toString();
		
		//res.json({content});
});
*/

app.get('/file/:fileOne/:fileTwo', function(req,res){
		var fileOne = req.params.fileOne;
		var fileTwo = req.params.fileTwo;
		content['contentOne'] = fs.readFileSync("F:/Temporary/" + fileOne).toString(); 
		content['contentTwo'] = fs.readFileSync("F:/Temporary/" + fileTwo).toString();
		
		res.json({content});
});
app.listen(2000,function(){
    console.log("Working on port 2000");
});