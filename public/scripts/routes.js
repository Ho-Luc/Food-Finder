page('/',
  resourcesController.loadAll,
  mealController.loadAll);

page('/finder',
  mealController.index );


page('/resources',
  resourcesController.index);

page('/about',
  aboutController.index);

page();
