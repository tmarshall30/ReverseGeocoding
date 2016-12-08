app.controller('MyFormController', ['$scope', 'reverseGeocode', 'googleMaps', function ($scope, reverseGeocode, googleMaps) {

        // Populate lat and long for easy selection
        $scope.position = {
            latitude: '44.682965',
            longitude: '-63.661522'

        };

        $scope.mapCenter = {
            latitude: '44.68623',
            longitude: '-63.634701'

        };

        // Form submit
        $scope.submit = function () {

            // Required attribute fallback
            if ($scope.position.latitude && $scope.position.longitude) {
                reverseGeocode.getReverseGeocodeCallBack($scope.position.latitude, $scope.position.longitude,
                        function (data) {
                            $scope.statusMessage = '';

                            // Show status message
                            if (data.statusMessage) {
                                $scope.statusMessage = data.statusMessage;
                            }

                            //Populate Fields
                            $scope.street_number = data.street_number;
                            $scope.address = data.address;
                            $scope.city = data.city;
                            $scope.postalCode = data.postalCode;
                            $scope.stateOrProvince = data.stateOrProvince;
                            $scope.country = data.country;

                            // Combines street number and address if street number is available
                            if ($scope.street_number) {
                                $scope.address = $scope.street_number + ' ' + $scope.address;

                            }
                            googleMaps.newPosition($scope.position.latitude, $scope.position.longitude, data);
                        });

                // Lat and long for marker
                $scope.latitudeMapped = $scope.position.latitude;
                $scope.longitudeMapped = $scope.position.longitude;

                // Lat and long for map centering
                $scope.mapCenter = {
                    latitude: $scope.position.latitude,
                    longitude: $scope.position.longitude

                };



                // Required fallback
            } else {
                $scope.statusMessage = 'Please be sure to fill in both the latitude and longitude fields.';
            }
        };

    }]);