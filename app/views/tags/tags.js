angular.module('app.tags', [])

.controller('TagsController', ['$scope', '$http', '$stateParams', 'Tags', 'Pagination', function($scope, $http, $stateParams, Tags, Pagination) {
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

	$scope.paginatedURLWithOffset = function(destination_page, offset, last_page) {
		var url = "/tags?";
		url += "&page=" + Math.min(Math.max(parseInt(destination_page) + parseInt(offset), 1), last_page).toString();
		url += "&query=" + ($scope.query.query ? $scope.query.query : "");
		return url;
	}
	
	$scope.fetchTags();
}]);
