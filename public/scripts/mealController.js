(function(module){
 var mealController = {};

 // Meal.createTable();

mealController.index = function(ctx, next){
  mealView.index(ctx.articles);
};

mealControler.loadByMealType = funciton(ctx, next){
  var mealData = function(meal){
    ctx.articles = meal;
    next();
  };
  Article.findWhere('x', ctx.params.id, mealData);
}




})
