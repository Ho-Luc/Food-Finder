//require() is node.js's module loading system
var express = require('express');
var Yelp = require('yelp');
//load url and this variable is used below
var url = require('url');
//inintializes express app
var app = express();

//API that app calls
app.get('/', function (req, res) {
  //request API access
    var yelp = new Yelp({
        consumer_key: '',
        consumer_secret: '',
        token: '',
        token_secret: '',
    });

    //url is used to parse query string
    // gives back an object with each part of the url in a different parameter
    var url_parts = url.parse(req.url, true);
    //query is the name of the variable that stores the query string object
    //and query is the named of the query parameter passed to the url eg localhost:3000/?query=beacon
    var query=url_parts.query;

    // Search function is from https://github.com/olalonde/node-yelp
    //See http://www.yelp.com/developers/documentation/v2/search_api
    // Term is an additional query parameter.
    // E.g. localhost:3000/?query=beacon
    yelp.search({
        category_filter: 'foodbanks',
        location: 'Seattle',
        term: query.query

    }).then(function (data) {
        console.log(data);
        res.send(data);

    }).catch(function (err) {
        console.error(err);

    });

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');

});
