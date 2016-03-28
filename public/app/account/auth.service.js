(function() {
    'use strict';

    angular
        .module('app')
        .factory('auth', auth);

    auth.$inject = ['$http', 'identity', '$q', 'user'];

    /* @ngInject */
    function auth($http, identity, $q, user) {
        var service = {
            authenticateUser: authenticateUser,
            createUser: createUser,
            updateUser: updateUser,
            logoutUser: logoutUser
        };

        return service;

        function authenticateUser(username, password) {
            var deferred = $q.defer();
            $http.post('/login', {
                username: username,
                password: password
            }).then(function(response) {
                if(response.data.success) {
                    identity.currentUser = new user(response.data.user);
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            });
            return deferred.promise;
        }

        function createUser(newUserData) {
            var newUser = new user(newUserData);
            var deferred = $q.defer();

            newUser.$save().then(function() {
                identity.currentUser = newUser;
                deferred.resolve();
            }, function(response) {
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        }

        function updateUser(newUserData) {
            var deferred = $q.defer();

            var clone = angular.copy(identity.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(function() {
                identity.currentUser = clone;
                deferred.resolve();
            }, function(response) {
                deferred.reject(response.data.reason);
            });
            return deferred.promise;
        }

        function logoutUser() {
            var deferred = $q.defer();
            $http.post('/logout', {logout:true}).then(function() {
                identity.currentUser = undefined;
                deferred.resolve();
            });
            return deferred.promise;
        }
    }
})();
