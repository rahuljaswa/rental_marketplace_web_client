angular.module('app.featured_cities', [])

.controller('FeaturedCitiesController', ['$scope', 'Cities', function($scope, Cities) {
	document.title = "BorrowBear - Featured Cities";

	$scope.query = {
		featured: true
	}
	
	$scope.cities = Cities.query($scope.query, null);
}]);
