(function(module) {

  homeController = {};

  homeController.index = function() {
    $('main > section').hide();
    $('#home').show();
  }
 module.homeController = homeController;
})(window);
