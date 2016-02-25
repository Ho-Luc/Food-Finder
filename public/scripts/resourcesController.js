(function(module) {
  resourcesController = {};

  resourcesController.index = function(ctx, next) {
    $('main > section').hide();
    resourcesView.index(ctx.resources);
  };

  resourcesController.loadAll = function(ctx, next) {
    var resourcesData = function() {
      ctx.resources = Resources.all;
      next();
    };

    if(Resources.all.length) {
      ctx.resources = Resources.all;
      next();
    } else {
      Resources.fetchAll(resourcesData);
    }
  };

 module.resourcesController = resourcesController;
})(window);
