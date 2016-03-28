(function() {
    'use strict';

    angular
        .module('app')
        .controller('CourseDetails', CourseDetails);

    CourseDetails.$inject = ['course', '$routeParams'];

    /* @ngInject */
    function CourseDetails(course, $routeParams) {
        var vm = this;
        vm.course;

        activate();

        function activate() {
            vm.course = course.get({id: $routeParams.id});
        }
    }
})();
