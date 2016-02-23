
  var render = function(article){
  // handlebar template script if necessary.
  }


 mealView.populateFilters = function(){
/// populate separate dropdowns with meal types, demographic(s) served, and time
  var template = Handlebars.compile($('#XXXhandlebar-template').text());

//Meals.allMeals() -- placeholder method for yet to be created/or otherwise named array that will hold all meal types. The following is intended to populate a select menu with available meal types(breakfast, etc). This, and the rest of these menu-filter populating options are dependent upon the data being in a SQL db.
   Meals.allMeals(function(rows){
     if($('#meal-filter option').length < 2){
       $('#meal-filter').append(
         rows.map(function(row){
           return template({val:row.meals});
         })
       );
     };
   });

//Meals.allDemographic() -- placeholder method for yet to be created/or otherwise named array that will hold the demographics served by the various food banks. The following is intended to populate a select menu with those demographics(i.e. women, children, elderly men, etc).


   Meals.allDemographic(function(rows){
     if($('#demographic-filter option').length < 2){
       $('#demographic-filter').append(
         rows.map(function(row){
           return template({val:row.demographic});
         })
       );
     };
   });

   //Meals.allTimes() -- placeholder method for yet to be created/or otherwise named array that will hold the times of day served by the various food banks. The following is intended to populate a select menu with those times. Due to the original state of the JSON data, more filtering might be needed.

   Meals.allTimes(function(rows){
     if($('#time-filter option').length < 2){
       $('#time-filter').append(
         rows.map(function(row){
           return template({val:row.time});
         })
       );
     };
   });

   //Meals.allDays() -- placeholder method for yet to be created/or otherwise named array that will hold days served by the various food banks. The following is intended to populate a select menu with those times. Due to the original state of the JSON data, more filtering might be needed.

   Meals.allDays(function(rows){
     if($('#day-filter option').length < 2){
       $('#day-filter').append(
         rows.map(function(row){
           return template({val:row.day});
         })
       );
     };
   });

 };


mealView.handleFilters = function(){
// handling the events.
$('#filters').one('change', 'select', function(){
   /// In conjunction with the value input into the zip code search box, this method will populate a google map with the user-filtered choices.
})
  }

  mealView.index = function(articles){
    //initiate page/dom queries and call populateFilters and handleFilters; DOM manipulation to be decided based on future Index.html scaffolding. The following calls are commented out until their corresponding methods are completed.

    $('#resources').hide();
    $('#about').hide();

    // mealView.populateFilters();
    // mealView.handleFilters();

  }
}

module.mealView = mealView;


})(window);
