(function(module) {

  var homeController = {};

  homeController.index = function(ctx, next) {
    $('main > section').hide();
    $('#home').show();
  }
  module.homeController = homeController;
})(window);
