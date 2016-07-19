'use strict';

var app = angular.module('keycloak-angular', [
	'ngRoute',
	'appControllers',
	'patternfly'
	]);
var auth = {
	logout : function() {
	}
};

var appControllers = angular.module('appControllers', []);

// on every request, authenticate user first
angular.element(document).ready(function($http) {
	var keycloakAuth = new Keycloak('keycloak/keycloak.json');
	auth.loggedIn = false;

	keycloakAuth.init({
		onLoad: 'login-required'
	})
	.success(function() {
		auth.loggedIn = true;
		auth.authz = keycloakAuth;
		auth.logout = function() {
			auth.loggedIn = false;
			auth.authz = null;
			auth.profile = {};
			keycloakAuth.logout();
		}
		app.factory('Auth', function() {
			return auth;
		});
		keycloakAuth.loadUserProfile().success(function(profile) {
			auth.profile = profile;
		});
		angular.bootstrap(document, [ 'keycloak-angular' ], {
			strictDi : true
		});
	})
	.error(function () {
		window.location.reload();
	});
});

app.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push([ '$q', 'Auth', function($q, Auth) {
		return {
			'request' : function(config) {
				var deferred = $q.defer();
				if (Auth.authz && Auth.authz.token) {
					Auth.authz.updateToken(5).success(function() {
						config.headers = config.headers || {};
						config.headers.Authorization = 'Bearer ' + Auth.authz.token;

						deferred.resolve(config);
					}).error(function() {
						deferred.reject('Failed to refresh token');
					});
				}
				return deferred.promise;

			},
			'responseError' : function(response) {
				if (response.status == 401) {
					console.log('session timeout?');
					auth.logout();
				}
				return $q.reject(response);

			}
		}
	} ]);
} ]);