(function(module) {
  var googleMap = {};
  // var myLatLng = new google.maps.LatLng(yelpLat, yelpLng);

  googleMap.initMap = function() {
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.6097, lng: -122.3331},
      zoom: 11
    });
  };


  module.googleMap = googleMap;
})(window);
