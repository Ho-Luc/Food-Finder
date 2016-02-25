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
      'CREATE TABLE IF NOT EXISTS resourceTable (' +
      'id INTEGER PRIMARY KEY, ' +
      'name VARCHAR(255) NOT NULL, ' +
      'category VARCHAR(255) NOT NULL, ' +
      'location VARCHAR(255) NOT NULL, ' +
      'hours VARCHAR(255) NOT NULL);',
      callback
    );
  };


  //   // Correct the SQL to delete all records from the meals table.
  Resources.truncateTable = function(callback) {
    webDB.execute(
      'DELETE FROM resourceTable;',
      callback
    );
  };
  // Insert a meal instance into the database:
  Resources.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO resourceTable (name, category, location, hours) VALUES (?, ?, ?, ?);',
          'data': [this.name, this.category, this.location, this.hours],
        }
      ],
      callback
    );
  };

  // Delete a meal instance from the database:
  Resources.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM resourceTable WHERE id = ?;',
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
          'sql': 'UPDATE resourceTable SET name = ?,category = ?, location = ?, hours = ?, WHERE id = ?;',
          'data': [this.name, this.category, this.location, this.hours, this.id],
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
    webDB.execute('SELECT * FROM resourceTable', function(rows) {
      if (rows.length) {
        Resources.loadAll(rows);
        callback();
      } else {
        $.getJSON('data/additionalResources.json', function(addedData) {
          console.log(addedData.length);
          addedData.forEach(function(morefood) {
            var addedSources = new Resources(morefood);
            addedSources.insertRecord();
          });
          webDB.execute('SELECT * FROM resourceTable', function(rows) {
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
          sql: 'SELECT * FROM resourceTable WHERE ' + field + ' = ?;',
          data: [value]
        }
      ],
      callback
    );
  };

  Resources.allMeals = function(callback) {
    webDB.execute('SELECT DISTINCT category FROM resourceTable', callback);
  };


  module.Resources = Resources;
})(window);
