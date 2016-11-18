angular.module('app.tag', [])

.controller('TagController', ['$scope', '$http', '$stateParams', 'Tags', function($scope, $http, $stateParams, Tags) {
	document.title = "BorrowBear - Products";

	$scope.tag = Tags.get({ id: $stateParams.tagId }, function(response) {
		document.title = "BorrowBear - " + $scope.tag.name + " Products";
	});

	$scope.toggleFeaturedStatus = function() {
		$scope.tag.featured = !$scope.tag.featured;
		Tags.update({ id: $scope.tag.id }, $scope.tag, function(response) {
			$scope.tag = response;
		});
	}
}]);
