(function() {
    'use strict';

    angular
        .module('app')
        .controller('Login', Login);

    Login.$inject = ['$http', 'identity', 'notifier', 'auth', '$location'];

    /* @ngInject */
    function Login($http, identity, notifier, auth, $location) {
        var vm = this;
        vm.identity = identity;
        vm.username = '';
        vm.password = '';
        vm.signin = function(username, password) {
            auth.authenticateUser(username, password).then(function(success) {
                if(success) {
                    notifier.notify('You have sucessfully signed in!');
                } else {
                    notifier.notify('Username/Password combination incorrect');
                }
            });
        }
        vm.signout = function() {
            auth.logoutUser().then(function() {
                vm.username = '';
                vm.password = '';
                notifier.notify('You have successfully signed out');
                $location.path('/');
            });
        }

        activate();

        function activate() {

        }
    }
})();
