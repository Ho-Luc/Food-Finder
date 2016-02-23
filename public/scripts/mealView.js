(function(module) {

var mealView = {};


 mealView.populateFilters = function(){
   $('article').each(function() {
     if (!$(this).hasClass('template')) {
       var val = $(this).find('li h4').text();
       var optionTag = '<option value="' + val + '">' + val + '</option>';
       $('#mealtype-filter').append(optionTag);


     };
   });

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

     mealView.handleMainNav = function() {
    $('.main-nav').on('click', '.tab', function(e) {
      $('.tab-content').hide();
      $('#' + $(this).data('content')).fadeIn();
    });

    $('.main-nav .tab:first').click();
  };

  mealView.initIndexPage = function() {
    Meal.all.forEach(function(a){
      $('#finder').append(a.toHtml())
    });

    mealView.populateFilters();
    mealView.handleMealFilter();
    mealView.handleMainNav();

  };

};

module.mealView = mealView;
})(window);
