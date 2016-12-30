angular.module('app.tag', [])

.controller('TagController', ['$scope', '$http', '$stateParams', 'Cities', 'Pagination', 'Products', 'Tags',  function($scope, $http, $stateParams, Cities, Pagination, Products, Tags) {
	document.title = "BorrowBear - Products";

	$scope.tagId = $stateParams.tagId;
	$scope.query = {
		tags: $scope.tagId.toString(),
		active: true,
		page: $stateParams.page
	}

	cityId = $stateParams.cityId;
	if (cityId) {
		$scope.city = Cities.get({ id: cityId }, function(response) {
			updateTitle();
		});
	}

	$scope.tag = Tags.get({ id: $scope.tagId }, function(response) {
		updateTitle();
	});

	$scope.toggleFeaturedStatus = function() {
		$scope.tag.featured = !$scope.tag.featured;
		Tags.update({ id: $scope.tagId }, $scope.tag, function(response) {
			$scope.tag = response;
		});
	}

	$scope.fetchProducts = function() {
		$scope.products = Products.query($scope.query, function(response) {
			pagination = Pagination.generateInfo(response);
			$scope.query.page = pagination.page;
			$scope.last_page = pagination.last_page;
			$scope.pages_to_display = pagination.pages_to_display;
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

	$scope.paginatedURLWithOffset = function(destination_page, offset, last_page) {
		var url = "/tag/" + $scope.tagId.toString();
		url += "?page=" + Math.min(Math.max(parseInt(destination_page) + parseInt(offset), 1), last_page).toString();
		return url;
	}

	$scope.fetchProducts();
}]);
