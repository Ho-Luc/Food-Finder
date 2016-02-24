(function(module){
 var mealController = {};

 Meal.createTable();

mealController.index = function(ctx, next){
 mealView.index(ctx.mealz);
};

mealController.loadByMealType = function(ctx, next){
  var mealData = function(meal){
    ctx.mealz = meal;
    next();
  };
  mealData.findWhere('id', ctx.params.id, mealData);
}


 module.mealController = mealController;
})(window);
