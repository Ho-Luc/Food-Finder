(function(module) {

var mealView = {};

 mealView.populateFilters = function(){
   var options,
   template = Handlebars.compile($('#option-template').text());

   Meal.allMeals(function(rows) {
     if ($('#mealtype-filter option').length < 2) {
       $('mealtype-filter').append(
         rows.map(function(row) {
           return template({val: row.mealType});
         })
       );
     };
   });
 };

   mealView.handleMealFilter = function() {
       $('#mealtype-filter').on('change', function() {
         if ($(this).val()) {
           $('article').hide();
           $('article[data-category="' + $(this).val() + '"]').fadeIn();
         } else {
           $('article').fadeIn();
           $('article.template').hide();
         }
         $('#mealtype-filter').val('');
       });
     };

  mealView.index = function(finder){
    $('#finder').show().siblings().hide();
    finder.forEach(function(a) {
    $('#finder').append(a.toHtml())
    });

    mealView.populateFilters();
    mealView.handleMealFilter();
  };



module.mealView = mealView;
})(window);
