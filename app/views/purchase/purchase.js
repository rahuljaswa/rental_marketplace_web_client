angular.module('app.purchase', [])

.controller('PurchaseController', ['$rootScope', '$scope', '$http', '$stateParams', 'Purchases', 'Messages', function($rootScope, $scope, $http, $stateParams, Purchases, Messages) {
	document.title = "BorrowBear - Purchase";

	$scope.message = {
		text: null
	}

	var messageInProgress = false;

	$scope.changeStatus = function(status) {
		$scope.purchase.status = status;
		Purchases.update({ id: $scope.purchase.id }, $scope.purchase, function(response) {
			$scope.purchase = response;
			document.title = "BorrowBear - " + $scope.purchase.experience.title + " Purchase";
		});
	}

	$scope.confirmButtonPressed = function() {
		$scope.changeStatus('accepted');
	}

	$scope.rejectByExperienceCreatorButtonPressed = function() {
		$scope.changeStatus('rejected_by_experience_owner');
	}

	$scope.rejectByRenterButtonPressed = function() {
		$scope.changeStatus('rejected_by_renter');
	}

	$scope.cancelByExperienceCreatorButtonPressed = function() {
		$scope.changeStatus('cancelled_by_experience_owner');
	}

	$scope.cancelByRenterButtonPressed = function() {
		$scope.changeStatus('cancelled_by_renter');
	}

	$scope.fetchPurchase = function() {
		$scope.purchase = Purchases.get({ id: $stateParams.purchaseId });
	}

	$scope.sendMessage = function() {
		if ($scope.message.text && !messageInProgress) {
			messageInProgress = true;

			Messages.create({
				purchase_id: $scope.purchase.id,
				text: $scope.message.text
			}, function(response) {
				$scope.message.text = null;
				messageInProgress = false;
				$scope.fetchPurchase();
			}, function(response) {
				messageInProgress = false;
			});
		}
	}

	$scope.fetchPurchase();
}]);
