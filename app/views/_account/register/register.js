angular.module('app.register', [])

.controller('RegisterController', ['$scope', '$element', '$http', '$q', '$auth', '$stateParams', '$state', 'Users', function($scope, $element, $http, $q, $auth, $stateParams, $state, Users) {
	document.title = "BorrowBear - Register";

	$scope.formDisabled = false;

	$scope.registrationForm = {
		username: null,
		email: null,
		password: null,
		password_confirmation: null
	}

	$scope.registerUser = function() {
		$scope.formDisabled = true;

		$auth.submitRegistration($scope.registrationForm)
		.then(function(response) {
			$auth.submitLogin($scope.registrationForm)
			.then(function(response) {
				var user = Users.get({ id: response.id }, function(response) {
					user.username = $scope.registrationForm.username;
					Users.update({ id: user.id }, user, function(response) {
						$state.go('verifyIdentity', $stateParams);
					}, function(response) {
						$scope.formDisabled = false;
					});
				}, function(response) {
					$scope.formDisabled = false;
				});
			}, 
			function(response) {
				$scope.formDisabled = false;
			});
		},
		function(response) {
			$scope.formDisabled = false;
		});
	}

	$scope.validates = function() {
		return ($scope.registrationForm.username &&
			($scope.registrationForm.username.length > 5) &&
			$scope.registrationForm.email &&
			($scope.registrationForm.email.length > 5) &&
			$scope.registrationForm.password &&
			($scope.registrationForm.password.length >= 6) &&
			$scope.registrationForm.password_confirmation &&
			($scope.registrationForm.password_confirmation === $scope.registrationForm.password));
	}

	$scope.requestPasswordButtonPressed = function() {
		$state.go('requestPasswordReset', $stateParams);
	}

	$scope.loginButtonPressed = function() {
		$state.go('login', $stateParams);
	}
}]);
