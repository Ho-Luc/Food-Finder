var url = require('url');
var Yelp = require('yelp');

function loadYelpSearch(req, res) {
    var foodBanks = {};
    foodBanks.all = [];
    var yelp = new Yelp({
        consumer_key: 'dVH3imXJeAlRaAD6cbphoQ',
        consumer_secret: 'TJvAkxhIkFgccCRTdc_57h7Hlhw',
        token: 'ZVolrF0alQEkhpimxOWzYAcgqCrCxc1j',
        token_secret: 'eV_RwX15bxPaGcYJGBOZ64N144U',
  });

    var url_parts = url.parse(req.url, true);
    var query=url_parts.query;
    yelp.search({
        category_filter: 'foodbanks',
        location: 'Seattle',
        term: query.query

      }).then(function (data) {
        console.log(data);
        // res.send(data);

      }).catch(function (err) {
        console.error(err);
      });

    foodBanks.requestYelp = function(callback) {
      $.get('https://api.yelp.com/v2/search/?location=Seattle, WA&category_filter=foodbanks')
        .done(function(data, message, xhr) {
          foodBanks.all = data;
        }).done(callback);
    };

    foodBanks.with = function(attr) {
      return foodBanks.all.filter(function(foodbank) {
        return foodbank[attr];
      });
    };

}
var exports = module.exports = {};
exports.loadYelpSearch = loadYelpSearch;
