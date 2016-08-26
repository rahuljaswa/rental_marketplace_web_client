angular.module('app.profile', [])

.controller('ProfileController', ['$scope', '$http', '$stateParams', '$state', 'Users', 'Products', function($scope, $http, $stateParams, $state, Users, Products) {
	document.title = "BorrowBear - Profile";

	$scope.StateEnum = {
		PROFILE: 0,
		LISTINGS: 1, 
		RENTALS: 2,
		PAYMENTS: 3
	}

	$scope.selectedIndex = $scope.StateEnum.PROFILE;

	$scope.accountInformation = null;
	$scope.customerInformation = null;
	$scope.userId = $stateParams.userId;

	$scope.tabClicked = function(state) {
		$scope.selectedIndex = state;
	}

	$scope.redirectToEditProduct = function(productId) {
		$state.go('list', {
			productId: productId,
			redirectPath: 'profile',
			redirectParams: $.extend({}, $stateParams)
		});
	}

	$scope.deleteCard = function(card) {
		Users.update({ 
			id: $scope.userId, 
			action: 'remove_credit_card'
		}, { card_id: card.id }, function(response) {
			$scope.fetchUser();
		});
	}

	$scope.setCardAsDefault = function(card) {
		Users.update({ 
			id: $scope.userId, 
			action: 'set_credit_card_as_default'
		}, { card_id: card.id }, function(response) {
			$scope.fetchUser();
		});
	}

	$scope.disableProduct = function(product) {
		product.active = false;
		Products.update({ id: product.id }, product, function(response) {
			$scope.fetchUser();
		});
	}

	$scope.enableProduct = function(product) {
		product.active = true;
		Products.update({ id: product.id }, product, function(response) {
			$scope.fetchUser();
		});
	}

	$scope.fetchUser = function() {
		$scope.fetchedUser = Users.get({ id: $scope.userId }, function(response) {
			document.title = "BorrowBear - " + $scope.fetchedUser.username + " Profile ";
		});

		Users.get({
			id: $scope.userId,
			action: 'fetch_payment_account'
		}, function(response) {
			$scope.accountInformation = response;
		});

		Users.get({
			id: $scope.userId,
			action: 'fetch_payment_customer'
		}, function(response) {
			$scope.customerInformation = response;
		});
	}

	$scope.fetchUser();
}]);
