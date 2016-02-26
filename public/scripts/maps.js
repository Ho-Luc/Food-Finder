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
        content: mealView.filteredData[idx].timesOpen
      });

      var marker = new google.maps.Marker({
        position: val.results[0].geometry.location,
        map: map,
        title: mealView.filteredData[idx].programName
      });

      marker.addListener('click', function() {
        info.open(map, marker);
      });
    });
  };

  // googleMap.getLatLong = function(address) {
  //   var geocoder = new google.maps.Geocoder();
  //   geocoder.geocode( {'address': address}, function(results, status) {
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       latLngArray.push(results[0].geometry.location);
  //       console.log(address);
  //       console.log(results[0].geometry.location);
  //     } else {
  //       result = "Unable to find address: " + status;
  //       console.log('did not work');
  //     }
  //   });
  //   console.log(latLngArray);
  // }
  googleMap.getLatLong = function(address) {
    var geocoder = new google.maps.Geocoder();
    var result = "";
    geocoder.geocode( { 'address': address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        result = results[0].geometry.location;
      } else {
        result = "Unable to find address: " + status;
      }
    });
    return result;
  }

  //this function grabs an array of addresses and turns them into geocoordinates. LIMIT 10 PER REQUEST!
  googleMap.requestGeocoding = function(callback) {
    latLngArray.length = 0;
    $.each(mealView.filteredData, function(idx, val){
      $.getJSON({
        url : 'https:maps.googleapis.com/maps/api/geocode/json',
        data : {
          sensor: false,
          address: val.address
        },
        success : function(data) {
          latLngArray.push(data); //on success, pushes to helper var array at top.
          googleMap.addMarkers(data);
        }
      });
    });
  };

  module.googleMap = googleMap;
})(window);
