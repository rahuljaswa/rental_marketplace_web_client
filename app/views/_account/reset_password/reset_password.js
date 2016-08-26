angular.module('app.resetPassword', [])

.controller('ResetPasswordController', ['$scope', '$http', '$auth', '$stateParams', '$state', function($scope, $http, $auth, $stateParams, $state) {
	document.title = "BorrowBear - Reset Password";

	$scope.formDisabled = false;

	$scope.resetPasswordForm = {
		password: null,
		password_confirmation: null
	}

	$scope.resetPassword = function() {
		$scope.formDisabled = true;

		$auth.updatePassword($scope.resetPasswordForm)
		.then(function(response) {
			$state.go('home');
		},
		function(response) {
			$scope.formDisabled = false;
		});
	}

	$scope.validates = function() {
		return ($scope.resetPasswordForm.password &&
			($scope.resetPasswordForm.password.length >= 6) &&
			$scope.resetPasswordForm.password_confirmation &&
			($scope.resetPasswordForm.password_confirmation === $scope.resetPasswordForm.password));
	}

	$scope.loginButtonPressed = function() {
		$state.go('login', $stateParams);
	}
}]);
