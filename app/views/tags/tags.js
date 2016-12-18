angular.module('app.tags', [])

.controller('TagsController', ['$scope', '$http', '$stateParams', 'Tags', 'Pagination', 'Cities', function($scope, $http, $stateParams, Tags, Pagination, Cities) {
	
	document.title = "BorrowBear - Search Categories";

	$scope.city = Cities.get({ id: $stateParams.cityId }, function(response) {
		document.title = "BorrowBear - Search Categories in " + $scope.city.city_name + ", " + $scope.city.country.country_name;
	});

	$scope.tags = [];
	
	$scope.query = $stateParams;
	delete $scope.query.featured;

	if (!$scope.query.query) {
		$scope.query.query = "";
	}
	if (!$scope.query.page) {
		$scope.query.page = 1;
	}

	$scope.$watch('query.query', function() {
		if (!$scope.query.query || !$scope.query.query.length) {
			$scope.fetchTags();
		}
	});

	$scope.queryInputChanged = function() {
		$scope.query.page = 1;
		$scope.fetchTags();
	}

	$scope.searchButtonPressed = function() {
		$scope.fetchTags();
	}

	$scope.fetchTags = function() {
		$scope.tags = Tags.query($scope.query, function(response) {
			pagination = Pagination.generateInfo(response);
			$scope.query.page = pagination.page;
			$scope.last_page = pagination.last_page;
			$scope.pages_to_display = pagination.pages_to_display;
		});
	}

	$scope.pageOffsetBy = function(offset) {
		return Math.min(Math.max(parseInt($scope.query.page) + parseInt(offset), 1), $scope.last_page).toString();
	}

	$scope.fetchTags();
}]);
