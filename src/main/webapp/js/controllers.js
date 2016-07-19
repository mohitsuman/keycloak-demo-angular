'use strict';

appControllers.controller('MainController', ['$rootScope', '$scope', '$http', 'Auth', 'contract',
    function($rootScope, $scope, $http, Auth, contract) {
        $scope.status = 'App is up and running';
        $scope.profile = auth.profile;
        $scope.isAdmin = Auth.authz.hasRealmRole('admin');
        $scope.isManager = Auth.authz.hasRealmRole('manager');
        $scope.getContracts = function() {
        	contract.getContracts().then(function(data) {
             $scope.contracts = data;
         }, function(err) {
             Notifications.error("Error retrieving contracts: " + err.statusText);
         });
        }

        $scope.logout = function() {
            Auth.authz.logout();
        }
    }
    ]);