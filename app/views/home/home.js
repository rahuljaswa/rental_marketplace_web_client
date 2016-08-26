angular.module('app.home', [])

.controller('HomeController', ['$scope', '$http', '$state', 'Products', 'Tags', 'CarouselImages', function($scope, $http, $state, Products, Tags, CarouselImages) {
	document.title = "BorrowBear - Product Rental Marketplace";

	$scope.featured_products = CarouselImages;

	$scope.productsQuery = {
		query: "",
		locality: "San Francisco, CA, United States",
		latitude: 37.773972,
		longitude: -122.431297,
		radius: 20,
		active: true,
		limit: 7
	};

	$scope.products = Products.query($scope.productsQuery);

	$scope.tags = Tags.query({
		query: "",
		limit: 7
	});

	$scope.viewAllProductsButtonPressed = function() {
		$state.go('search', $scope.productsQuery);
	}

	$scope.viewAllCategoriesButtonPressed = function() {
		$state.go('tags');
	}

	$scope.searchButtonPressed = function() {
		$state.go('search', $scope.productsQuery);
	}
}])

.directive('googlePlacesCitiesHome', function() {
	return function($scope, element) {
		var autocomplete = new google.maps.places.Autocomplete(element[0], { types: ['(cities)'] });
		autocomplete.addListener('place_changed', function() {
			var place = autocomplete.getPlace();
			$scope.productsQuery.latitude = place.geometry.location.lat();
			$scope.productsQuery.longitude = place.geometry.location.lng();
			$scope.productsQuery.locality = place.formatted_address;
		});
	};
});
