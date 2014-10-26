'use strict';

//Programs service used to communicate Programs REST endpoints
angular.module('programs').factory('Programs', ['$resource',
	function($resource) {
		return $resource('programs/:programId', { programId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('programs').factory('ProgramsComment', ['$resource',
    function($resource) {
        return $resource('programs/:programId/comments/:commentId', {
            programId: '@program',
            commentId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }

        });
    }
]);
angular.module('programs').factory('ProgramsLike', ['$resource',
    function($resource) {
        return $resource('programs/:programId/likes/:likeId', {
            programId: '@program',
            likeId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }

        });
    }
]);
angular.module('programs').factory('RSVP', ['$resource',
    function($resource) {
        return $resource('/programs/:programId/registerRSVP', {
            programId: '@program',
        }, {
            schedule: {
                method: 'GET'
            }

        });
    }
]);




angular.module('core').factory('Search', ['$http','$location', function($http,$location) {   
    var SearchObject = {};


    SearchObject.searchResults = [];

    SearchObject.searchEvents = function(obj) {
        SearchObject.searchResults = [];
    	$http.get('programs/search', {
    		params: obj
    	}).success(function(response) {
    		SearchObject.searchResults = response;
            $location.path('programs/search');
    	});
    };

    SearchObject.getSearchResults = function() {
    	return SearchObject.searchResults;
    };

    return SearchObject;
}]);