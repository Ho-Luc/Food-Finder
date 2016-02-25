(function(module){
var mainController ={};

Team.createTable();

  mainController.index = function(ctx, next){
    console.log('mainController.index');
    teamView.index(ctx.articles);
};

mainController.loadAll = function(ctx, next){
  console.log('loadall');
  var teamData = function(allArticles){
    ctx.articles = Team.all;
    next();
  };

 if(Team.all.length){
   ctx.articles = Team.all;
   console.log(Team.all);
   next();
 } else{
   Team.fetchAll(teamData);
 }

};

module.mainController = mainController;

})(window);
