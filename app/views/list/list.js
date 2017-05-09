angular.module('app.list', ['uuid'])

.controller('ListController', ['$scope', '$http', '$q', 'Upload', 'rfc4122', '$stateParams', '$state', 'Experiences', 'Tags', 'ClientUrl', function($scope, $http, $q, Upload, rfc4122, $stateParams, $state, Experiences, Tags, ClientUrl) {
	document.title = "BorrowBear - Rent Your Stuff";

	$scope.formDisabled = false;

	$scope.thumbnailUploadsInProgress = {};
	$scope.contentUploadsInProgress = {};
	$scope.experience = { 
		id: $stateParams.experienceId,
		pickup_location: {},
		file_urls: [],
		tags: []
	}

	$scope.experienceTypes = ["Digital Guide", "Equipment", "In Person"];

	$scope.tracking = {
		tags: null,
		selectedExperienceIndex: ((0).toString()),
		selectedExperienceType: $scope.experienceTypes[0]
	}

	$scope.editingMode = $scope.experience.id;

	if ($scope.editingMode) {
		$scope.experience = Experiences.get($scope.experience, function(response) {
			var formatted_pickup_location = "";
			if ($scope.experience.pickup_location.establishment_name) {
				formatted_pickup_location += $scope.experience.pickup_location.establishment_name;
			}
			if ($scope.experience.pickup_location.formatted_address) {
				formatted_pickup_location += ", ";
				formatted_pickup_location += $scope.experience.pickup_location.formatted_address;
			}
			$scope.experience.formatted_pickup_location = formatted_pickup_location;

			var trackingTags = "";
			for (i = 0; i < $scope.experience.tags.length; i++) {
				var tag = $scope.experience.tags[i].name;
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
			$scope.experience.tags = tags;
		} else {
			$scope.experience.tags = []
		}
	});

	$scope.$watch('tracking.selectedExperienceIndex', function(value) {
		$scope.tracking.selectedExperienceType = $scope.experienceTypes[value];
	});

	$scope.fetchImageUploadUrl = function() {
		var request = ClientUrl + "/images/presigned_url";
		$http.get(request)
		.success(function(response) {
			$scope.fileUploadUrl = response;
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
			Experiences.update({ id: $scope.experience.id }, $scope.experience, function(response) {
				if ($stateParams.redirectPath) {
					$state.go($stateParams.redirectPath, $stateParams.redirectParams);
				} else {
					$state.go('experience', { experienceId: $scope.experience.id });
				}
			});
		} else {
			var newExperience = Experiences.create($scope.experience, function(response) {
				if ($stateParams.redirectPath) {
					$state.go($stateParams.redirectPath, $stateParams.redirectParams);
				} else {
					$state.go('experience', { experienceId: newExperience.id });
				}
			});
		}
	}

	$scope.validates = function() {
		return ($scope.experience.title && 
			$scope.experience.description && 
			$scope.experience.pickup_location.google_place_id && 
			($scope.experience.price != null) && 
			($scope.experience.security_deposit != null) && 
			($scope.experience.tags.length > 0) &&
			($scope.experience.file_urls.length > 0) &&
			(Object.keys($scope.thumbnailUploadsInProgress).length === 0) &&
			(Object.keys($scope.contentUploadsInProgress).length === 0));
	}

	$scope.removeImageUrlAtIndex = function(index) {
		$scope.experience.file_urls.splice(index, 1);
	}

	$scope.prepareFiles = function(files, type) {
		for (var i = 0; i < files.length; i++) {
			prepareFileForUploadIfNecessary(files[i], 'processing', type);
		}
	}

	$scope.uploadFiles = function(files, type) {
		if (files && files.length) {
			for (var i = 0; i < files.length; i++) {
				$scope.uploadFile(files[i], type);
			}
		}
	}

	$scope.uploadFile = function(file, type) {
		var uploads = uploadsInProgressForType(type);
		var fileUploadInProgress = uploads[file.name];

		if (file && (!fileUploadInProgress || (fileUploadInProgress.status != 'uploading'))) {
			if (fileUploadInProgress) {
				uploads[file.name].status = 'uploading';
			} else {
				prepareFileForUploadIfNecessary(file, 'uploading', type);
			}

			var fileFilename = uploads[file.name].fileFilename;

			Upload.upload({
				url: $scope.fileUploadUrl.url,
				method: 'POST',
				data: {
					key: fileFilename,
					AWSAccessKeyId: $scope.fileUploadUrl.access_key,
					acl: 'private',
					policy: $scope.fileUploadUrl.policy,
					signature: $scope.fileUploadUrl.signature,
					"Content-Type": file.type != '' ? file.type : 'application/octet-stream',
					filename: fileFilename,
					file: file
				}
			}).then(function (response) {
				var fileUrl = uploads[file.name].fileUrl;
				$scope.experience.file_urls.push(fileUrl)
				console.log($scope);
				delete uploads[file.name];
			}, function (response) {
				delete uploads[file.name];
			}, function (evt) {
				uploads[file.name].progress = parseInt(100.0 * evt.loaded / evt.total);
			});
		}
	}

	function uploadsInProgressForType(type) {
		return ((type === 'thumbnail') ? $scope.thumbnailUploadsInProgress : $scope.contentUploadsInProgress);
	}

	function prepareFileForUploadIfNecessary(file, status, type) {
		var uploads = uploadsInProgressForType(type);
		if (!uploads[file.name]) {
			var fileFilename = rfc4122.v4();
			uploads[file.name] = {
				status: status,
				fileFilename: fileFilename,
				fileUrl: ($scope.fileUploadUrl.file_url_prefix + fileFilename),
				progress: 10,
				file: file
			};
		}
	}

	$scope.fetchImageUploadUrl();
}])

.directive('googlePlacesEstablishments', function() {
	return function($scope, element) {
		var options = {
			componentRestrictions: { country: 'us' }
		}
		var autocomplete = new google.maps.places.Autocomplete(element[0], options);
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

			$scope.experience.pickup_location.latitude = latitude;
			$scope.experience.pickup_location.longitude = longitude;
			$scope.experience.pickup_location.formatted_address = place.formatted_address;
			$scope.experience.pickup_location.google_place_id = place.place_id;			
			$scope.experience.pickup_location.google_maps_url = place.url;
			$scope.experience.pickup_location.street_number = streetNumber;
			$scope.experience.pickup_location.country = country;
			$scope.experience.pickup_location.state = state;
			$scope.experience.pickup_location.postal_code = postalCode;
			$scope.experience.pickup_location.street_name = streetName;
			$scope.experience.pickup_location.city = city;

			if ($scope.experience.pickup_location.formatted_address.includes(place.name)) {
				$scope.experience.pickup_location.establishment_name = null;
			} else {
				$scope.experience.pickup_location.establishment_name = place.name;
			}
		});
	};
});
