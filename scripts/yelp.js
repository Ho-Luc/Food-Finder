(function(module){
  var foodBanks = {};
  foodBanks.all = [];

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

  module.foodBanks = foodBanks;

})(window);
