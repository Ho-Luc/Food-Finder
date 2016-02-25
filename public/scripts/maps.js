(function(module) {
  var googleMap = {};
  var latLngArray = [];
  var markers = [];
  var addressArray = ['4201 Letitia Ave S', '511 Boren Ave N, Seattle, WA 98109', '400 Broad St, Seattle, WA 98109']; //place holder array until we get JSON addresses
  var map;

  googleMap.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.6097, lng: -122.3331},
      zoom: 11
    });
  };

  googleMap.addMarkers = function(location) {
    $.each(latLngArray, function(idx, val){
      var marker = new google.maps.Marker({
        position: val.results[0].geometry.location,
        map: map,
        title: 'Food banks'
      });
      console.log(val.results[0].geometry.location);
    });
  };

  //this function grabs an array of addresses and turns them into geocoordinates. LIMIT 10 PER REQUEST!
  googleMap.requestGeocoding = function(callback) {
    latLngArray.length = 0; //clears array of objects
    $.each(addressArray, function(idx, val){
      $.getJSON({
        url : 'https:maps.googleapis.com/maps/api/geocode/json',
        data : {
          sensor: false,
          address: val
        },
        success : function(data) {
          console.log('success! the data is: ', data);
          latLngArray.push(data); //on success, pushes to helper var array at top.
        }
      });
    });
  };
  // googleMap.requestGeocoding();
  // googleMap.addMarkers();

  module.googleMap = googleMap;
})(window);
