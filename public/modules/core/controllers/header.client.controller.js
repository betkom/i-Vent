'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', 'Subscribe',
	function($scope, Authentication, Menus, Subscribe) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		$scope.subscribe = function(cat){
			Subscribe.query(function(res){
				console.log(res);
				for(var i=0; i < res.length; i++){
					if(res[i].categoryName === cat){
						res[i].users.push($scope.authentication.user);
						i.$update(function(res){console.log("worked")});
					}
				}
			});
		}
	}
]);