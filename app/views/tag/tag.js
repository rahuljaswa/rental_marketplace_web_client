angular.module('app.tag', [])

.controller('TagController', ['$scope', '$http', '$stateParams', 'Tags', 'Cities', function($scope, $http, $stateParams, Tags, Cities) {
	document.title = "BorrowBear - Products";

	cityId = $stateParams.cityId;
	if (cityId) {
		$scope.city = Cities.get({ id: cityId }, function(response) {
			updateTitle();
		});
	}

	$scope.tag = Tags.get({ id: $stateParams.tagId }, function(response) {
		updateTitle();
	});

	$scope.toggleFeaturedStatus = function() {
		$scope.tag.featured = !$scope.tag.featured;
		Tags.update({ id: $scope.tag.id }, $scope.tag, function(response) {
			$scope.tag = response;
		});
	}

	function updateTitle() {
		var title = "BorrowBear - ";
		if ($scope.city && $scope.tag) {
			document.title = "BorrowBear - " + $scope.tag.name + " Products For Rent In " + $scope.city.city_name + ", " + $scope.city.country.country_name;
		} else if ($scope.tag) {
			document.title = "BorrowBear - " + $scope.tag.name + " Products For Rent";
		}
	}
}]);
