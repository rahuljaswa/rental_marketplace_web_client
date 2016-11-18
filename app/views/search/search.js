angular.module('app.search', [])

.controller('SearchController', ['$scope', '$http', '$stateParams', 'Products', function($scope, $http, $stateParams, Products) {
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
			document.title = title + "Search Products Matching " + $scope.query.query;
		} else if ($scope.query.locality) {
			document.title = title + "Search Products in " + $scope.query.locality;
		} else {
			document.title = title + "Search Products";
		}
	}

	$scope.queryInputChanged = function() {
		$scope.fetchSearchResults();
	}

	$scope.searchButtonPressed = function() {
		$scope.fetchSearchResults();
	}

	$scope.fetchSearchResults = function() {
		$scope.products = Products.query($scope.query, function(response) {
			$scope.query.page = response.metadata.page;

			var pages_to_display = [];
			var max_pages_to_display = 10;
			var pages_till_end = response.metadata.number_of_pages - response.metadata.page;
			if (response.metadata.number_of_pages <= max_pages_to_display) {
				for (var i = 1; i <= response.metadata.number_of_pages; i++) {
					pages_to_display.push(i);
				}
			} else if (pages_till_end <= max_pages_to_display/2) {
				for (var i = max_pages_to_display - pages_till_end; i <= response.metadata.number_of_pages; i++) {
					pages_to_display.push(i);
				}
			} else {
				var first_page = Math.max(1, response.metadata.page - max_pages_to_display/2);
				for (var i = first_page; i <= first_page + max_pages_to_display; i++) {
					pages_to_display.push(i);	
				}
			}
			$scope.last_page = response.metadata.number_of_pages;
			$scope.pages_to_display = pages_to_display;
		});
	}

	$scope.pageOffsetBy = function(offset) {
		return Math.min(Math.max(parseInt($scope.query.page) + parseInt(offset), 1), $scope.last_page).toString();
	}

	$scope.fetchSearchResults();
	updateTitle();
}])

.directive('googlePlacesCitiesSearch', function() {
	return function($scope, element) {
		var autocomplete = new google.maps.places.Autocomplete(element[0], { types: ['(cities)'] });
		autocomplete.addListener('place_changed', function() {
			var place = autocomplete.getPlace();
			$scope.query.latitude = place.geometry.location.lat();
			$scope.query.longitude = place.geometry.location.lng();
			$scope.query.locality = place.formatted_address;
		});
	};
});
