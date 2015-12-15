var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var exec = require('child_process').exec;

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
      // res.send("test");
      exec('python /usr/tmp/tensorflow/tensorflow/models/image/imagenet/classify_image.py --image_file /usr/tmp/node/image/public/uploads/' + fileName, function(err, stdout, stderr){
        res.send(stdout);
      });
    });
  });
});

module.exports = router;
