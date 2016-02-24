page('/',
  mealController.loadAll,
  mealController.index);

page('/finder',
  mealController.loadAll,
  mealController.index );

page('/resources',
  resourcesController.index);
page('/about',
  aboutController.index);

//by filter
page('/finder/:mealType',
  mealController.loadByMealType,
  mealController.index);

page();

//added pseudo routes and commented these out as we do not have functions to run once routes are clicked
