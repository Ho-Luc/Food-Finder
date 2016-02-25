(function(module) {

  function Resources (opts) {
    this.name = opts.name;
    this.category = opts.category;
    this.location = opts.location;
    this.hours = opts.hours;
    this.id = opts.id;
  }

  Resources.all = [];

  // Set up a DB table for meal json data.
  Resources.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS resourcetable (' +
      'id INTEGER PRIMARY KEY, ' +
      'name VARCHAR(255) NOT NULL, ' +
      'category VARCHAR(255) NOT NULL, ' +
      'location VARCHAR(255) NOT NULL, ' +
      'hours VARCHAR(255) NOT NULL);',
      callback
    );
  };

  Resources.truncateTable = function(callback) {
    webDB.execute(
      'DELETE FROM resourcetable;',
      callback
    );
  };

  // Insert a meal instance into the database:
  Resources.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO resourcetable (name, category, location, hours) VALUES (?, ?, ?, ?);',
          'data': [this.name, this.category, this.location, this.hours],
        }
      ],
      callback
    );
  };

  Resources.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM resourcetable WHERE id = ?;',
          'data': [this.id]
        }
      ],
      callback
    );
  };

  // Update a meal instance, overwriting it's properties into the corresponding record in the database:
  Resources.prototype.updateRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'UPDATE resourcetable SET name = ?,category = ?, location = ?, hours = ?, WHERE id = ?;',
          'data': [this.name, this.category, this.location, this.hours, this.id]
        }
      ],
      callback
    );
  };

  Resources.loadAll = function(rows) {
    Resources.all = rows.map(function(ele) {
      return new Resources(ele);
    });
  };

  Resources.fetchAll = function(callback) {
    webDB.execute('SELECT * FROM resourcetable', function(rows) {
      if (rows.length) {
        Resources.loadAll(rows);
        callback();
      } else {
        $.getJSON('/data/additionalResources.json', function(addedData) {
          console.log(addedData.length);
          addedData.forEach(function(morefood) {
            var addedSources = new Resources(morefood);
            addedSources.insertRecord();
          });
          webDB.execute('SELECT * FROM resourcetable', function(rows) {
            // Now instanitate those rows with the .loadAll function, and pass control to the view.
            Resources.loadAll(rows);
            console.log('fetch');
            callback();
          });
        });
      }
    });
  };

  Resources.findWhere = function(field, value, callback) {
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM resourcetable WHERE ' + field + ' = ?;',
          data: [value]
        }
      ],
      callback
    );
  };

  Resources.allResources = function(callback) {
    webDB.execute('SELECT DISTINCT category FROM resourcetable', callback);
  };


  module.Resources = Resources;
})(window);
