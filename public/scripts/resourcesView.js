(function(module) {
  resourcesView = {};
  resourcesView.filteredData = [];

  var resourcesRender = function(resource){
    var template = Handlebars.compile($('#resources-template').text());
    return template(resource);
  };

  resourcesView.populateFilter = function() {
    var template = Handlebars.compile($('#option-template').text());

    Resources.allResources(function(rows){
      if($('#resources-filter option').length < 2) {
        $('#resources-filter').append(
          rows.map(function(row) {
            return template({val: row.category});
          })
        )
      }
    });
  };

  resourcesView.handleResourcesFilter = function() {
    $('#resources-filter').one('change', 'select', function() {
      input = this.id.replace('-filter', '');
      page('/' + input + '/' + $(this).val().replace(/\W+/g, '+'));
    });
  };

  resourcesView.index = function(resources) {
    $('#resources').show().siblings().hide();

    resourcesView.populateFilter();
    resourcesView.handleResourcesFilter();
  }

  //on filter change
  $('#resources-filter').on('change', function(){
    $('#resources article').remove();
    var filterOpt = $(this).val();

    resourcesView.filteredData = Resources.all.filter(function(obj){
      return obj.category == filterOpt;
    });

    resourcesView.filteredData.forEach(function(y){
      $('#resources').append(resourcesRender(y));
    });
  });

  module.resourcesView = resourcesView;
})(window);
