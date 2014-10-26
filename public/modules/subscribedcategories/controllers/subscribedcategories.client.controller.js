'use strict';

// Subscribedcategories controller
angular.module('subscribedcategories').controller('SubscribedcategoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Subscribedcategories',
	function($scope, $stateParams, $location, Authentication, Subscribedcategories ) {
		$scope.authentication = Authentication;

		// Create new Subscribedcategory
		$scope.create = function() {
			// Create new Subscribedcategory object
			var subscribedcategory = new Subscribedcategories ({
				name: this.name
			});

			// Redirect after save
			subscribedcategory.$save(function(response) {
				$location.path('subscribedcategories/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Subscribedcategory
		$scope.remove = function( subscribedcategory ) {
			if ( subscribedcategory ) { subscribedcategory.$remove();

				for (var i in $scope.subscribedcategories ) {
					if ($scope.subscribedcategories [i] === subscribedcategory ) {
						$scope.subscribedcategories.splice(i, 1);
					}
				}
			} else {
				$scope.subscribedcategory.$remove(function() {
					$location.path('subscribedcategories');
				});
			}
		};

		// Update existing Subscribedcategory
		$scope.update = function() {
			var subscribedcategory = $scope.subscribedcategory ;

			subscribedcategory.$update(function() {
				$location.path('subscribedcategories/' + subscribedcategory._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Subscribedcategories
		$scope.find = function() {
			$scope.subscribedcategories = Subscribedcategories.query();
		};

		// Find existing Subscribedcategory
		$scope.findOne = function() {
			$scope.subscribedcategory = Subscribedcategories.get({ 
				subscribedcategoryId: $stateParams.subscribedcategoryId
			});
		};
	}
]);