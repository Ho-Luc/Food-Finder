(function(module) {

  resourcesController = {};

  resourcesController.index = function() {
    $('main > section').hide();
    $('#resources').show();
  }
 module.resourcesController = resourcesController;
})(window);
