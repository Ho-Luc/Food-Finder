// page('/',
// mealController.loadAll,
// homeController.index);
//
// page('/finder', mealController.loadAll,
//  mealController.index );

page('/resources', resourcesController.index);
page('/about', aboutController.index);

page();

//added pseudo routes and commented these out as we do not have functions to run once routes are clicked
