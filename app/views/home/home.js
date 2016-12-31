angular.module('app.home', [])

.controller('HomeController', ['$scope', '$http', '$state', 'Products', 'Tags', 'CarouselImages', function($scope, $http, $state, Products, Tags, CarouselImages) {
	document.title = "BorrowBear - Product Rental Marketplace";

	$scope.featured_products = CarouselImages;

	$scope.productsQuery = {
		query: "",
		locality: "Palo Alto, CA, United States",
		latitude: 37.4281704,
		longitude: -122.1614915,
		radius: 50,
		active: true,
		featured: true,
		results_per_page: 7,
		page: 1
	};

	$scope.products = Products.query($scope.productsQuery);

	$scope.tags = Tags.query({
		query: "",
		results_per_page: 7,
		featured: true
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
		var options = {
			types: ['(cities)'],
			componentRestrictions: { country: 'us' }
		}
		var autocomplete = new google.maps.places.Autocomplete(element[0], options);
		autocomplete.addListener('place_changed', function() {
			var place = autocomplete.getPlace();
			$scope.productsQuery.latitude = place.geometry.location.lat();
			$scope.productsQuery.longitude = place.geometry.location.lng();
			$scope.productsQuery.locality = place.formatted_address;
		});
	};
});
