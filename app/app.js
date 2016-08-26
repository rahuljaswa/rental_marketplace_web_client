'use strict';

angular.module('app', ['app.errors', 'app.navigation', 'app.convenience', 'app.filters', 'app.keys', 'app.resources', 'app.staticContent', 'app.countries', 'app.directives', 'app.addPaymentMethod', 'app.footer', 'app.list', 'app.home', 'app.search', 'app.login', 'app.product', 'app.profile', 'app.register', 'app.tag', 'app.tags', 'app.rental', 'app.rentConfirmation', 'app.requestPasswordReset', 'app.resetPassword', 'app.verifyIdentity', 'app.acceptPayments', 'ngCookies', 'ng-token-auth', 'ngMaterial', 'ui.bootstrap', 'ui.router', 'ngFileUpload', 'internationalPhoneNumber'])

.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$authProvider', '$resourceProvider', '$httpProvider', function($locationProvider, $stateProvider, $urlRouterProvider, $authProvider, $resourceProvider, $httpProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');

	$authProvider.configure({
		apiUrl: 'https://rental-marketplace-api.herokuapp.com/api/v1'
	});

	$resourceProvider.defaults.actions = {
		get: { method: 'GET' },
		create: { method: 'POST' },
		update: { method: 'PUT' },
		query: { method: 'GET', isArray: true },
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
	.state('list', {
		url:'/list/:productId?redirectPath&{redirectParams:json}',
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
	.state('search', {
		url:'/search?query&latitude&longitude&locality&radius',
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
	.state('product', {
		url:'/product/:productId',
		views: {
			'header': {
				templateUrl: '/views/navigation/navigation.html',
				controller: 'NavigationController'
			},
			'content': {
				templateUrl: 'views/product/product.html',
				controller: 'ProductController'
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
	.state('tags', {
		url:'/tags',
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
	.state('tag', {
		url:'/tag/:tagId',
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
	.state('rental', {
		url:'/rental/:rentalId',
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
				templateUrl: 'views/rental/rental.html',
				controller: 'RentalController'
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
	.state('rentConfirmation', {
		url:'/rent_confirmation?productId&startDate&endDate&rentalCost&numberOfDays&securityDeposit',
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
				templateUrl: 'views/rent_confirmation/rent_confirmation.html',
				controller: 'RentConfirmationController'
			},
			'footer': {
				templateUrl: '/views/footer/footer.html',
				controller: 'FooterController'
			}
		},
		resolve: {
			authenticate: authenticateAndVerify
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
