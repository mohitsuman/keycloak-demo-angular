'use strict';

appControllers.controller('MainController', ['$rootScope', '$scope', '$http', 'Auth',
    function($rootScope, $scope, $http, Auth) {
        $scope.status = 'App is up and running';
        $scope.profile = auth.profile;
        $scope.isAdmin = Auth.authz.hasRealmRole('admin');
        $scope.isManager = Auth.authz.hasRealmRole('manager');

        $scope.getContracts = function() {
        	$http.get("http://localhost:8000/api/contracts").success(function(data) {
            	$scope.contracts = data;
            });
        }

        $scope.logout = function() {
            Auth.authz.logout();
        }
    }
]);