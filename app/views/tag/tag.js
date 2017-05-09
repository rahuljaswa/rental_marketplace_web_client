angular.module('app.tag', [])

.controller('TagController', ['$scope', '$http', '$stateParams', 'Cities', 'Pagination', 'Experiences', 'Tags',  function($scope, $http, $stateParams, Cities, Pagination, Experiences, Tags) {
	document.title = "BorrowBear - Experiences";

	$scope.tagId = $stateParams.tagId;
	$scope.query = {
		tags: $scope.tagId.toString(),
		active: true,
		page: $stateParams.page
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

	$scope.fetchExperiences = function() {
		$scope.experiences = Experiences.query($scope.query, function(response) {
			pagination = Pagination.generateInfo(response);
			$scope.query.page = pagination.page;
			$scope.last_page = pagination.last_page;
			$scope.pages_to_display = pagination.pages_to_display;
		});
	}

	function updateTitle() {
		var title = "BorrowBear - ";
		if ($scope.tag) {
			document.title = "BorrowBear - " + $scope.tag.name + " Experiences For Rent";	
		}
	}

	$scope.paginatedURLWithOffset = function(destination_page, offset, last_page) {
		var url = "/tag/" + $scope.tagId.toString();
		url += "?page=" + Math.min(Math.max(parseInt(destination_page) + parseInt(offset), 1), last_page).toString();
		return url;
	}

	$scope.fetchExperiences();
}]);
