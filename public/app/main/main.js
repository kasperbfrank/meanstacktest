(function() {
    'use strict';

    angular
        .module('app')
        .controller('Main', Main);

    Main.$inject = ['course'];

    /* @ngInject */
    function Main(course) {
        var vm = this;
        vm.courses = [];

        activate();

        function activate() {
            vm.courses = course.query();
        }
    }
})();
