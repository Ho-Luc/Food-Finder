page('/',
  mealController.loadAll);
  // mealController.index);

page('/finder',
  mealController.index );

page('/resources',
  resourcesController.index);
page('/about',
  aboutController.index);

page();
