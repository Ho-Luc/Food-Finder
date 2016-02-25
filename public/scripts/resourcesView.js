(function(module) {

  resourceView = {};

  var resourceRender = function(resource){
    var template = Handlebars.compile($('#resources-template').text());
    return template(resource);
  };

resourceView.populateFilter = function() {
  var template = Handlebars.compile($('#option2-template').text());


}
 module.resourcesView = resourcesView;
})(window);
