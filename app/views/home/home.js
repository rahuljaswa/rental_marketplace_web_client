angular.module('app.home', [])

.controller('HomeController', ['$scope', '$http', '$state', 'Experiences', 'Tags', 'CarouselImages', function($scope, $http, $state, Experiences, Tags, CarouselImages) {
	document.title = "BorrowBear";

	$scope.featured_experiences = CarouselImages;

	$scope.experiencesQuery = {
		query: "",
		locality: "Palo Alto, CA",
		latitude: 37.4281704,
		longitude: -122.1614915,
		radius: 50,
		active: true,
		featured: true,
		results_per_page: 7,
		page: 1
	};

	$scope.experiences = Experiences.query($scope.experiencesQuery);

	$scope.tags = Tags.query({
		query: "",
		results_per_page: 7,
		featured: true
	});

	$scope.viewAllExperiencesButtonPressed = function() {
		$state.go('search', $scope.experiencesQuery);
	}

	$scope.viewAllCategoriesButtonPressed = function() {
		$state.go('tags');
	}

	$scope.searchButtonPressed = function() {
		$state.go('search', $scope.experiencesQuery);
	}
}])

.directive('googlePlacesCitiesHome', function() {
	return function($scope, element) {
		var options = {
			types: ['(cities)'],
			componentRestrictions: { country: 'us' }
		}
		var autocomplete = new google.maps.places.Autocomplete(element[0], options);
		autocomplete.addListener('place_changed', function() {
			var place = autocomplete.getPlace();
			$scope.experiencesQuery.latitude = place.geometry.location.lat();
			$scope.experiencesQuery.longitude = place.geometry.location.lng();
			$scope.experiencesQuery.locality = place.formatted_address;
		});
	};
});
