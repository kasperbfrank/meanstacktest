(function() {
    'use strict';

    angular
        .module('app')
        .value('toastr', toastr)
        .factory('notifier', notifier);

    notifier.$inject = [];

    /* @ngInject */
    function notifier() {
        var service = {
            notify: notify,
            error: error
        };

        return service;

        function notify(msg) {
            toastr.success(msg);
            console.log(msg);
        }

        function error(msg) {
            toastr.error(msg);
            console.log(msg);
        }
    }
})();
