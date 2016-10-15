angular.module('app.tags', [])

.controller('TagsController', ['$scope', '$http', '$stateParams', 'Tags', function($scope, $http, $stateParams, Tags) {
	document.title = "BorrowBear - Search Categories";

	$scope.tags = [];
	$scope.query = { 
		query: "", 
		page: 1
	};

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
		$scope.tags = Tags.query($scope.query);
	}

	$scope.fetchTags();
}]);
