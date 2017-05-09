'use strict';

angular.module('app', [
	'app.about',
	'app.acceptPayments', 
	'app.addPaymentMethod', 
	'app.best_practices',
	'app.cancellation_policy',
	'app.careers',
	'app.convenience',
	'app.directives',
	'app.errors', 
	'app.experience', 
	'app.filters', 
	'app.footer', 
	'app.help',
	'app.home', 
	'app.keys', 
	'app.list', 
	'app.login', 
	'app.navigation', 
	'app.lender_policy',
	'app.localization',
	'app.pagination',
	'app.profile', 
	'app.purchase', 
	'app.purchaseConfirmation', 
	'app.purchaser_policy',
	'app.register', 
	'app.requestPasswordReset', 
	'app.resetPassword', 
	'app.resources', 
	'app.safety',
	'app.search', 
	'app.staticContent', 
	'app.tag', 
	'app.tags', 
	'app.terms_and_privacy',
	'app.verifyIdentity', 
	'app.why_purchase',
	'app.why_lend',
	'internationalPhoneNumber',
	'ngCookies', 
	'ngFileUpload', 
	'ngMaterial',
	'ngSanitize',
	'ng-token-auth', 
	'ui.bootstrap', 
	'ui.router'
	])

.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$authProvider', '$resourceProvider', '$httpProvider', function($locationProvider, $stateProvider, $urlRouterProvider, $authProvider, $resourceProvider, $httpProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');

	$authProvider.configure({
		apiUrl: 'http://localhost:3000/api/v1'
		// apiUrl: 'https://rental-marketplace-api.herokuapp.com/api/v1'
	});

	$resourceProvider.defaults.actions = {
		get: { method: 'GET' },
		create: { method: 'POST' },
		update: { method: 'PUT' },
		query: { method: 'GET', isArray: false },
		delete: { method: 'DELETE' }
	};

	$httpProvider.interceptors.push(function($q, $rootScope) {
		return {
			'request': function(config) {
				return config;
			},
			'response': function(response) {
				$rootScope.errors = null;
				return response;
			},
			'responseError': function(rejection) {
				var errors = rejection.data.errors;
				if (errors.constructor === Array) {
					$rootScope.errors = errors;
				} else if (errors.constructor === Object) {
					$rootScope.errors = errors.full_messages;
				}
				return $q.reject(rejection);
			}
		};
	});

	function inauthenticate($auth, $q, $rootScope) {
		var deferred = $q.defer();
		$auth.validateUser()
		.then(function() {
			return deferred.reject({});
		})
		.catch(function(reason) {
			return deferred.resolve({});
		});
		return deferred.promise;
	}

	function authenticateOnly($auth, $q, $rootScope) {
		var deferred = $q.defer();
		$auth.validateUser()
		.then(function() {
			return deferred.resolve({});
		})
		.catch(function(reason) {
			return deferred.reject({ redirectState: 'login' });
		});
		return deferred.promise;
	}

	function authenticateAndVerify($auth, $q, $rootScope, Users) {
		var deferred = $q.defer();
		$auth.validateUser()
		.then(function() {
			var user = Users.get({ id: $rootScope.user.id }, function(response) {
				if (user && user.email_verified_at && user.phone_number_verified_at) {
					return deferred.resolve({});
				} else {
					return deferred.reject({ redirectState: 'verifyIdentity' });
				}
			});
		})
		.catch(function(reason) {
			return deferred.reject({ redirectState: 'login' });
		});
		return deferred.promise;
	}

	$stateProvider
	.state('about', {
		url:'/about',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/_static/about/about.html',
				controller: 'AboutController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('acceptPayments', {
		url:'/account/accept_payments?redirectPath&{redirectParams:json}',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'errors': {
				templateUrl: '/views/errors/errors.html',
				controller: 'ErrorsController'
			},
			'content': {
				templateUrl: 'views/_account/accept_payments/accept_payments.html',
				controller: 'AcceptPaymentsController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		},
		resolve: {
			authenticate: authenticateOnly
		}
	})
	.state('addPaymentMethod', {
		url:'/account/add_payment_method?redirectPath&{redirectParams:json}',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'errors': {
				templateUrl: '/views/errors/errors.html',
				controller: 'ErrorsController'
			},
			'content': {
				templateUrl: 'views/_account/add_payment_method/add_payment_method.html',
				controller: 'AddPaymentMethodController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		},
		resolve: {
			authenticate: authenticateOnly
		}
	})
	.state('best_practices', {
		url:'/best_practices',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/_static/best_practices/best_practices.html',
				controller: 'BestPracticesController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('cancellation_policy', {
		url:'/cancellation_policy',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/_static/_policies/cancellation_policy/cancellation_policy.html',
				controller: 'CancellationPolicyController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('careers', {
		url:'/careers',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/_static/careers/careers.html',
				controller: 'CareersController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('help', {
		url:'/help',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/_static/help/help.html',
				controller: 'HelpController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('home', {
		url:'/',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/home/home.html',
				controller: 'HomeController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('lender_policy', {
		url:'/lender_policy',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/_static/_policies/lender_policy/lender_policy.html',
				controller: 'LenderPolicyController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('list', {
		url:'/list/:experienceId?redirectPath&{redirectParams:json}',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'errors': {
				templateUrl: '/views/errors/errors.html',
				controller: 'ErrorsController'
			},
			'content': {
				templateUrl: 'views/list/list.html',
				controller: 'ListController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		},
		resolve: {
			authenticate: authenticateAndVerify
		}
	})
	.state('login', {
		url: '/account/login?redirectPath&{redirectParams:json}',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'errors': {
				templateUrl: '/views/errors/errors.html',
				controller: 'ErrorsController'
			},
			'content': {
				templateUrl: 'views/_account/login/login.html',
				controller: 'LoginController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		},
		resolve: {
			authenticate: inauthenticate 
		}
	})
	.state('experience', {
		url:'/experience/:experienceId',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/experience/experience.html',
				controller: 'ExperienceController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('profile', {
		url:'/profile/:userId',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/profile/profile.html',
				controller: 'ProfileController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('register', {
		url: '/account/register?redirectPath&{redirectParams:json}',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'errors': {
				templateUrl: '/views/errors/errors.html',
				controller: 'ErrorsController'
			},
			'content': {
				templateUrl: 'views/_account/register/register.html',
				controller: 'RegisterController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		},
		resolve: {
			authenticate: inauthenticate 
		}
	})
	.state('purchase', {
		url:'/purchase/:purchaseId',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'errors': {
				templateUrl: '/views/errors/errors.html',
				controller: 'ErrorsController'
			},
			'content': {
				templateUrl: 'views/purchase/purchase.html',
				controller: 'PurchaseController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		},
		resolve: {
			authenticate: authenticateAndVerify
		}
	})
	.state('purchaseConfirmation', {
		url:'/purchase_confirmation?experience_id&equipment_rental_starts_at&equipment_rental_ends_at&total_cost&equipment_rental_number_of_days&equipment_rental_security_deposit&shipping&equipment_rental_shipping_cost&equipment_rental_delivery_cost&equipment_rental_cost&experience_guide_cost&experience_leader_cost&deliver&ship&pickup&leader&guide',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'errors': {
				templateUrl: '/views/errors/errors.html',
				controller: 'ErrorsController'
			},
			'content': {
				templateUrl: 'views/purchase_confirmation/purchase_confirmation.html',
				controller: 'PurchaseConfirmationController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		},
		resolve: {
			authenticate: authenticateAndVerify
		}
	})
	.state('purchaser_policy', {
		url:'/purchaser_policy',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/_static/_policies/purchaser_policy/purchaser_policy.html',
				controller: 'PurchaserPolicyController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('requestPasswordReset', {
		url: '/account/request_password_reset?redirectPath&{redirectParams:json}',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'errors': {
				templateUrl: '/views/errors/errors.html',
				controller: 'ErrorsController'
			},
			'content': {
				templateUrl: 'views/_account/request_password_reset/request_password_reset.html',
				controller: 'RequestPasswordResetController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('resetPassword', {
		url: '/account/reset_password',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'errors': {
				templateUrl: '/views/errors/errors.html',
				controller: 'ErrorsController'
			},
			'content': {
				templateUrl: 'views/_account/reset_password/reset_password.html',
				controller: 'ResetPasswordController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		},
		resolve: {
			authenticate: authenticateOnly
		}
	})
	.state('safety', {
		url:'/safety',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/_static/safety/safety.html',
				controller: 'SafetyController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('search', {
		url:'/search?query&latitude&longitude&locality&radius&page&active&featured',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/search/search.html',
				controller: 'SearchController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('tag', {
		url:'/tag/:tagId?page',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/tag/tag.html',
				controller: 'TagController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('tags', {
		url:'/tags?query&page',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/tags/tags.html',
				controller: 'TagsController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('terms_and_privacy', {
		url:'/terms_and_privacy',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/_static/terms_and_privacy/terms_and_privacy.html',
				controller: 'TermsAndPrivacyController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('verifyIdentity', {
		url: '/account/verify_identity?redirectPath&{redirectParams:json}',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'errors': {
				templateUrl: '/views/errors/errors.html',
				controller: 'ErrorsController'
			},
			'content': {
				templateUrl: 'views/_account/verify_identity/verify_identity.html',
				controller: 'VerifyIdentityController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		},
		resolve: {
			authenticate: authenticateOnly
		}
	})
	.state('why_lend', {
		url:'/why_lend',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/_static/why_lend/why_lend.html',
				controller: 'WhyLendController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	})
	.state('why_purchase', {
		url:'/why_purchase',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/_static/why_purchase/why_purchase.html',
				controller: 'WhyRentController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		}
	});
}])

.run(function($rootScope, $auth, $location, $window, $state, StripeKey) {
	$rootScope.shouldDoubleLengthWithOffsetIndex = function(offset, index) {
		if ((((index - offset) % 10) == 0) || (((index + offset) - 6) % 10 == 0)) {
			return true;
		} else {
			return false;
		}
	}

	$rootScope.logoutUser = function() {
		$auth.signOut()
		.then(function(response) {
			$state.go('home');
		},
		function(response) {
			console.log(response);
		});
	}

	$rootScope.$on('auth:password-reset-confirm-success', function() {
		$state.go('resetPassword');
	});

	$rootScope.$on('$stateChangeError', function(evt, to, toParams, from, fromParams, error) {
		if (error.redirectState) {
			evt.preventDefault();
			var redirectParamsHash = {
				redirectPath: to.name,
				redirectParams: $.extend({}, toParams)
			}
			$state.go(error.redirectState, redirectParamsHash, {location: 'replace'});
		}
	});
	
	Stripe.setPublishableKey(StripeKey);
});
