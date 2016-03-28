(function() {
    'use strict';

    angular
        .module('app')
        .factory('user', user);

    user.$inject = ['$resource'];

    /* @ngInject */
    function user($resource) {
        var service = $resource('/api/users/:id', {_id: "@id"}, {
            update: {method:'PUT',isArray:false}
        });

        return service;
    }
})();
