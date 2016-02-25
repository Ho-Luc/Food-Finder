// (function(module) {
  var googleMap = {};
  var latLngArray = [];
  var markers = [];
  // var addressArray = ['4201 Letitia Ave S', '511 Boren Ave N, Seattle, WA 98109', '400 Broad St, Seattle, WA 98109']; //place holder array until we get JSON addresses
  var map;
  var infoWindow = new google.maps.InfoWindow();
  var latlngbounds = new google.maps.LatLngBounds();

  googleMap.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.6097, lng: -122.3331},
      zoom: 13
    });

  };

  googleMap.addMarkers = function(location) {
    console.log(latLngArray);
    $.each(latLngArray, function(idx, val){
      var marker = new google.maps.Marker({
        position: val.results[0].geometry.location,
        map: map,
        title: mealView.filteredData[idx].programName
      });
      console.log(val.results[0].geometry.location);

    });(function (marker, data) {
        var infoWindow = new google.maps.InfoWindow();
                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.title + 'here' + "</div>");
                    infoWindow.open(map, marker);
                });
            })(marker, data);
            latlngbounds.extend(marker.position);
  }




  //this function grabs an array of addresses and turns them into geocoordinates. LIMIT 10 PER REQUEST!
  googleMap.requestGeocoding = function(callback) {
    latLngArray.length = 0; //clears array of objects
    $.each(mealView.filteredData, function(idx, val){
      $.getJSON({
        url : 'https:maps.googleapis.com/maps/api/geocode/json',
        data : {
          sensor: false,
          address: val.address
        },
        success : function(data) {
          latLngArray.push(data); //on success, pushes to helper var array at top.
          // console.log(data);
            googleMap.addMarkers();


        }
      });
    });
  };

//   module.googleMap = googleMap;
// })(window);
