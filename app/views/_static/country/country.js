angular.module('app.country', [])

.controller('CountryController', ['$scope', '$stateParams', 'Cities', 'Pagination', function($scope, $stateParams, Cities, Pagination) {
	$scope.query = {
		countryId: $stateParams.countryId,
		page: $stateParams.page
	}

	document.title = "BorrowBear - Country";
	$scope.cities = Cities.query($scope.query, function(response) {
		document.title = "BorrowBear - " + response.data[0].country.country_name;

		pagination = Pagination.generateInfo(response);
		$scope.query.page = pagination.page;
		$scope.last_page = pagination.last_page;
		$scope.pages_to_display = pagination.pages_to_display;
	});

	$scope.paginatedURLWithOffset = function(destination_page, offset, last_page) {
		var url = "/country/" + $scope.query.countryId;
		url += "?page=" + Math.min(Math.max(parseInt(destination_page) + parseInt(offset), 1), last_page).toString();
		return url;
	}
}]);
