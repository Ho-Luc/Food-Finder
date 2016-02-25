(function(module) {
  var mealView = {};
  mealView.filteredData = [];

  var render = function(mealz) {
    var template = Handlebars.compile($('#meal-template').text());
    return template(mealz);
  }

  mealView.populateFilters = function(){
    var template = Handlebars.compile($('#option-template').text());

    Meal.allMeals(function(rows){
      if($('#mealtype-filter option').length < 2) {
        $('#mealtype-filter').append(
          rows.map(function(row) {
            return template({val: row.mealType});
          })
        )
      }
    });
  }

  mealView.handleMealFilter = function() {
    $('#mealtype-filter').one('change', 'select', function() {
      resource = this.id.replace('-filter', '');
      page('/' + resource + '/' + $(this).val().replace(/\W+/g, '+'));
    });
  };

  mealView.index = function(mealz) {
    $('#finder').show().siblings().hide();

    mealView.populateFilters();
    mealView.handleMealFilter();
  }

  //on filter change
  $('#mealtype-filter').on('change', function(){
    $('#finder article').remove();
    var filterOpt = $(this).val();

    mealView.filteredData = Meal.all.filter(function(obj){
      return obj.mealType == filterOpt;
    });

    mealView.filteredData.forEach(function(y){
      $('.output').append(render(y));
    });

  //   mealView.filteredAddresses = function(){
  // return Meal.all.map(function(article){
  //   return article.address;
  // }).reduce(function(addresses, address){
  //   if(addresses.indexOf(address) === -1){
  //     addresses.push(address);
  //   } return addresses;},[]);};

  googleMap.initMap();
    googleMap.requestGeocoding(mealView.filteredData);

    // googleMap.addMarkers();

  });

module.mealView = mealView;
})(window);
