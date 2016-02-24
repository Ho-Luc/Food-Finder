(function(module){
 var mealController = {};

 Meal.createTable();

mealController.index = function(ctx, next){
  mealView.index(ctx.mProgram);
};

mealController.loadByMealType = function(ctx, next){
  var mTypeData = function(mealCategory){
    ctx.mProgram = mealCategory;
    next();
  };
  Meal.findWhere('mealType', ctx.params.mealType, mTypeData);
}

mealController.loadAll = function(ctx, next){
  var mTypeData = function(allMealPrograms) {
    ctx.mProgram = Meal.all;
    next();
  };

  if (Meal.all.length) {
    ctx.mProgram = Meal.all;
    next();
  } else {
    Meal.fetchAll(mTypeData);
  }
};


module.mealController = mealController;

})(window);
