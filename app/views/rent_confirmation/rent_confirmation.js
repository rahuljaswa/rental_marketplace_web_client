angular.module('app.rentConfirmation', [])

.controller('RentConfirmationController', ['$scope', '$rootScope', '$http', '$stateParams', '$state', 'Rentals', 'Products', 'Users', 'formattedCardFilter', function($scope, $rootScope, $http, $stateParams, $state, Rentals, Products, Users, formattedCardFilter) {
	document.title = "BorrowBear - Confirm Rental";

	$scope.formDisabled = false;

	$scope.cardSelectOptions = ["Add new card"];
	
	$scope.trackingInputs = { 
		selectedCardOption: null,
		exp_date: null
	}
	
	$scope.secureInfo = {
		number: null,
		exp_month: null,
		exp_year: null,
		cvc: null,
		address_zip: null
	}

	$scope.$watch('trackingInputs.exp_date', function(value) {
		if (value) {
			$scope.secureInfo.exp_month = value.getMonth() + 1;
			$scope.secureInfo.exp_year = value.getFullYear();
		} else {
			$scope.secureInfo.exp_month = null;
			$scope.secureInfo.exp_year = null;
		}
	});

	$scope.$watch('trackingInputs.selectedCardOption', function(value) {
		if ($scope.customerInformation) {
			if (value == 0) {
				$scope.priceQuote.card_id = null;
			} else {
				$scope.priceQuote.card_id = $scope.customerInformation.cards[value - 1].id;
			}
		}
	});

	$scope.product = Products.get({ id: $stateParams.productId }, function (response) {
		document.title = "BorrowBear - Confirm " + $scope.product.title + " Rental";
		$scope.priceQuote = Products.get({
			action: 'price_quote',
			id: $scope.product.id,
			starts_at: new Date($stateParams.startDate),
			ends_at: new Date($stateParams.endDate),
			shipping: $stateParams.shipping
		}, function(response) {
			$scope.customerInformation = Users.get({
				id: $rootScope.user.id,
				action: 'fetch_payment_customer'
			}, function(response) {
				for (var i = 0; i < $scope.customerInformation.cards.length; i++) {
					card = $scope.customerInformation.cards[i];
					$scope.cardSelectOptions.push(formattedCardFilter(card));
					if ($scope.customerInformation.default_card_id == card.id) {
						$scope.trackingInputs.selectedCardOption = (i + 1).toString();
					}
				}

				if ($scope.trackingInputs.selectedCardOption == null) {
					$scope.trackingInputs.selectedCardOption = (0).toString();
				}
			});
		});
	});

	$scope.validates = function() {
		var paymentProvided = ($scope.priceQuote.card_id || 
			($scope.secureInfo.number &&
				Stripe.card.validateCardNumber($scope.secureInfo.number) &&
				$scope.secureInfo.exp_month &&
				$scope.secureInfo.exp_year &&
				Stripe.card.validateExpiry($scope.secureInfo.exp_month, $scope.secureInfo.exp_year) &&
				$scope.secureInfo.cvc &&
				Stripe.card.validateCVC($scope.secureInfo.cvc) &&
				$scope.secureInfo.address_zip));
		return ($scope.priceQuote.terms_of_service && paymentProvided);
	}

	$scope.createRental = function() {
		$scope.formDisabled = true;
		if ($scope.validates) {
			if ($scope.priceQuote.card_id) {
				Rentals.create($scope.priceQuote, function(response) {
					$state.go('rental', { rentalId: response.id });
				}, function(response) {
					$scope.formDisabled = false;
				});
			} else {
				Stripe.card.createToken($scope.secureInfo, function(status, response) {
					if (status == 200) {
						var card_token = response.id;
						var card_id = response.card.id;
						Users.update({ 
							id: $rootScope.user.id, 
							action: 'add_credit_card'
						}, { 
							card_token: card_token
						}, function(response) {
							$scope.priceQuote.card_id = card_id;
							Rentals.create($scope.priceQuote, function(response) {
								$state.go('rental', { rentalId: response.id });
							}, function(response) {
								$scope.formDisabled = false;
							});
						}, function(response) {
							$scope.formDisabled = false;
						});
					} else {
						$scope.formDisabled = false;
					}
				});
			}
		}
	}
}]);
