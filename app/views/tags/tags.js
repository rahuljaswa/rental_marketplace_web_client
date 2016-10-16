angular.module('app.tags', [])

.controller('TagsController', ['$scope', '$http', '$stateParams', 'Tags', function($scope, $http, $stateParams, Tags) {
	document.title = "BorrowBear - Search Categories";

	$scope.tags = [];
	$scope.query = $stateParams;
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
		$scope.fetchTags();
	}

	$scope.searchButtonPressed = function() {
		$scope.fetchTags();
	}

	$scope.fetchTags = function() {
		$scope.tags = Tags.query($scope.query, function(response) {
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

	$scope.fetchTags();
}]);
