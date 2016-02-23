(function(module) {
  var googleMap = {};
  var map;
  // var myLatLng = {lat: -25.363, lng: 131.044};

  googleMap.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.6097, lng: -122.3331},
      zoom: 11
    });
  };

  googleMap.requestGeoloction = function(callback) {
    $.ajax({
      url: 'https:maps.googleapis.com/maps/api/geocode/json',

    })
  };

  module.googleMap = googleMap;
})(window);
