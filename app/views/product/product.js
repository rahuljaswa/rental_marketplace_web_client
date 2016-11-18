angular.module('app.product', [])

.controller('ProductController', ['$scope', '$http', '$stateParams', '$state', 'Products', function($scope, $http, $stateParams, $state, Products) {
	document.title = "BorrowBear - Rent";

	$scope.today = new Date();
	$scope.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

	$scope.productId = $stateParams.productId;

	$scope.endDateInvalid = false;

	$scope.rentalForm = {
		rentalCost: 0.0,
		numberOfDays: 0.0,
		securityDeposit: 0.0,
		startDate: null,
		endDate: null
	}

	$scope.startDatePicker = {
		opened: false
	}
	$scope.endDatePicker = {
		opened: false
	}

	$scope.startDateOptions = {
		formatYear: 'yy', 
		minDate: $scope.today,
		maxDate: $scope.maxDate,
		startingDay: 1,
		showWeeks: false,
		showButtonBar: false
	}

	$scope.endDateOptions = {
		formatYear: 'yy', 
		minDate: $scope.startDate,
		maxDate: $scope.maxDate,
		startingDay: 1,
		showWeeks: false
	}

	$scope.product = Products.get({ id: $scope.productId }, function(response) {
		document.title = "BorrowBear - " + $scope.product.title;
		updatedQuotedPriceComponents();
	});

	$scope.startDateChanged = function() {
		$scope.endDateInvalid = $scope.updateEndDateInvalid();
		$scope.endDateOptions.minDate = $scope.startDate;
		$scope.endDatePicker.opened = true;
		updatedQuotedPriceComponents();
	}

	$scope.endDateChanged = function() {
		$scope.endDateInvalid = $scope.updateEndDateInvalid();
		updatedQuotedPriceComponents();
	}

	$scope.startDatePickerOpened = function() {
		$scope.startDatePicker.opened = true;
	}

	$scope.endDatePickerOpened = function() {
		$scope.endDateOptions.minDate = $scope.startDate;
		$scope.endDatePicker.opened = true;
	};

	$scope.updateEndDateInvalid = function() {
		return $scope.rentalForm.startDate > $scope.rentalForm.endDate;
	}

	$scope.toggleFeaturedStatus = function() {
		$scope.product.featured = !$scope.product.featured;
		Products.update({ id: $scope.product.id }, $scope.product, function(response) {
			$scope.product = response;
		});
	}

	$scope.requestToBorrowButtonClicked = function() {
		if ($scope.rentalForm.startDate && $scope.rentalForm.endDate && !$scope.updateEndDateInvalid()) {
			$state.go('rentConfirmation', {
				productId: $stateParams.productId,
				startDate: $scope.rentalForm.startDate,
				endDate: $scope.rentalForm.endDate,
				rentalCost: $scope.rentalForm.rentalCost,
				numberOfDays: $scope.rentalForm.numberOfDays,
				securityDeposit: $scope.rentalForm.securityDeposit
			});
		} else {
			if (!$scope.rentalForm.startDate) {
				$scope.startDatePicker.opened = true;
			} else {
				$scope.endDatePicker.opened = true;
			}
		}
	}

	$scope.disableProduct = function() {
		$scope.product.active = false;
		Products.update({ id: $scope.product.id }, $scope.product, function(response) {
			$scope.product = response;
		});
	}

	$scope.enableProduct = function() {
		$scope.product.active = true;
		Products.update({ id: $scope.product.id }, $scope.product, function(response) {
			$scope.product = response;
		});
	}

	function updatedQuotedPriceComponents() {
		$scope.rentalForm.securityDeposit = $scope.product.security_deposit;
		if ($scope.rentalForm.startDate && $scope.rentalForm.endDate) {
			$scope.rentalForm.numberOfDays = ((($scope.rentalForm.endDate - $scope.rentalForm.startDate)/24/60/60/1000) + 1.0);
		} else {
			$scope.rentalForm.numberOfDays = 0.0;
		}
		$scope.rentalForm.rentalCost = $scope.rentalForm.numberOfDays * $scope.product.price;
	}
}]);
