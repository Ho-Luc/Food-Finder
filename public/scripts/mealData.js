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

  //  var dataJSON = {};
  //  var mealData = []



 // var mealType = []
 // dataJSON.forEach(function(ele) {
 //   mealType.push(ele[9])
 // });
 // var mealType= mealData[9];
 // var lastName = "Smith";




 // console.log(JSON.stringify(mealData));







  //populate meal type from array
  // var mealType = []
  // dataJSON.forEach(function(ele) {
  //   mealType.push(ele[9])
  // });
  //populate address from array



// Meal.prototype.toHtml = function() {
//   var template = Handlebars.compile($('#mealtype-filter').text());
//   return template(this);
// };
//
// Meal.loadAll = function(rawData) {
//   Meal.all = rawData.map(function(ele) {
//     return new Meal(ele);
//
//   });
// };

// Set up a DB table for meal json data.
// Meal.createTable = function(callback) {
//   webDB.execute(
//     'CREATE TABLE IF NOT EXISTS meals (' +
//     'id INTEGER PRIMARY KEY, ' +
//     'mealType VARCHAR(255) NOT NULL, ' +
//     'address VARCHAR(255) NOT NULL, ' +
//     'timesOpen VARCHAR(255) NOT NULL, ' +
//     'peopleServed VARCHAR(255) NOT NULL, ' +
//     'programName VARCHAR(255) NOT NULL, ' +
//     ');',
//     function(result) {
//         console.log('Successfully set up the meals table.', result);
//         if (callback) callback();
//       }
//     );
//   };
//
//   // Correct the SQL to delete all records from the meals table.
//   Meal.truncateTable = function(callback) {
//   webDB.execute(
//     'DELETE FROM meals;',
//     function(result) {
//       console.log('deleted all records, new table', result);
//
//     }
//   );
// };
// // Insert a meal instance into the database:
//   Meal.prototype.insertRecord = function(callback) {
//     webDB.execute(
//       [
//         {
//           'sql': 'INSERT INTO meals (mealType, address, timesOpen, peopleServed, programName) VALUES (?, ?, ?, ?, ?);',
//           'data': [this.mealType, this.address, this.timesOpen, this.peopleServed, this.programName],
//         }
//       ],
//       function(result) {
//         console.log('Inserted new record', result);
//       }
//     );
//   };
//
//   // Delete a meal instance from the database:
//     Meal.prototype.deleteRecord = function(callback) {
//     webDB.execute(
//       [
//         {
//           'sql': 'DELETE FROM meals WHERE id = ?;',
//           'data': [this.id]
//         }
//       ],
//       function(result) {
//         console.log('Deleted record', result);
//
//       }
//     );
//   };
//
//   // Update a meal instance, overwriting it's properties into the corresponding record in the database:
//   Meal.prototype.updateRecord = function(callback) {
//     webDB.execute(
//       [
//         {
//         'sql': 'UPDATE meals SET mealType = ?, address = ?, timesOpen = ?, peopleServed = ?, programName = ?,  WHERE id = ?;',
//         'data': [this.mealType, this.address, this.timesOpen, this.peopleServed, this.programName, this.id],
//       }
//       ],
//       function(result) {
//         console.log('Updated record', result);
//       }
//     );
//   };
  Meal.loadAll = function(rows) {
    Meal.all = rows.map(function(ele) {
      return new Meal(ele);
    });
  };

  Meal.fetchAll = function(next) {
    // webDB.execute('SELECT * FROM meals', function(rows) {
    //     if (rows.length) {
    //       Meal.loadAll(rows);
    //     } else {
          $.getJSON('public/data/mealData.json', function(rawData) {
            console.log('this is running');
            console.log(rawData);
              var mealType = [];
              rawData.forEach(function(ele) {
                mealType.push(ele[9])
              });

          //     var address = []
          //     rawData.forEach(function(ele) {
          //       address.push(ele[11])
          //     });
          //     //populate people served from array
          //     var peopleServed = []
          //     rawData.forEach(function(ele) {
          //       peopleServed.push(ele[10])
          //     });
          //     //populate times opened from array
          //     var timesOpen = []
          //     mealData.forEach(function(ele) {
          //       timesOpen.push(ele[8])
          //     });
          //     //populate program name from array
          //     var programName = []
          //     mealData.forEach(function(ele) {
          //       programName.push(ele[12])
          //     });
          //   //   var meal = new Meal(item); // Instantiate a meal based on item from JSON
          //   //   meal.insertRecord();
          //   // });
          //   webDB.execute('SELECT * FROM meals', function(rows) {
          // // Now instanitate those rows with the .loadAll function, and pass control to the view.
          //   Meal.loadAll(rows);
          //   console.log('fetch');
            next();
        });
      };
  //   });
  // });
// };

//return the array of all mealtypes summed up
// Meal.allMeals = function() {
//   return Meal.all.map(function(meal) {
//     return meal.mealTypes;
// })
//   .reduce(function(meals, meal) {
//     if (meals.indexOf(meal) === -1) {
//       names.push(meal);
//     }
//     return meals;
//
//   }, []);
// };
  module.Meal = Meal;
})(window);
