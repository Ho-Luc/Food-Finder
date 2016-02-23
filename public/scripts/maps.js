(function(module) {
  var googleMap = {};
  var latLng = [];
  var map;
  // var myLatLng = {lat: 47.565406, lng: -122.2900488};

  googleMap.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.6097, lng: -122.3331},
      zoom: 11
    });

    var marker = new google.maps.Marker({
      position: {lat: latLng.results.geometry.location.lat, lng: latLng.results.geometry.location.lng},
      map: map,
      title: 'Food banks'
    })
  };

  googleMap.requestGeocoding = function(callback) {
    $.getJSON({
      url : 'https:maps.googleapis.com/maps/api/geocode/json',
      data : {
        sensor: false,
        address: '4201 Letitia Ave S'
      },
      success : function(data) {
        console.log('success! the data is: ' + data);
        latLng = data;
        console.log(latLng);
      }
    })
  };
  googleMap.requestGeocoding();

  module.googleMap = googleMap;
})(window);
