page('/',
  mealController.loadAll,
  resourcesController.loadAll,
  homeController.index);

page('/finder',
  mealController.index );


page('/resources',
  resourcesController.index);

page('/about',
  aboutController.index);

page();
