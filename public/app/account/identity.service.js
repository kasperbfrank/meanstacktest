(function() {
    'use strict';

    angular
        .module('app')
        .factory('identity', identity);

    identity.$inject = [];

    /* @ngInject */
    function identity() {
        var service = {
            currentUser: undefined,
            isAuthenticated: isAuthenticated,
            isAdmin: isAdmin
        };

        return service;

        function isAuthenticated() {
            return !!this.currentUser;
        }

        function isAdmin() {
            if (!!this.currentUser) {
                return this.currentUser.roles && this.currentUser.roles.indexOf('admin') > -1;
            }
        }
    }
})();
