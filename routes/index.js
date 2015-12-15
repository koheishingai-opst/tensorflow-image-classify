var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var exec = require('child_process').exec;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/photos/upload', function(req, res, next) {
  var form;
  form = new multiparty.Form();
  return form.parse(req, function(err, fields, files) {
    var filePath = files["file-7[]"][0]["path"];
    var fileName = files["file-7[]"][0]["originalFilename"];
    exec('mv ' + filePath + ' ./public/uploads/' + fileName, function(err, stdout, stderr){
      res.send("drumstick (score = 0.11282) academic gown, academic robe, judge's robe (score = 0.05533) mortarboard (score = 0.04146) theater curtain, theatre curtain (score = 0.03298) groom, bridegroom (score = 0.03183)");
      /*exec('python /usr/tmp/tensorflow/tensorflow/models/image/imagenet/classify_image.py --image_file /usr/tmp/node/image/public/uploads/' + fileName, function(err, stdout, stderr){
        console.log(stdout);
        res.send(stdout);
      });*/
    });
  });
});

router.post('/photos/update', function(req, res, next) {
  console.log(req.body);
  res.send('update!');
});

module.exports = router;
