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

    googleMap.initMap();
    googleMap.getLatLong(mealView.filteredData);
    // googleMap.requestGeocoding(mealView.filteredData);
  });

module.mealView = mealView;
})(window);
