angular.module('app.tag', [])

.controller('TagController', ['$rootScope', '$scope', '$http', '$stateParams', '$location', 'Pagination', 'Products', 'Tags',  function($rootScope, $scope, $http, $stateParams, $location, Pagination, Products, Tags) {
	$scope.tagId = $stateParams.tagId;
	$scope.query = {
		tags: $scope.tagId.toString(),
		active: true,
		page: $stateParams.page
	}

	$scope.tag = Tags.get({ id: $scope.tagId }, function(response) {
		$rootScope.meta_og_image = $scope.tag.image_url;
		$rootScope.meta_og_url = $location.absUrl();
		$rootScope.meta_og_title = $scope.tag.name + ' Products Available';
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

	$scope.paginatedURLWithOffset = function(destination_page, offset, last_page) {
		var url = "/tag/" + $scope.tagId.toString();
		url += "?page=" + Math.min(Math.max(parseInt(destination_page) + parseInt(offset), 1), last_page).toString();
		return url;
	}

	$scope.fetchProducts();
}]);
