angular.module('app.navigation', [])

.controller('NavigationController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
	$scope.home = $state.$current.includes.home;

	$scope.login = function() {
		$state.go('login', {
			redirectPath: $state.current.name,
			redirectParams: $.extend({}, $stateParams)
		});
	}

	$scope.register = function() {
		$state.go('register', {
			redirectPath: $state.current.name,
			redirectParams: $.extend({}, $stateParams)
		});
	}
}]);
