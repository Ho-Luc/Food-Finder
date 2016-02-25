(function(module){
  var teamView ={};

var render = function(article){
  console.log('render');
  var template = Handlebars.compile($('#about-template').text());
  return template(article);
};

teamView.index = function(articles){
  articles.forEach(function(a){
    $('#articles').append(render(a));
  });
};


module.teamView = teamView;
})(window);
