'use strict';

appControllers.controller('MainController', ['$rootScope', '$scope', '$http', 'authorization',
    function($rootScope, $scope, $http, authorization) {
        $scope.status = 'running...';
        $scope.profile = authorization.profile;
        $scope.isAdmin = authorization.hasRealmRole('admin')
        $scope.isManager = authorization.hasRealmRole('manager')

        $scope.getContracts = function() {
        	$http.get("http://localhost:8000/api/contracts").success(function(data) {
            	$scope.contracts = data;
            });
        }

        $scope.logout = function() {
        	authorization.logout();
        }
    }
]);