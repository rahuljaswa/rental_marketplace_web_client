angular.module('app.acceptPayments', [])

.controller('AcceptPaymentsController', ['$scope', '$rootScope', '$http', '$auth', '$state', '$stateParams', 'Users', 'SupportedCountries', 'Upload', 'StripeKey', function($scope, $rootScope, $http, $auth, $state, $stateParams, Users, SupportedCountries, Upload, StripeKey) {
	document.title = "BorrowBear - Setup Payments";

	$scope.formDisabled = false;

	$scope.StateEnum = {
		LEGAL_ENTITY_PERSONAL: 0, 
		LEGAL_ENTITY_ADDRESS: 1,
		EXTERNAL_ACCOUNT: 2,
		VERIFICATION_DOCUMENT: 3,
		properties: {
			0: {
				breadcrumbTitle: "Info",
				title: "Info", 
				description: "We need your personal information to verify your bank account information. This ensures you get paid on time. All sensitive information is handled securely and does not touch our servers.",
				button_text: "Next"
			},
			1: {
				breadcrumbTitle: "Address",
				title: "Address", 
				description: "We need your personal information to verify your bank account information. This ensures you get paid on time. All sensitive information is handled securely and does not touch our servers.",
				button_text: "Next"
			},
			2: {
				breadcrumbTitle: "Bank",
				title: "Bank Account", 
				description: "We never store any of your sensitive banking information.",
				button_text: "Next"
			},
			3: {
				breadcrumbTitle: "ID",
				title: "Identifying document", 
				description: "Please provide of photo of a government issued ID (driver's license or passport in most countries). This is used to protect your identity and bank account information.",
				button_text: "Done"
			}
		}
	}

	$scope.currentState = 0;
	$scope.countries = SupportedCountries;

	$scope.nonForm = {
		formatted_dob: null,
		verification_document: null,
		external_account: {
			country: null,
			currency: null,
			account_holder_name: null,
			account_holder_type: 'individual',
			routing_number: null,
			account_number: null
		}
	}

	$scope.form = {
		legal_entity: {
			first_name: null,
			last_name: null,
			personal_id_number: null,
			type: 'individual',
			dob: {
				day: null,
				month: null,
				year: null
			},
			address: {
				line1: null,
				line2: null,
				city: null,
				state: null,
				country: $scope.countries['US'].iso_code,
				postal_code: null
			},
			verification: {
				document: null
			}
		}, 
		tos_acceptance: {
			date: Math.floor(Date.now() / 1000),
			ip: null
		}
	}	

	$scope.$watch('nonForm.formatted_dob', function(value) {
		if (value) {
			$scope.form.legal_entity.dob.day = value.getDate();
			$scope.form.legal_entity.dob.month = value.getMonth() + 1;
			$scope.form.legal_entity.dob.year = value.getFullYear();
		} else {
			$scope.form.legal_entity.dob.day = null;
			$scope.form.legal_entity.dob.month = null;
			$scope.form.legal_entity.dob.year = null;
		}
	});

	$scope.$watch('form.legal_entity.first_name', function(value) {
		$scope.nonForm.external_account.account_holder_name = $scope.form.legal_entity.first_name + ' ' + $scope.form.legal_entity.last_name;
	});

	$scope.$watch('form.legal_entity.last_name', function(value) {
		$scope.nonForm.external_account.account_holder_name = $scope.form.legal_entity.first_name + ' ' + $scope.form.legal_entity.last_name;
	});

	$scope.$watch('form.legal_entity.address.country', function(value) {
		if (value) {
			$scope.nonForm.external_account.country = value;
			$scope.nonForm.external_account.currency = SupportedCountries[$scope.nonForm.external_account.country].bank_accounts_individual_currencies[0].iso_code;
		} else {
			$scope.nonForm.external_account.country = null;
			$scope.form.legal_entity.address.country = null;
			$scope.nonForm.external_account.currency = null;
		}
	});

	$scope.setCurrentState = function(state) {
		$scope.currentState = state;
	}

	$scope.stateCompleted = function(state) {
		switch(state) {
			case $scope.StateEnum.LEGAL_ENTITY_PERSONAL: {
				return ($scope.form.legal_entity.first_name &&
					$scope.form.legal_entity.last_name &&
					$scope.form.legal_entity.personal_id_number &&
					$scope.form.legal_entity.dob.day &&
					$scope.form.legal_entity.dob.month &&
					$scope.form.legal_entity.dob.year);
				break;
			}

			case $scope.StateEnum.LEGAL_ENTITY_ADDRESS: {
				return ($scope.form.legal_entity.address.line1 &&
					$scope.form.legal_entity.address.city &&
					$scope.form.legal_entity.address.state &&
					$scope.form.legal_entity.address.country &&
					$scope.form.legal_entity.address.postal_code);
				break;
			}

			case $scope.StateEnum.EXTERNAL_ACCOUNT: {
				return ($scope.nonForm.external_account.country &&
					$scope.nonForm.external_account.currency &&
					$scope.nonForm.external_account.account_holder_name &&
					$scope.nonForm.external_account.account_holder_type &&
					$scope.nonForm.external_account.routing_number &&
					$scope.nonForm.external_account.account_number);
				break;
			}

			case $scope.StateEnum.VERIFICATION_DOCUMENT: {
				return $scope.nonForm.verification_document;
				break;
			}
		}
		return
	}

	$scope.buttonPressed = function() {
		switch($scope.currentState) {
			case $scope.StateEnum.SETUP: {
				$scope.currentState++;
				break;
			}

			case $scope.StateEnum.LEGAL_ENTITY_PERSONAL: {
				$scope.currentState++;
				break;
			}

			case $scope.StateEnum.LEGAL_ENTITY_ADDRESS: {
				$scope.currentState++;
				break;
			}

			case $scope.StateEnum.EXTERNAL_ACCOUNT: {
				$scope.currentState++;
				break;
			}

			case $scope.StateEnum.VERIFICATION_DOCUMENT: {
				$scope.formDisabled = true;

				var formData = new FormData();
				formData.append('file', $scope.nonForm.verification_document);
				formData.append('purpose', 'identity_document');
				$http.post("https://uploads.stripe.com/v1/files", formData, {
					transformRequest: angular.identity,
					headers: {
						'Content-Type': undefined,
						'Authorization': ('Bearer ' + StripeKey)
					}
				})
				.success(function(response) {
					$scope.form.legal_entity.verification.document = response.id;
					Stripe.bankAccount.createToken($scope.nonForm.external_account, function(status, response) {
						if (status == 200) {
							var external_account_token = response.id;
							Stripe.piiData.createToken({
								personal_id_number: $scope.form.legal_entity.personal_id_number,
							}, function(status, response) {
								if (status == 200) {
									var personal_id_number_token = response.id;
									var params = $.extend({}, $scope.form);
									params.external_account_token = external_account_token;
									params.legal_entity.personal_id_number = personal_id_number_token;
									Users.update({ 
										id: $rootScope.user.id, 
										action: 'verify_payment_account'
									}, params, function(response) {
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
						} else {
							$scope.formDisabled = false;
						}
					});
				})
				.error(function(response) {
					$scope.formDisabled = false;
				});
				break;
			}
		}
		return
	}

	function fetchIpAddress() {
		$http.jsonp("https://api.ipify.org?format=jsonp&callback=JSON_CALLBACK")
		.success(function(response) {
			$scope.form.tos_acceptance.ip = response.ip;
		});
	}

	fetchIpAddress();
}]);
