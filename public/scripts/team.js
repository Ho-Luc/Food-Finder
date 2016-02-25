(function(module) {
  function Team (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Team.all = [];

//
// Team.prototype.toHtml = function(){
//   var template = Handlebars.compile($('#about-template').text());
//   return template(this);
// };



  Team.createTable = function(callback){
  console.log('create')
    webDB.execute(
  'CREATE TABLE IF NOT EXISTS team (' +
    'id INTEGER PRIMARY KEY,' +
    'name VARCHAR(255) NOT NULL,' +
    'photo VARCHAR(255), ' +
    'date DATETIME,' +
    'blurb TEXT NOT NULL); ',
  callback
);

  };

  Team.truncateTable = function(callback){
    webDB.execute(
  'DELETE FROM team;',
  callback
);

  };

  Team.prototype.insertRecord = function(callback){
    webDB.execute(
  [
    {
      'sql': 'INSERT INTO team (name, photo, date, blurb) VALUES (?, ?, ?,?);',
      'data': [this.name, this.photo, this.date, this.blurb],
    }
  ],
  callback
);

  };

  Team.prototype.deleteRecord = function(callback){
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM team WHERE id = ?;',
          'data': [this.id]
        }
      ],
      callback
    );
  };

  Team.prototype.updateRecord = function(callback){
    webDB.execute(
  [
    {
      'sql': 'UPDATE team SET name = ?, photo = ?, date =?, blurb = ? WHERE id = ?;',
      'data': [this.name, this.photo, this.date, this.blurb, this.id]
    }
  ],
  callback
);

  };

  Team.loadAll = function(rows){
    Team.all = rows.map(function(ele) {
  return new Team(ele);
  });
  };


  Team.fetchAll = function(callback){
    webDB.execute('SELECT * FROM team ORDER BY date DESC', function(rows) {
      if (rows.length) {
        Team.loadAll(rows);
        callback();
      } else {
        $.getJSON('data/team.json', function(rawData) {
          rawData.forEach(function(item) {
            var team = new Team(item);
            team.insertRecord();
          });
          webDB.execute('SELECT * FROM team', function(rows) {
            Team.loadAll(rows);
            callback();
          });
        });
      }
    });


  };

  Team.findWhere = function(field, value, callback){
  webDB.execute(
    [
      {
        sql:'SELECT * FROM team WHERE' + field + '=?;',
        data:[value]
      }
    ],
    callback
  );
  };

Team.with = function(attr){
  return Team.all.filter(function(teams){
    return teams[attr];
  });
};

  module.Team = Team;
})(window);
