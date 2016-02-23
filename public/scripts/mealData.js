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
   var mealType = [];
   var address = []
   var peopleServed = []
   var timesOpen = []
   var programName = []


Meal.prototype.toHtml = function() {
  var template = Handlebars.compile($('#mealtype-filter').text());
  return template(this);
};

// Set up a DB table for meal json data.
Meal.createTable = function(callback) {
  webDB.execute(
    'CREATE TABLE IF NOT EXISTS finder (' +
    'id INTEGER PRIMARY KEY, ' +
    'mealType VARCHAR(255) NOT NULL, ' +
    'address VARCHAR(255) NOT NULL, ' +
    'timesOpen VARCHAR(255) NOT NULL, ' +
    'peopleServed VARCHAR(255) NOT NULL, ' +
    'programName VARCHAR(255) NOT NULL ' +
    ');',
    function(result) {
        console.log('Successfully set up the finder table.', result);
        if (callback) callback();
      }
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
      function(result) {
        console.log('Deleted record', result);

      }
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

  Meal.fetchAll = function(next) {
    webDB.execute('SELECT * FROM finder', function(rows) {
        if (rows.length) {
          Meal.loadAll(rows);
          next();
        } else {
          $.getJSON('public/data/mealData.json', function(rawData) {
            console.log(rawData);
              rawData.forEach(function(ele) {
                mealType.push(ele[9])
              });

              rawData.forEach(function(ele) {
                address.push(ele[11])
              });
              //populate people served from array
              rawData.forEach(function(ele) {
                peopleServed.push(ele[10])
              });
              //populate times opened from array
              mealData.forEach(function(ele) {
                timesOpen.push(ele[8])
              });
              //populate program name from array
              mealData.forEach(function(ele) {
                programName.push(ele[12])
              });
              var meal = new Meal(item);
              meal.insertRecord();
            webDB.execute('SELECT * FROM finder', function(rows) {
          // Now instanitate those rows with the .loadAll function, and pass control to the view.
            Meal.loadAll(rows);
            console.log('fetch');
            next();
            });
        });
      }
    });
  };




// return the array of all mealtypes summed up
Meal.allMeals = function() {
  return Meal.all.map(function(meal) {
    return meal.mealTypes;
})
  .reduce(function(meals, meal) {
    if (meals.indexOf(meal) === -1) {
      meals.push(meal);
    }
    return meals;

  }, []);
};

  module.Meal = Meal;
})(window);
