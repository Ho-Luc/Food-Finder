(function(module) {
  var googleMap = {};
  var latLngArray = [];
  var markers = [];
  var map;

  googleMap.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.6097, lng: -122.3331},
      zoom: 13
    });
  };

  googleMap.addMarkers = function(data) {
    console.log(latLngArray);
    $.each(latLngArray, function(idx, val){
      var info = new google.maps.InfoWindow({
        content: mealView.filteredData[idx].programName + '  Open: ' + mealView.filteredData[idx].timesOpen
      });

      var marker = new google.maps.Marker({
        // position: val.results[0].geometry.location,
        position: {lat: result.lat('<function scope>'),lng: result.lng('<function scope>')},
        map: map,
        title: mealView.filteredData[idx].programName
      });

      marker.addListener('click', function() {
        info.open(map, marker);
      });
    });
  };

  googleMap.getLatLong = function(address) {
    latLngArray.length = 0;
    var geocoder = new google.maps.Geocoder();
    $.each(mealView.filteredData, function (idx, val) {
      geocoder.geocode( {'address': val.address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          result = results[0].geometry.location;
          latLngArray.push(results)
          googleMap.addMarkers(results);
        } else {
          result = "Unable to find address: " + status;
        }
      });
    });
  }


  module.googleMap = googleMap;
})(window);
