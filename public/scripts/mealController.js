(function(module){
 var mealController = {};

 Meal.createTable();

mealController.index = function(ctx, next) {
  mealView.index(ctx.mealz);
};

mealController.loadAll = function(ctx, next) {
  var mealzData = function() {
    ctx.mealz = Meal.all;
    next();
  };

  if(Meal.all.length) {
    ctx.mealz = Meal.all;
    next();
  } else {
    Meal.fetchAll(mealzData);
  }
};

// mealController.loadByMealType = function(ctx, next){
//   console.log('controller running');
//   var mealData = function(meal){
//     ctx.mealz = meal;
//     next();
//   };
//   Meal.findWhere('mealType', whatwasselected, mealData);
// }


 module.mealController = mealController;
})(window);
