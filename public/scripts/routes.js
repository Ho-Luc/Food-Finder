page('/',
  mealController.loadAll,
  homeController.index,
  resourcesController.loadAll);

page('/finder',
  mealController.index );


page('/resources',
  resourcesController.index);

page('/about',
  aboutController.index);

page();
