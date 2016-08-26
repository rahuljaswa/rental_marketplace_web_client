angular.module('app.login', [])

.controller('LoginController', ['$scope', '$http', '$q', '$auth', '$state', '$stateParams', function($scope, $http, $q, $auth, $state, $stateParams) {
	document.title = "BorrowBear - Login";

	$scope.formDisabled = false;

	$scope.loginForm = {
		username: null,
		password: null
	}

	$scope.loginUser = function() {
		$scope.formDisabled = true;
		$auth.submitLogin($scope.loginForm)
		.then(function(response) {
			if (response.phone_number_verified_at && response.email_verified_at) {
				if ($stateParams.redirectPath) {
					$state.go($stateParams.redirectPath, $stateParams.redirectParams);
				} else {
					$state.go('home');
				}
			} else {
				$state.go('verifyIdentity', $stateParams);
			}
		},
		function(response) {
			$scope.formDisabled = false;
		});
	}

	$scope.validates = function() {
		return ($scope.loginForm.email &&
			($scope.loginForm.email.length > 5) &&
			$scope.loginForm.password &&
			($scope.loginForm.password.length >= 6));
	}

	$scope.requestPasswordButtonPressed = function() {
		$state.go('requestPasswordReset', $stateParams);
	}

	$scope.registerButtonPressed = function() {
		$state.go('register', $stateParams);
	}
}]);
