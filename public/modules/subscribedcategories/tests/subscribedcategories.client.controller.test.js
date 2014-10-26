'use strict';

(function() {
	// Subscribedcategories Controller Spec
	describe('Subscribedcategories Controller Tests', function() {
		// Initialize global variables
		var SubscribedcategoriesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Subscribedcategories controller.
			SubscribedcategoriesController = $controller('SubscribedcategoriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Subscribedcategory object fetched from XHR', inject(function(Subscribedcategories) {
			// Create sample Subscribedcategory using the Subscribedcategories service
			var sampleSubscribedcategory = new Subscribedcategories({
				name: 'New Subscribedcategory'
			});

			// Create a sample Subscribedcategories array that includes the new Subscribedcategory
			var sampleSubscribedcategories = [sampleSubscribedcategory];

			// Set GET response
			$httpBackend.expectGET('subscribedcategories').respond(sampleSubscribedcategories);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.subscribedcategories).toEqualData(sampleSubscribedcategories);
		}));

		it('$scope.findOne() should create an array with one Subscribedcategory object fetched from XHR using a subscribedcategoryId URL parameter', inject(function(Subscribedcategories) {
			// Define a sample Subscribedcategory object
			var sampleSubscribedcategory = new Subscribedcategories({
				name: 'New Subscribedcategory'
			});

			// Set the URL parameter
			$stateParams.subscribedcategoryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/subscribedcategories\/([0-9a-fA-F]{24})$/).respond(sampleSubscribedcategory);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.subscribedcategory).toEqualData(sampleSubscribedcategory);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Subscribedcategories) {
			// Create a sample Subscribedcategory object
			var sampleSubscribedcategoryPostData = new Subscribedcategories({
				name: 'New Subscribedcategory'
			});

			// Create a sample Subscribedcategory response
			var sampleSubscribedcategoryResponse = new Subscribedcategories({
				_id: '525cf20451979dea2c000001',
				name: 'New Subscribedcategory'
			});

			// Fixture mock form input values
			scope.name = 'New Subscribedcategory';

			// Set POST response
			$httpBackend.expectPOST('subscribedcategories', sampleSubscribedcategoryPostData).respond(sampleSubscribedcategoryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Subscribedcategory was created
			expect($location.path()).toBe('/subscribedcategories/' + sampleSubscribedcategoryResponse._id);
		}));

		it('$scope.update() should update a valid Subscribedcategory', inject(function(Subscribedcategories) {
			// Define a sample Subscribedcategory put data
			var sampleSubscribedcategoryPutData = new Subscribedcategories({
				_id: '525cf20451979dea2c000001',
				name: 'New Subscribedcategory'
			});

			// Mock Subscribedcategory in scope
			scope.subscribedcategory = sampleSubscribedcategoryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/subscribedcategories\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/subscribedcategories/' + sampleSubscribedcategoryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid subscribedcategoryId and remove the Subscribedcategory from the scope', inject(function(Subscribedcategories) {
			// Create new Subscribedcategory object
			var sampleSubscribedcategory = new Subscribedcategories({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Subscribedcategories array and include the Subscribedcategory
			scope.subscribedcategories = [sampleSubscribedcategory];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/subscribedcategories\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSubscribedcategory);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.subscribedcategories.length).toBe(0);
		}));
	});
}());