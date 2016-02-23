(function(module) {



function Meal (opts) {
  this.mealType = opts.mealType;
  this.address = opts.address;
  this.peopleServed = opts.peopleServed;
  this.timesOpen = opts.timesOpen;
  this.programName = opts.programName;
  this.id;
}

Meal.all = [];
  //populate meal type from array
  var mealType = []
  data.forEach(function(ele) {
    mealType.push(ele[9])
  });
  //populate address from array
  var address = []
  data.forEach(function(ele) {
    address.push(ele[11])
  });
  //populate people served from array
  var peopleServed = []
  data.forEach(function(ele) {
    peopleServed.push(ele[10])
  });
  //populate times opened from array
  var timesOpen = []
  data.forEach(function(ele) {
    timesOpen.push(ele[8])
  });
  //populate program name from array
  var programName = []
  data.forEach(function(ele) {
    programName.push(ele[12])
  });



Meal.prototype.toHtml = function() {
  var template = Handlebars.compile($('#mealprogram-template').text());
  return template(this);
};

Meal.loadAll = function(rawData) {
  Meal.all = rawData.map(function(ele) {
    return new Meal(ele);

  });
};

// Set up a DB table for meal json data.
Meal.createTable = function(callback) {
  webDB.execute(
    'CREATE TABLE IF NOT EXISTS meals (' +
    'id INTEGER PRIMARY KEY, ' +
    'mealType VARCHAR(255) NOT NULL, ' +
    'address VARCHAR(255) NOT NULL, ' +
    'timesOpen VARCHAR(255) NOT NULL, ' +
    'peopleServed VARCHAR(255) NOT NULL, ' +
    'programName VARCHAR(255) NOT NULL, ' +
    ');',
    function(result) {
        console.log('Successfully set up the meals table.', result);
        if (callback) callback();
      }
    );
  };

  // Correct the SQL to delete all records from the meals table.
  Meal.truncateTable = function(callback) {
  webDB.execute(
    'DELETE FROM meals;',
    function(result) {
      console.log('deleted all records, new table', result);

    }
  );
};
// Insert a meal instance into the database:
  Meal.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO meals (mealType, address, timesOpen, peopleServed, programName) VALUES (?, ?, ?, ?, ?);',
          'data': [this.mealType, this.address, this.timesOpen, this.peopleServed, this.programName],
        }
      ],
      function(result) {
        console.log('Inserted new record', result);
      }
    );
  };

  //  Delete a meal instance from the database:
    Meal.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM meals WHERE id = ?;',
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
        'sql': 'UPDATE meals SET mealType = ?, address = ?, timesOpen = ?, peopleServed = ?, programName = ?,  WHERE id = ?;',
        'data': [this.mealType, this.address, this.timesOpen, this.peopleServed, this.programName, this.id],
      }
      ],
      function(result) {
        console.log('Updated record', result);
      }
    );
  };
  Meal.fetchAll = function(next) {
    webDB.execute('SELECT * FROM meals ', function(rows) {
      $.getJSON('/data/mealData.json', function(rawData) {
        // Cache the json, so we don't need to request it next time:
        rawData.forEach(function(item) {
          var meal = new Meal(item); // Instantiate an article based on item from JSON
          meal.insertRecord();// Cache the newly-instantiated meal in DB:
        });
        // Now get ALL the records out the DB, with their database IDs:
        webDB.execute('SELECT * FROM meals', function(rows) {
          // Now instanitate those rows with the .loadAll function, and pass control to the view.
          meal.loadAll(rows);
          next();
        });
      });
    }
  }
Meal.allMealTypes = function() {
  return Meal.all.map(function(meal) {
    return meal.mealType;
  })
};


  module.Meal = Meal;
})(window);
