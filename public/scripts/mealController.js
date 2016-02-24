(function(module){
 var mealController = {};

 Meal.createTable();

mealController.index = function(){
  Meal.fetchAll(mealView.initIndexPage);
};

// mealController.loadByMealType = function(ctx, next){
//   var mealData = function(meal){
//     ctx.articles = meal;
//     next();
//   };
//   mealData.findWhere('x', ctx.params.id, mealData);
// }


 module.mealController = mealController;
})(window);
