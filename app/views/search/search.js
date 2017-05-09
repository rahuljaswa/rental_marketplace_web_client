angular.module('app.search', [])

.controller('SearchController', ['$scope', '$http', '$stateParams', 'Experiences', 'Pagination', function($scope, $http, $stateParams, Experiences, Pagination) {
	$scope.query = $stateParams;
	$scope.query.results_per_page = 20;
	delete $scope.query.featured;

	$scope.$watch('query.query', function() {
		if (!$scope.query.query || !$scope.query.query.length) {
			$scope.fetchSearchResults();
			updateTitle();
		}
	});

	$scope.$watch('query.locality', function() {
		updateTitle();
	});

	function updateTitle() {
		var title = "BorrowBear - ";
		if ($scope.query.query && $scope.query.locality) {
			document.title = title + $scope.query.query + " in " + $scope.query.locality;
		} else if ($scope.query.query) {
			document.title = title + "Search Experiences Matching " + $scope.query.query;
		} else if ($scope.query.locality) {
			document.title = title + "Search Experiences in " + $scope.query.locality;
		} else {
			document.title = title + "Search Experiences";
		}
	}

	$scope.queryInputChanged = function() {
		$scope.query.page = 1;
		$scope.fetchSearchResults();
	}

	$scope.searchButtonPressed = function() {
		$scope.fetchSearchResults();
	}

	$scope.fetchSearchResults = function() {
		$scope.experiences = Experiences.query($scope.query, function(response) {
			pagination = Pagination.generateInfo(response);
			$scope.query.page = pagination.page;
			$scope.last_page = pagination.last_page;
			$scope.pages_to_display = pagination.pages_to_display;
		});
	}

	$scope.paginatedURLWithOffset = function(destination_page, offset, last_page) {
		var url = "/search?";
		url += "&page=" + Math.min(Math.max(parseInt(destination_page) + parseInt(offset), 1), last_page).toString();
		url += "&query=" + ($scope.query.query ? $scope.query.query : "");
		url += "&latitude=" + $scope.query.latitude;
		url += "&longitude=" + $scope.query.longitude;
		url += "&locality=" + $scope.query.locality;
		url += "&radius=" + $scope.query.radius;
		url += "&active=" + $scope.query.active;
		return url;
	}

	$scope.fetchSearchResults();
	updateTitle();
}])

.directive('googlePlacesCitiesSearch', function() {
	return function($scope, element) {
		var options = {
			types: ['(cities)'],
			componentRestrictions: { country: 'us' }
		}
		var autocomplete = new google.maps.places.Autocomplete(element[0], options);
		autocomplete.addListener('place_changed', function() {
			var place = autocomplete.getPlace();
			$scope.query.latitude = place.geometry.location.lat();
			$scope.query.longitude = place.geometry.location.lng();
			$scope.query.locality = place.formatted_address;
		});
	};
});
