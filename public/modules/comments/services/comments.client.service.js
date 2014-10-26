'use strict';

//Comments service used to communicate Comments REST endpoints
angular.module('comments').factory('Comments', ['$resource',
	function($resource) {
		return $resource('comments/:commentId', { commentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('core').factory('Subscribe', ['$resource',
	function($resource) {
		return $resource('/subscribedcategories', {
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

