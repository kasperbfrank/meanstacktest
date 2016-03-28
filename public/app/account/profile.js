(function() {
    'use strict';

    angular
        .module('app')
        .controller('Profile', Profile);

    Profile.$inject = ['identity', 'auth', 'notifier'];

    /* @ngInject */
    function Profile(identity, auth, notifier) {
        var vm = this;

        activate();

        vm.update = function() {
            var newUserData = {
                username: vm.email,
                firstName: vm.firstName,
                lastName: vm.lastName
            }
            if (vm.password && vm.password.length > 0) {
                newUserData.password = vm.password;
            }

            auth.updateUser(newUserData).then(function() {
                notifier.notify('User updated successfully');
            }, function(reason) {
                notifier.error(reason);
            });
        }

        function activate() {
            vm.email = identity.currentUser.username;
            vm.firstName = identity.currentUser.firstName;
            vm.lastName = identity.currentUser.lastName;
        }
    }
})();
