angular.module('app.list', ['uuid'])

.controller('ListController', ['$scope', '$http', '$q', 'Upload', 'rfc4122', '$stateParams', '$state', 'Products', 'Tags', 'ClientUrl', function($scope, $http, $q, Upload, rfc4122, $stateParams, $state, Products, Tags, ClientUrl) {
	document.title = "BorrowBear - Rent Your Stuff";

	$scope.formDisabled = false;

	$scope.uploadsInProgress = {};
	$scope.product = { 
		id: $stateParams.productId,
		pickup_location: {},
		image_urls: [],
		tags: []
	}

	$scope.tracking = {
		tags: null
	}

	$scope.editingMode = $scope.product.id;

	if ($scope.editingMode) {
		$scope.product = Products.get($scope.product, function(response) {
			var formatted_pickup_location = "";
			if ($scope.product.pickup_location.establishment_name) {
				formatted_pickup_location += $scope.product.pickup_location.establishment_name;
			}
			if ($scope.product.pickup_location.formatted_address) {
				formatted_pickup_location += ", ";
				formatted_pickup_location += $scope.product.pickup_location.formatted_address;
			}
			$scope.product.formatted_pickup_location = formatted_pickup_location;

			var trackingTags = "";
			for (i = 0; i < $scope.product.tags.length; i++) {
				var tag = $scope.product.tags[i].name;
				if (i != 0) {
					trackingTags += ", ";
				}
				trackingTags += tag;
			}
			$scope.tracking.tags = trackingTags;
		});
	}

	$scope.$watch('tracking.tags', function(value) {
		if (value) {
			var tags = [];
			var tagsNames = value.split(/\s*,\s*/);
			for (var i = 0; i < tagsNames.length; i++) {
				tags.push({ "name": tagsNames[i] });
			}
			$scope.product.tags = tags;
		} else {
			$scope.product.tags = []
		}
	});

	$scope.fetchImageUploadUrl = function() {
		var request = ClientUrl + "/images/presigned_url";
		$http.get(request)
		.success(function(response) {
			$scope.imageUploadUrl = response;
		});
	}

	$scope.fetchTagsForAutocomplete = function(query) {
		deferred = $q.defer();
		var tags = Tags.query({ query: query }, function(response) {
			deferred.resolve([{ "name" : query, "id" : Math.floor(Math.random() * 10000).toString() }].concat(tags));
		});
		return deferred.promise;
	}

	$scope.submitButtonPressed = function() {
		if ($scope.editingMode) {
			Products.update({ id: $scope.product.id }, $scope.product, function(response) {
				if ($stateParams.redirectPath) {
					$state.go($stateParams.redirectPath, $stateParams.redirectParams);
				} else {
					$state.go('product', { productId: $scope.product.id });
				}
			});
		} else {
			var newProduct = Products.create($scope.product, function(response) {
				if ($stateParams.redirectPath) {
					$state.go($stateParams.redirectPath, $stateParams.redirectParams);
				} else {
					$state.go('product', { productId: newProduct.id });
				}
			});
		}
	}

	$scope.validates = function() {
		return ($scope.product.title && 
			$scope.product.description && 
			$scope.product.pickup_location.google_place_id && 
			($scope.product.price != null) && 
			($scope.product.security_deposit != null) && 
			($scope.product.tags.length > 0) &&
			($scope.product.image_urls.length > 0) &&
			(Object.keys($scope.uploadsInProgress).length === 0));
	}

	$scope.removeImageUrlAtIndex = function(index) {
		$scope.product.image_urls.splice(index, 1);
	}

	$scope.prepareThumbnails = function(files) {
		for (var i = 0; i < files.length; i++) {
			prepareFileForUploadIfNecessary(files[i], 'processing');
		}
	}

	$scope.uploadFiles = function(files) {
		if (files && files.length) {
			for (var i = 0; i < files.length; i++) {
				$scope.uploadFile(files[i]);
			}
		}
	}

	$scope.uploadFile = function(file) {
		var uploadInProgress = $scope.uploadsInProgress[file.name];
		if (file && (!uploadInProgress || (uploadInProgress.status != 'uploading'))) {
			if (uploadInProgress) {
				$scope.uploadsInProgress[file.name].status = 'uploading';
			} else {
				prepareFileForUploadIfNecessary(file, 'uploading');
			}

			var imageFilename = $scope.uploadsInProgress[file.name].imageFilename;

			Upload.upload({
				url: $scope.imageUploadUrl.url,
				method: 'POST',
				data: {
					key: imageFilename,
					AWSAccessKeyId: $scope.imageUploadUrl.access_key,
					acl: 'private',
					policy: $scope.imageUploadUrl.policy,
					signature: $scope.imageUploadUrl.signature,
					"Content-Type": file.type != '' ? file.type : 'application/octet-stream',
					filename: imageFilename,
					file: file
				}
			}).then(function (response) {
				var imageUrl = $scope.uploadsInProgress[file.name].imageUrl;
				$scope.product.image_urls.push(imageUrl)
				delete $scope.uploadsInProgress[file.name];
			}, function (response) {
				delete $scope.uploadsInProgress[file.name];
			}, function (evt) {
				$scope.uploadsInProgress[file.name].progress = parseInt(100.0 * evt.loaded / evt.total);
			});
		}
	}

	function prepareFileForUploadIfNecessary(file, status) {
		if (!$scope.uploadsInProgress[file.name]) {
			var imageFilename = rfc4122.v4();
			$scope.uploadsInProgress[file.name] = {
				status: status,
				imageFilename: imageFilename,
				imageUrl: ($scope.imageUploadUrl.image_url_prefix + imageFilename),
				progress: 10,
				file: file
			};
		}
	}

	$scope.fetchImageUploadUrl();
}])

.directive('googlePlacesEstablishments', function() {
	return function($scope, element) {
		var autocomplete = new google.maps.places.Autocomplete(element[0], { types: ['establishment'] });
		autocomplete.addListener('place_changed', function() {
			var place = autocomplete.getPlace();
			var latitude = place.geometry.location.lat();
			var longitude = place.geometry.location.lng();

			var streetNumber = null;
			var country = null;
			var state = null;
			var postalCode = null;
			var streetName = null;
			var city = null;

			var addressComponents = place.address_components;
			for (var i = 0; i < addressComponents.length; i++) {
				var component = addressComponents[i];
				var types = component.types;
				if (types.includes('street_number')) {
					streetNumber = component.long_name;
				} else if (types.includes('country')) {
					country = component.long_name;
				} else if (types.includes('administrative_area_level_1')) {
					state = component.long_name;
				} else if (types.includes('postal_code')) {
					postalCode = component.long_name;
				} else if (types.includes('route')) {
					streetName = component.long_name;
				} else if (types.includes('locality')) {
					city = component.long_name;
				}
			}

			$scope.product.pickup_location.latitude = latitude;
			$scope.product.pickup_location.longitude = longitude;
			$scope.product.pickup_location.formatted_address = place.formatted_address;
			$scope.product.pickup_location.google_place_id = place.place_id;
			$scope.product.pickup_location.establishment_name = place.name;
			$scope.product.pickup_location.google_maps_url = place.url;
			$scope.product.pickup_location.street_number = streetNumber;
			$scope.product.pickup_location.country = country;
			$scope.product.pickup_location.state = state;
			$scope.product.pickup_location.postal_code = postalCode;
			$scope.product.pickup_location.street_name = streetName;
			$scope.product.pickup_location.city = city;
		});
	};
});
