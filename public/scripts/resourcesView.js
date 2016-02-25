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
  },

  resourcesView.handleResourceFilter = function() {
    $('#resources-filter').one('change', 'select', function() {
      resource = this.id.replace('-filter', '');
      page('/' + resource + '/' + $(this).val().replace(/\W+/g, '+'));
    });
  };

  resourcesView.index = function(resources) {
    $('#resources').show().siblings().hide();

    resourcesView.populateFilters();
    resourcesView.handleResourcesFilter();
  }

  //on filter change
  $('#resources-filter').on('change', function(){
    $('#resources article').remove();
    var filterOpt = $(this).val();

    resources.filteredData = Resources.all.filter(function(obj){
      return obj.category == filterOpt;
    });

    resources.filteredData.forEach(function(y){
      $('#resources').append(render(y));
    });
  });

  module.resourcesView = resourcesView;
})(window);
