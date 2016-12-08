app.directive('mapContents', function () {
    return {
        templateUrl: '../views/mapContents.html'
    };
});

app.directive('leftForm', function () {
    return {
        templateUrl: '../views/leftForm.html'
    };
});

app.directive('rightContents', function () {
    return {
        templateUrl: '../views/rightContents.html'
    };
});

// Google Map
app.directive('googleMap', function () {
    return {
        restrict: 'A',
        scope: {
            divId: '@id',
            lat: '@',
            long: '@'

        },
        link: function ($scope) {

            // Initialize the map
            $scope.initialize = function () {
                $scope.centerLocation = new google.maps.LatLng($scope.lat, $scope.long);

                $scope.mapOptions = {
                    zoom: 13,
                    center: $scope.centerLocation
                };

                $scope.map = new google.maps.Map(document.getElementById($scope.divId), $scope.mapOptions);

                google.maps.event.addListener($scope.map, "click", function (e) {
                    var latLng = e.latLng;
                    
                });


            };

            $scope.initialize();
        }
    };
});