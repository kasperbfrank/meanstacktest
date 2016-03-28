(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserList', UserList);

    UserList.$inject = ['user'];

    /* @ngInject */
    function UserList(user) {
        var vm = this;
        vm.users = [];

        activate();

        function activate() {
            vm.users = user.query();
        }
    }
})();
