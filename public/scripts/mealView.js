(function(module){
  var mealView = {};

  // var render = function(article){
  // // handlebar template script
  // }


 mealView.populateFilters = function(){
   $('meals').each(function(){
     if(!$(this).hasClass('template')) {
       var val = $(this).find('address a').text();
       var optionTag = '<option value="' + val + '">' + val + '</option>';
       $('#meal-filter').append(optionTag);
     }

   })
/// populate separate dropdowns with meal types, demographic(s) served, and time

// mealView.allMeals(function(rows){
//   // append all meal types (lunch, dinner, etc) to dropDown menu filter.
// }

// mealView.allPeople(function(rows){
//   // append all demographics served to dropDown menu filter.
// }
//
// mealView.allTimes(function(rows){
//   // append all available hours to dropDown menu filter.
}
//
}
//
// mealView.handleFilters = function(){
// // handling the events.
//
//   }
//
//   mealView.index = function(articles){
//     //initiate page/dom queries and call populateFilters and handleFilters;
//
//     // mealView.populateFilters();
//     // mealView.handleFilters();
//
  // }
}

module.mealView = mealView;


})(window);
