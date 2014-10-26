'use strict';

//Subscribedcategories service used to communicate Subscribedcategories REST endpoints
angular.module('subscribedcategories').factory('Subscribedcategories', ['$resource',
	function($resource) {
		return $resource('subscribedcategories/:subscribedcategoryId', { subscribedcategoryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);