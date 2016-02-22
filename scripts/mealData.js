(function(module) {

var rawData = this.data;

function Meal () {
var mealServed = this.data;

};

Meal.all = [];

// Set up a DB table for articles.
// Meal.createTable = function(callback) {
//   webDB.execute(
//     'CREATE TABLE IF NOT EXISTS ---- (' +
//     'id INTEGER PRIMARY KEY, ' +
//
//
//
//   )
// }

function isMealType(value) {
  return this.data[9];

  data.reduce(function(previousValue, currentValue, currentIndex, array) {
  return previousValue + currentValue;
}, 10);
}
var filtered = this.data.filter(isMealType);

Meal.loadAll = function(rawData) {
  rawData.forEach(function(ele) {
    Meal.all.push(new Meal(ele));
  });
};


Meal.fetchAll = function(next) {
  webDB.execute('SELECT * FROM meal ', function(rows) {
      $.getJSON('/data/mealData.json', function(rawData) {
        // Cache the json, so we don't need to request it next time:
        rawData.forEach(function(item) {
          var meal = new Meal(item); // Instantiate an article based on item from JSON
          meal.insertRecord();// Cache the newly-instantiated article in DB:
        });
        // Now get ALL the records out the DB, with their database IDs:
        webDB.execute('SELECT * FROM data', function(rows) {
          // Now instanitate those rows with the .loadAll function, and pass control to the view.
          meal.loadAll(rows);
          next();
        });
      }
    };
  };












  module.Meals = Meals;
})(window);
