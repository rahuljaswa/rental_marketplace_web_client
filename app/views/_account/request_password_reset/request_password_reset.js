angular.module('app.requestPasswordReset', [])

.controller('RequestPasswordResetController', ['$scope', '$http', '$auth', '$stateParams', '$state', function($scope, $http, $auth, $stateParams, $state) {
	document.title = "BorrowBear - Request Password Reset";

	$scope.formDisabled = false;

	$scope.requestPasswordResetForm = {
		email: null
	}

	$scope.requestPasswordReset = function() {
		$scope.formDisabled = true;

		$auth.requestPasswordReset($scope.requestPasswordResetForm)
		.then(function(response) {
			$state.go('home', $stateParams);
		},
		function(response) {
			$scope.formDisabled = false;
		});
	}

	$scope.validates = function() {
		return ($scope.requestPasswordResetForm.email &&
			($scope.requestPasswordResetForm.email.length > 5));
	}

	$scope.loginButtonPressed = function() {
		$state.go('login', $stateParams);
	}

	$scope.registerButtonPressed = function() {
		$state.go('register', $stateParams);
	}
}]);
