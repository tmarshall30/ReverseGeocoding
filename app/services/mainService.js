app.service('reverseGeocode', ['$http', function ($http) {
        this.getReverseGeocodeCallBack = function (latitude, longitude, callBackFunction) {
            // Reverse geocoding
            $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "")
                    .then(function (results) {
                        var status = results.data.status;

                        if (status === 'OK') {

                            if (results.data.results.length > 0) {
                                var result = results.data.results[0];
                                var street_number = '';
                                var address = '';
                                var city = '';
                                var postalCode = '';
                                var stateOrProvince = '';
                                var country = '';

                                // Get field data
                                for (var i = 0, len = result.address_components.length; i < len; i++) {
                                    var ac = result.address_components[i];

                                    if (ac.types.indexOf('street_number') >= 0)
                                        street_number = ac.long_name;
                                    if (ac.types.indexOf('route') >= 0)
                                        address = ac.long_name;
                                    if (ac.types.indexOf('locality') >= 0)
                                        city = ac.long_name;
                                    if (ac.types.indexOf('postal_code') >= 0)
                                        postalCode = ac.long_name;
                                    if (ac.types.indexOf('administrative_area_level_1') >= 0)
                                        stateOrProvince = ac.long_name;
                                    if (ac.types.indexOf('country') >= 0)
                                        country = ac.long_name;
                                }

                                var objectToReturn = {
                                    street_number: street_number,
                                    address: address,
                                    city: city,
                                    postalCode: postalCode,
                                    stateOrProvince: stateOrProvince,
                                    country: country
                                };
                                callBackFunction(objectToReturn);

                            } else {
                                // No location data
                                var objectToReturn = {
                                    statusMessage: 'Location not found'
                                };
                                callBackFunction(objectToReturn);

                            }
                        } else if (status === 'ZERO_RESULTS') {
                            var objectToReturn = {
                                statusMessage: 'No results found.'
                            };
                            callBackFunction(objectToReturn);

                            // Catch All
                        } else {
                            var objectToReturn = {
                                statusMessage: 'Geocoder failed: ' + status
                            };
                            callBackFunction(objectToReturn);
                        }

                    });

        };

    }]);

app.service('googleMaps', function () {
    this.newPosition = function (latitude, longitude, data) {
        var location = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            zoom: 13,
            center: location
        };

        var map = new google.maps.Map(document.getElementById('mapElement'), mapOptions);

        var marker = new google.maps.Marker({
            position: location,
            title: "" + latitude + ", " + longitude + ""

        });
        
      var contentString = '<div class="markerInfo">'+
      '<table>'+
      '<tbody>'+
      '<tr>'+
      '<td>'+
      'Address:'+
      '</td>' +
      '<td>'+
      ''+data.street_number+'  '+data.address+''+
      '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+
      'City:'+
      '</td>' +
      '<td>'+
      ''+data.city+''+
      '</td>'+
      '</tr>'+
      '<tr>'+
      '<td>'+
      'State/Province:'+
      '</td>' +
      '<td>'+
      ''+data.stateOrProvince+''+
      '</td>'+
      '</tr>'+
       '<tr>'+
      '<td>'+
      'Postal-Code:'+
      '</td>' +
      '<td>'+
      ''+data.postalCode+''+
      '</td>'+
      '</tr>'+
       '<tr>'+
      '<td>'+
      'Country:'+
      '</td>' +
      '<td>'+
      ''+data.country+''+
      '</td>'+
      '</tr>'+
      '</tbody>'+
      '</table>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  
   marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
        marker.setMap(map);
    };

});