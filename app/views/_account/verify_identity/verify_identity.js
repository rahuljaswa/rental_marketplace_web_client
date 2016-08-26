angular.module('app.verifyIdentity', [])

.controller('VerifyIdentityController', ['$rootScope', '$scope', '$http', '$auth', '$stateParams', '$state', 'Users', function($rootScope, $scope, $http, $auth, $stateParams, $state, Users) {
	document.title = "BorrowBear - Verify Identity";

	$scope.formDisabled = false;

	$scope.fetchedUser = $rootScope.user;

	$scope.StateEnum = {
		EMAIL_ENTRY: 0, 
		EMAIL_VERIFICATION: 1,
		PHONE_NUMBER_ENTRY: 2,
		PHONE_NUMBER_VERIFICATION: 3,
		properties: {
			0: {
				breadcrumbTitle: "Email",
				description: "Your email is used to update you with urgent matters regarding your rentals.",
				button_text: "Send verification email"
			},
			1: {
				breadcrumbTitle: "Confirm Email",
				description: "Your email is used to update you with urgent matters regarding your rentals.",
				button_text: "Verify"
			},
			2: {
				breadcrumbTitle: "Phone",
				description: "Please enter your phone number so people can communicate with you about your rentals.",
				button_text: "Send verification message"
			},
			3: {
				breadcrumbTitle: "Confirm Phone",
				description: "Please verify your phone number.",
				button_text: "Verify"
			}
		}
	}

	$scope.form = {
		phone_number: $scope.fetchedUser.phone_number,
		phone_number_verification_code: "",
		email_verification_code: ""
	}

	$scope.stateCompleted = function(state) {
		switch(state) {
			case $scope.StateEnum.EMAIL_ENTRY: {
				return $scope.fetchedUser.email;
				break;
			}

			case $scope.StateEnum.EMAIL_VERIFICATION: {
				return $scope.fetchedUser.email_verified_at;
				break;
			}

			case $scope.StateEnum.PHONE_NUMBER_ENTRY: {
				return $scope.form.phone_number;
				break;
			}

			case $scope.StateEnum.PHONE_NUMBER_VERIFICATION: {
				return $scope.fetchedUser.phone_number_verified_at;
				break;
			}
		}
		return 
	}

	$scope.canSetState = function(state) {
		if ($scope.currentState == state) {
			return false;
		}
		switch(state) {
			case $scope.StateEnum.EMAIL_ENTRY: {
				return !$scope.stateCompleted($scope.StateEnum.EMAIL_VERIFICATION) ;
				break;
			}

			case $scope.StateEnum.EMAIL_VERIFICATION: {
				return ($scope.stateCompleted($scope.StateEnum.EMAIL_ENTRY) && 
					!$scope.stateCompleted($scope.StateEnum.EMAIL_VERIFICATION) &&
					$scope.fetchedUser.email_verification_code_sent_at);
				break;
			}

			case $scope.StateEnum.PHONE_NUMBER_ENTRY: {
				return ($scope.stateCompleted($scope.StateEnum.EMAIL_VERIFICATION) && 
					!$scope.stateCompleted($scope.StateEnum.PHONE_NUMBER_VERIFICATION));
				break;
			}

			case $scope.StateEnum.PHONE_NUMBER_VERIFICATION: {
				return ($scope.stateCompleted($scope.StateEnum.PHONE_NUMBER_ENTRY) && 
					!$scope.stateCompleted($scope.StateEnum.PHONE_NUMBER_VERIFICATION) &&
					$scope.fetchedUser.phone_number_verification_code_sent_at);
				break;
			}
		}
		return 
	}

	$scope.validates = function() {
		switch($scope.currentState) {
			case $scope.StateEnum.EMAIL_ENTRY: {
				return true;
				break;
			}

			case $scope.StateEnum.EMAIL_VERIFICATION: {
				return ($scope.form.email_verification_code.length == 4);
				break;
			}

			case $scope.StateEnum.PHONE_NUMBER_ENTRY: {
				return $scope.form.phone_number;
				break;
			}

			case $scope.StateEnum.PHONE_NUMBER_VERIFICATION: {
				return ($scope.form.phone_number_verification_code.length == 4);
				break;
			}
		}
		return 
	}

	$scope.setCurrentState = function(state) {
		var shouldSetState = false;
		switch(state) {
			case $scope.StateEnum.EMAIL_ENTRY: {
				shouldSetState = !$scope.fetchedUser.email_verified_at;
				break;
			}

			case $scope.StateEnum.EMAIL_VERIFICATION: {
				shouldSetState = !$scope.fetchedUser.email_verified_at;
				break;
			}

			case $scope.StateEnum.PHONE_NUMBER_ENTRY: {
				shouldSetState = !$scope.fetchedUser.phone_number_verified_at;
				break;
			}

			case $scope.StateEnum.PHONE_NUMBER_VERIFICATION: {
				shouldSetState = !$scope.fetchedUser.phone_number_verified_at;
				break;
			}
		}

		if (shouldSetState) {
			$scope.currentState = state;	
		} else {
			if (state == $scope.StateEnum.PHONE_NUMBER_VERIFICATION) {
				$scope.completeFlow();
			} else {
				$scope.setCurrentState(state + 1);
			}
		}
		return 
	}

	$scope.buttonPressed = function() {
		switch($scope.currentState) {
			case $scope.StateEnum.EMAIL_ENTRY: {
				$scope.formDisabled = true;
				Users.get({ 
					id: $scope.fetchedUser.id,
					action: 'send_email_verification',
					email: $scope.fetchedUser.email
				}, function(response) {
					$scope.formDisabled = false;
					$scope.fetchedUser = response;
					$scope.setCurrentState($scope.currentState + 1);
				}, function(response) {
					$scope.formDisabled = false;
				});
				break;
			}

			case $scope.StateEnum.EMAIL_VERIFICATION: {
				$scope.formDisabled = true;
				Users.get({ 
					id: $scope.fetchedUser.id,
					action: 'verify_email',
					email_verification_code: $scope.form.email_verification_code
				}, function(response) {
					$scope.formDisabled = false;
					$scope.fetchedUser = response;
					if (response.email_verified_at) {
						$scope.setCurrentState($scope.currentState + 1);
					}
				}, function(response) {
					$scope.formDisabled = false;
				});
				break;
			}

			case $scope.StateEnum.PHONE_NUMBER_ENTRY: {
				$scope.formDisabled = true;
				var phone_number = "";
				var dialCode = angular.element(document.querySelector('#phone-number-entry-input')).intlTelInput("getSelectedCountryData").dialCode;
				if ($scope.form.phone_number.substring(0, dialCode.length) != dialCode) {
					phone_number += dialCode;
				}
				phone_number += $scope.form.phone_number;
				Users.get({ 
					id: $scope.fetchedUser.id,
					action: 'send_phone_number_verification',
					phone_number: phone_number
				}, function(response) {
					$scope.formDisabled = false;
					$scope.fetchedUser = response;
					$scope.setCurrentState($scope.currentState + 1);
				}, function(response) {
					$scope.formDisabled = false;
				});
				break;
			}

			case $scope.StateEnum.PHONE_NUMBER_VERIFICATION: {
				$scope.formDisabled = true;
				Users.get({ 
					id: $scope.fetchedUser.id,
					action: 'verify_phone_number',
					phone_number_verification_code: $scope.form.phone_number_verification_code
				}, function(response) {
					$scope.formDisabled = false;
					$scope.fetchedUser = response;
					if (response.phone_number_verified_at) {
						$scope.completeFlow();
					}
				}, function(response) {
					$scope.formDisabled = false;
				});
				break;
			}
		}
		return
	}

	$scope.completeFlow = function() {
		if ($stateParams.redirectPath) {
			$state.go($stateParams.redirectPath, $stateParams.redirectParams);
		} else {
			$state.go('home');
		}
	}

	$scope.setCurrentState(0);
}]);
