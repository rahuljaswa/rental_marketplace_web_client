angular.module('app.profile', [])

.controller('ProfileController', ['$scope', '$http', '$stateParams', '$state', 'Users', 'Experiences', function($scope, $http, $stateParams, $state, Users, Experiences) {
	document.title = "BorrowBear - Profile";

	$scope.StateEnum = {
		PROFILE: 0,
		EXPERIENCES: 1, 
		SALES: 2,
		PURCHASES: 3,
		PAYMENTS: 4
	}

	$scope.selectedIndex = $scope.StateEnum.PROFILE;

	$scope.accountInformation = null;
	$scope.customerInformation = null;
	$scope.userId = $stateParams.userId;

	$scope.tabClicked = function(state) {
		$scope.selectedIndex = state;
	}

	$scope.redirectToEditExperience = function(experienceId) {
		$state.go('list', {
			experienceId: experienceId,
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

	$scope.disableExperience = function(experience) {
		experience.active = false;
		Experiences.update({ id: experience.id }, experience, function(response) {
			$scope.fetchUser();
		});
	}

	$scope.enableExperience = function(experience) {
		experience.active = true;
		Experiences.update({ id: experience.id }, experience, function(response) {
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
