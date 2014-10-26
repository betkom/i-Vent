'use strict';

//Setting up route
angular.module('subscribedcategories').config(['$stateProvider',
	function($stateProvider) {
		// Subscribedcategories state routing
		$stateProvider.
		state('listSubscribedcategories', {
			url: '/subscribedcategories',
			templateUrl: 'modules/subscribedcategories/views/list-subscribedcategories.client.view.html'
		}).
		state('createSubscribedcategory', {
			url: '/subscribedcategories/create',
			templateUrl: 'modules/subscribedcategories/views/create-subscribedcategory.client.view.html'
		}).
		state('viewSubscribedcategory', {
			url: '/subscribedcategories/:subscribedcategoryId',
			templateUrl: 'modules/subscribedcategories/views/view-subscribedcategory.client.view.html'
		}).
		state('editSubscribedcategory', {
			url: '/subscribedcategories/:subscribedcategoryId/edit',
			templateUrl: 'modules/subscribedcategories/views/edit-subscribedcategory.client.view.html'
		});
	}
]);