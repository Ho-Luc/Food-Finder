//require() is node.js's module loading system
var express = require('express');
//load url and this variable is used below
// var url = require('url');
// var fs = require('fs');
//inintializes express app
var app = express();
// var yelpJS = require(__dirname + '/scripts/yelp.js');
//
app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
// 
