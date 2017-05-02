'use strict';

// Declare app level module which depends on views, and components
angular.module('contacts-app', [
  'ngRoute',
  'firebase',
  'contacts-app.contacts'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
