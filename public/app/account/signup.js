(function() {
    'use strict';

    angular
        .module('app')
        .controller('Signup', Signup);

    Signup.$inject = ['$location', 'user', 'notifier', 'auth'];

    /* @ngInject */
    function Signup($location, user, notifier, auth) {
        var vm = this;
        vm.firstName = '';
        vm.lastName = '';
        vm.email = '';
        vm.password = '';
        vm.signup = function() {
            var newUserData = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                username: vm.email,
                password: vm.password
            }

            auth.createUser(newUserData).then(function() {
                notifier.notify('User account created');
                $location.path('/');
            }, function(reason) {
                notifier.error(reason);
            });
        }

        activate();

        function activate() {

        }
    }
})();
