angular.module('app.errors', [])

.controller('ErrorsController', ['$rootScope', '$scope', function($rootScope, $scope) {
	$scope.clearErrors = function() {
		$rootScope.errors = null;
	}
}]);
