angular.module('app.experience', [])

.controller('ExperienceController', ['$scope', '$http', '$stateParams', '$state', 'Experiences', function($scope, $http, $stateParams, $state, Experiences) {
	document.title = "BorrowBear - Purchase";

	$scope.today = new Date();
	$scope.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

	$scope.experienceId = $stateParams.experienceId;

	$scope.trackingInputs = { 
		selectedExchangeOption: null
	}

	$scope.exchangeOptions = [];

	$scope.endDateInvalid = false;

	$scope.purchaseForm = {
		experience_id: $scope.experienceId,
		equipment_rental_number_of_days: 0.0,
		equipment_rental_cost: 0.0,
		equipment_rental_delivery_cost: 0.0,
		equipment_rental_security_deposit: 0.0,
		equipment_rental_shipping_cost: 0.0,
		equipment_rental_delivery_cost: 0.0,
		equipment_rental_starts_at: null,
		equipment_rental_ends_at: null,
		experience_guide_cost: 0.0,
		experience_leader_cost: 0.0,
		payment_processing_cost: 0.0,
		payment_transfer_cost: 0.0,
		platform_cost: 0.0,
		taxes: 0.0,
		total_cost: 0.0,
		deliver: false,
		ship: false,
		pickup: false,
		guide: false,
		leader: false
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

	$scope.experience = Experiences.get({ id: $scope.experienceId }, function(response) {
		document.title = "BorrowBear - " + $scope.experience.title;
		if ($scope.experience.equipment_rental_available) {
			if ($scope.experience.equipment_rental_shippable) {
				$scope.exchangeOptions.push("Ship to me");
			}
			if ($scope.experience.equipment_rental_pickupable) {
				$scope.exchangeOptions.push("Deliver to me");
			}
			if ($scope.experience.equipment_rental_deliverable) {
				$scope.exchangeOptions.push("I'll pickup");	
			}
			$scope.trackingInputs.selectedExchangeOption = (0).toString();
		}
		updatedQuotedPriceComponents();
	});

	$scope.$watch('trackingInputs.selectedExchangeOption', function(value) {
		$scope.purchaseForm.deliver = false;
		$scope.purchaseForm.ship = false;
		$scope.purchaseForm.pickup = false;

		var selectedOption = $scope.exchangeOptions[value];
		if (selectedOption === "Ship to me") {
			$scope.purchaseForm.ship = true;
		} else if (selectedOption === "Deliver to me") {
			$scope.purchaseForm.deliver = true;
		} else if (selectedOption === "I'll pickup") {
			$scope.purchaseForm.pickup = true;
		}

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

	$scope.shippingChanged = function() {
		updatedQuotedPriceComponents();	
	}

	$scope.endDatePickerOpened = function() {
		$scope.endDateOptions.minDate = $scope.startDate;
		$scope.endDatePicker.opened = true;
	};

	$scope.updateEndDateInvalid = function() {
		return $scope.purchaseForm.equipment_rental_starts_at > $scope.purchaseForm.equipment_rental_ends_at;
	}

	$scope.toggleFeaturedStatus = function() {
		$scope.experience.featured = !$scope.experience.featured;
		Experiences.update({ id: $scope.experience.id }, $scope.experience, function(response) {
			$scope.experience = response;
		});
	}

	$scope.requestToBorrowButtonClicked = function() {
		if ($scope.purchaseForm.equipment_rental_starts_at && $scope.purchaseForm.equipment_rental_ends_at && !$scope.updateEndDateInvalid()) {
			$state.go('purchaseConfirmation', $scope.purchaseForm);
		} else {
			if (!$scope.purchaseForm.equipment_rental_starts_at) {
				$scope.startDatePicker.opened = true;
			} else {
				$scope.endDatePicker.opened = true;
			}
		}
	}

	$scope.disableExperience = function() {
		$scope.experience.active = false;
		Experiences.update({ id: $scope.experience.id }, $scope.experience, function(response) {
			$scope.experience = response;
		});
	}

	$scope.enableExperience = function() {
		$scope.experience.active = true;
		Experiences.update({ id: $scope.experience.id }, $scope.experience, function(response) {
			$scope.experience = response;
		});
	}

	function updatedQuotedPriceComponents() {
		if ($scope.experience.equipment_rental_available) {
			$scope.purchaseForm.equipment_rental_security_deposit = $scope.experience.equipment_rental_security_deposit;
			
			if ($scope.purchaseForm.equipment_rental_starts_at && $scope.purchaseForm.equipment_rental_ends_at) {
				$scope.purchaseForm.equipment_rental_number_of_days = ((($scope.purchaseForm.equipment_rental_ends_at - $scope.purchaseForm.equipment_rental_starts_at)/24/60/60/1000) + 1.0);
			} else {
				$scope.purchaseForm.equipment_rental_number_of_days = 0.0;
			}

			if ($scope.purchaseForm.ship) {
				$scope.purchaseForm.equipment_rental_shipping_cost = $scope.experience.equipment_rental_shipping_cost;
			} else {
				$scope.purchaseForm.equipment_rental_shipping_cost = 0.0;
			}

			if ($scope.purchaseForm.deliver) {
				$scope.purchaseForm.equipment_rental_delivery_cost = $scope.experience.equipment_rental_delivery_cost;
			} else {
				$scope.purchaseForm.equipment_rental_delivery_cost = 0.0;
			}

			var total_cost = ($scope.purchaseForm.equipment_rental_number_of_days * $scope.experience.equipment_rental_cost);
			total_cost += $scope.purchaseForm.equipment_rental_shipping_cost;
			total_cost += $scope.purchaseForm.equipment_rental_delivery_cost;
			$scope.purchaseForm.total_cost = total_cost;
		}

		if ($scope.experience.experience_guide_available) {
			$scope.purchaseForm.experience_guide_cost = $scope.experience.experience_guide_cost;
		}

		if ($scope.experience.experience_leader_available) {
			$scope.purchaseForm.experience_leader_cost = $scope.experience.experience_leader_cost;
		}
	}
}]);
