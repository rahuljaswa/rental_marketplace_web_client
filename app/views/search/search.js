angular.module('app.search', [])

.controller('SearchController', ['$scope', '$http', '$stateParams', 'Products', 'Pagination', function($scope, $http, $stateParams, Products, Pagination) {
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
		$scope.query.page = 1;
		$scope.fetchSearchResults();
	}

	$scope.searchButtonPressed = function() {
		$scope.fetchSearchResults();
	}

	$scope.fetchSearchResults = function() {
		$scope.products = Products.query($scope.query, function(response) {
			pagination = Pagination.generateInfo(response);
			$scope.query.page = pagination.page;
			$scope.last_page = pagination.last_page;
			$scope.pages_to_display = pagination.pages_to_display;
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
