angular.module('app.addPaymentMethod', [])

.controller('AddPaymentMethodController', ['$scope', '$rootScope', '$http', 'Users', '$state', '$stateParams', function($scope, $rootScope, $http, Users, $state, $stateParams) {
	document.title = "BorrowBear - Add Payment Method";

	$scope.formDisabled = false;

	$scope.nonForm = {
		exp_date: null
	}

	$scope.secureInfo = {
		number: null,
		exp_month: null,
		exp_year: null,
		cvc: null,
		address_zip: null
	}

	$scope.$watch('nonForm.exp_date', function(value) {
		if (value) {
			$scope.secureInfo.exp_month = value.getMonth() + 1;
			$scope.secureInfo.exp_year = value.getFullYear();
		} else {
			$scope.secureInfo.exp_month = null;
			$scope.secureInfo.exp_year = null;
		}
	});

	$scope.validates = function() {
		return ($scope.secureInfo.number &&
			Stripe.card.validateCardNumber($scope.secureInfo.number) &&
			$scope.secureInfo.exp_month &&
			$scope.secureInfo.exp_year &&
			Stripe.card.validateExpiry($scope.secureInfo.exp_month, $scope.secureInfo.exp_year) &&
			$scope.secureInfo.cvc &&
			Stripe.card.validateCVC($scope.secureInfo.cvc) &&
			$scope.secureInfo.address_zip);
	}

	$scope.addPaymentMethod = function() {
		$scope.formDisabled = true;

		Stripe.card.createToken($scope.secureInfo, function(status, response) {
			if (status == 200) {
				Users.update({ 
					id: $rootScope.user.id, 
					action: 'add_credit_card'
				}, { card_token: response.id }, function(response) {
					if ($stateParams.redirectPath) {
						$state.go($stateParams.redirectPath, $stateParams.redirectParams);
					} else {
						$state.go('profile', { userId: $rootScope.user.id });
					}
				}, function(response) {
					$scope.formDisabled = false;
				});
			} else {
				$scope.formDisabled = false;
			}
		});
	}
}]);
