angular.module('app.resources', ['ngResource'])

.factory('BaseUrl', function() {
	// return 'http://localhost:3000';
	return 'https://rental-marketplace-api.herokuapp.com';
})

.factory('ClientUrl', function(BaseUrl) {
	return (BaseUrl + '/api/v1');
})

.factory('Products', function($resource, ClientUrl) {
	return $resource(ClientUrl + '/products/:id/:action');
})

.factory('Rentals', function($resource, ClientUrl) {
	return $resource(ClientUrl + '/rentals/:id');
})

.factory('Tags', function($resource, ClientUrl) {
	return $resource(ClientUrl + '/tags/:id');
})

.factory('Messages', function($resource, ClientUrl) {
	return $resource(ClientUrl + '/messages/:id');
})

.factory('Users', function($resource, ClientUrl) {
	return $resource(ClientUrl + '/users/:id/:action');
})

.factory('Notifications', function($resource, ClientUrl) {
	return $resource(ClientUrl + '/notifications/:id');
})

.factory('Countries', function($resource, ClientUrl) {
	return $resource(ClientUrl + '/countries/:id');
})

.factory('Cities', function($resource, ClientUrl) {
	return $resource(ClientUrl + '/cities/:id');
});
