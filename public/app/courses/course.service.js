(function() {
    'use strict';

    angular
        .module('app')
        .factory('course', course);

    course.$inject = ['$resource'];

    /* @ngInject */
    function course($resource) {
        var service = $resource('/api/courses/:id', {id:'@id'}, {
            update: {method:'PUT',isArray:false}
        });

        return service;
    }
})();
