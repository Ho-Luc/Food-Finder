page('/',
homeController.index);

page('/finder',
mealController.loadAll,
mealController.index );

page('/resources', resourcesController.index);

page('/about', aboutController.index);

// default filter option:
// page('/mealType', '/');

//there needs to be a route for the meal dropdown :
// page('/mealType/:mealType',
// mealController.loadByMealType,
// mealController.index);

page();

//added pseudo routes and commented these out as we do not have functions to run once routes are clicked
