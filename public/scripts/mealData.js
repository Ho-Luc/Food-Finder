(function(module) {

  function Meal (opts) {
    this.mealType = opts.mealType;
    this.address = opts.address;
    this.peopleServed = opts.peopleServed;
    this.timesOpen = opts.timesOpen;
    this.programName = opts.programName;
    this.id = opts.id;
  }

  Meal.all = [];



  // Set up a DB table for meal json data.
  Meal.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS finder (' +
      'id INTEGER PRIMARY KEY, ' +
      'mealType VARCHAR(255) NOT NULL, ' +
      'address VARCHAR(255) NOT NULL, ' +
      'timesOpen VARCHAR(255) NOT NULL, ' +
      'peopleServed VARCHAR(255) NOT NULL, ' +
      'programName VARCHAR(255) NOT NULL);',
      callback
    );
  };

  //   // Correct the SQL to delete all records from the meals table.
  Meal.truncateTable = function(callback) {
    webDB.execute(
      'DELETE FROM finder;',
      callback
    );
  };
  // Insert a meal instance into the database:
  Meal.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO finder (mealType, address, timesOpen, peopleServed, programName) VALUES (?, ?, ?, ?, ?);',
          'data': [this.mealType, this.address, this.timesOpen, this.peopleServed, this.programName],
        }
      ],
      callback
    );
  };

  // Delete a meal instance from the database:
  Meal.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM finder WHERE id = ?;',
          'data': [this.id]
        }
      ],
      callback
    );
  };

  // Update a meal instance, overwriting it's properties into the corresponding record in the database:
  Meal.prototype.updateRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'UPDATE finder SET mealType = ?, address = ?, timesOpen = ?, peopleServed = ?, programName = ?,  WHERE id = ?;',
          'data': [this.mealType, this.address, this.timesOpen, this.peopleServed, this.programName, this.id],
        }
      ],
      callback
    );
  };

  Meal.loadAll = function(rows) {
    Meal.all = rows.map(function(ele) {
      return new Meal(ele);
    });
  };

  Meal.fetchAll = function(callback) {
    webDB.execute('SELECT * FROM finder', function(rows) {
      if (rows.length) {
        Meal.loadAll(rows);
        callback();
      } else {
        $.getJSON('data/mealData.json', function(rawData) {
          console.log(rawData.length);
          rawData.forEach(function(yumfood) {
            var mprogram = new Meal(yumfood);
            mprogram.insertRecord();
          });
          webDB.execute('SELECT * FROM finder', function(rows) {
            // Now instanitate those rows with the .loadAll function, and pass control to the view.
            Meal.loadAll(rows);
            console.log('fetch');
            callback();
          });
        });
      }
    });
  };

  Meal.findWhere = function(field, value, callback) {
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM finder WHERE ' + field + ' = ?;',
          data: [value]
        }
      ],
      callback
    );
  };

  Meal.allMeals = function(callback) {
    webDB.execute('SELECT DISTINCT mealType FROM finder', callback);
  };


  module.Meal = Meal;
})(window);
