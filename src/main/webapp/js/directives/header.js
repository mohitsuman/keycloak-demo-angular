'use strict';


angular.module('keycloak-angular').directive('header', function() {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'views/header.html',
		controller: 'MainController'
	}
});