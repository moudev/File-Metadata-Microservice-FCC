'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var uploadFile = multer({dest: './assets/'});

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse',function(req,res,next){
  console.log('Empezando a subir el archivo');
  var result = uploadFile.single('upfile');
  console.log(typeof result);
  result(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
    }
    console.log(req.file);
    return (!req.file) ? res.end(JSON.stringify({name:null,size:null})) : res.end(JSON.stringify({name:req.file.originalname,size:req.file.size}))
 
    // Everything went fine
  })
});



app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
