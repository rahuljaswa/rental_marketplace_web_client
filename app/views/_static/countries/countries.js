angular.module('app.countries', [])

.controller('CountriesController', ['$scope', 'Countries', function($scope, Countries) {
	document.title = "BorrowBear - Countries";

	$scope.query = {
		available: true
	}

	$scope.countries = Countries.query($scope.query);
}]);
