(function() {
    'use strict';

    angular
        .module('app')
        .controller('CourseList', CourseList);

    CourseList.$inject = ['course', 'notifier'];

    /* @ngInject */
    function CourseList(course, notifier) {
        var vm = this;
        vm.courses = [];

        activate();

        function activate() {
            vm.courses = course.query()
        }
    }
})();
