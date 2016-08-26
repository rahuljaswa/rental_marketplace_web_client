angular.module('app.rental', [])

.controller('RentalController', ['$scope', '$http', '$stateParams', 'Rentals', 'Messages', function($scope, $http, $stateParams, Rentals, Messages) {
	document.title = "BorrowBear - Rental";

	$scope.message = {
		text: null
	}

	var messageInProgress = false;

	$scope.changeStatus = function(status) {
		$scope.rental.status = status;
		Rentals.update({ id: $scope.rental.id }, $scope.rental, function(response) {
			$scope.rental = response;
			document.title = "BorrowBear - " + $scope.rental.product.title + " Rental";
		});
	}

	$scope.confirmButtonPressed = function() {
		$scope.changeStatus('accepted');
	}

	$scope.rejectByProductOwnerButtonPressed = function() {
		$scope.changeStatus('rejected_by_product_owner');
	}

	$scope.rejectByRenterButtonPressed = function() {
		$scope.changeStatus('rejected_by_renter');
	}

	$scope.cancelByProductOwnerButtonPressed = function() {
		$scope.changeStatus('cancelled_by_product_owner');
	}

	$scope.cancelByRenterButtonPressed = function() {
		$scope.changeStatus('cancelled_by_renter');
	}

	$scope.fetchRental = function() {
		$scope.rental = Rentals.get({ id: $stateParams.rentalId });
	}

	$scope.sendMessage = function() {
		if ($scope.message.text && !messageInProgress) {
			messageInProgress = true;

			Messages.create({
				rental_id: $scope.rental.id,
				text: $scope.message.text
			}, function(response) {
				$scope.message.text = null;
				messageInProgress = false;
				$scope.fetchRental();
			}, function(response) {
				messageInProgress = false;
			});
		}
	}

	$scope.fetchRental();
}]);
