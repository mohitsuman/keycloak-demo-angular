'use strict';

angular.module("keycloak-angular")

.factory('contract', ['$http', '$q', function($http, $q) {

	var factory = {}, contract;

	factory.getContracts = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/api/contracts'
		}).then(function(resp) {
			deferred.resolve(resp.data);
		}, function(err) {
			deferred.reject(err);
		});
		return deferred.promise;
	}

	return factory;
}]);